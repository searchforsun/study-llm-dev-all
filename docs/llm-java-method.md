## 可行性验证与梳理

你给出的方案基于 **Spring AI Alibaba + SkyWalking + 阿里系中间件**，整体技术路线清晰、符合国内企业级实践。以下从可行性、潜在风险及优化点三个维度进行验证和梳理。

### 一、核心可行性验证

| 组件/方案 | 可行性 | 关键依据 / 潜在限制 |
|----------|--------|---------------------|
| **Spring AI Alibaba Agent 编排** | ✅ 可行 | `DashScopeAgent` 已支持工具调用、RAG 检索、多轮循环，但需注意：<br>• 版本需 ≥1.0.0-M3（2024 年底发布）<br>• 默认 `ToolCallingAgent` 仅支持简单 ReAct，复杂流程需自定义 `Agent` 逻辑<br>• 对异步流式工具调用支持尚不完善（未来版本会增强） |
| **SkyWalking 全链路可观测** | ✅ 可行 | • 官方 Java Agent 支持 Spring Boot 3 / WebFlux / Feign / RocketMQ 自动埋点<br>• **LLM 调用埋点**需自定义增强：可使用 SkyWalking 的 `@Trace` 注解或 OpenTelemetry 桥接，将模型调用耗时、Token 消耗作为 Span 标签上报<br>• 与 SkyWalking RocketBot 结合可满足日志-链路关联 |
| **Nacos + Sentinel + RocketMQ** | ✅ 成熟 | • 三者与 Spring Cloud Alibaba 2023.x 兼容良好（需注意 RocketMQ 5.x 对 gRPC 协议的支持）<br>• Sentinel 需升级到 1.8.6+ 以适配 Spring Cloud Gateway |
| **BFF 使用 WebFlux 转发 SSE** | ✅ 可行 | WebClient 支持非阻塞流式传输，但要警惕：<br>• 下游 Agent 如果基于 `RestTemplate` 同步阻塞，会阻塞 Netty 事件循环，必须改用 WebClient<br>• Spring AI Alibaba 默认 `ChatClient` 支持 Flux 响应，可对接 |
| **脱敏服务 + 认证中心** | ✅ 可行 | 独立微服务设计合理，性能敏感场景可考虑本地脱敏库（如提前加载敏感词树） |

### 二、潜在风险与改进建议

#### 1. Spring AI Alibaba 生态成熟度
- **问题**：DashScopeAgent 对工具调用的错误重试、超时控制、多步推理中的上下文截断策略尚需自研补充。
- **建议**：
  - 在编排器中封装一层 `AgentExecutor`，监听工具调用异常并实现退避重试。
  - 对长对话使用 `ConversationSummaryBufferMemory` 防止 Token 超限。

#### 2. SkyWalking 对 LLM 调用的定制埋点
- **问题**：官方探针不会自动记录 prompt/completion 内容、Token 用量、模型名称等业务指标。
- **建议**：
  - 在 LLM Gateway 中通过 SkyWalking Java Agent 的 `TraceContext` 手动创建 Span：
    ```java
    @Trace(operationName = "llm.invoke")
    public String callModel(String prompt) {
        ActiveSpan span = ActiveSpan.get();
        span.tag("model", "qwen-max");
        span.tag("token.prompt", "450");
        // ...
    }
    ```
  - 或使用 OpenTelemetry 生成 Trace 并桥接到 SkyWalking（需配置 exporter）。

#### 3. 消息队列选型与图中不一致
- **问题**：文字中明确使用 **RocketMQ**，但架构图仍保留 Kafka。为避免误导，应统一为 RocketMQ。
- **建议**：图中基础设施层改为 `RocketMQ 集群`，并注明支持事务消息（用于工具调用与业务操作一致性）。

#### 4. 分布式事务 Seata 的必要性
- **问题**：Agent 调用业务工具（如 “创建报销单”）后，若后续模型判断失败，需回滚业务操作。但 Seata 对跨服务长事务（涉及 AI 调用）会锁定资源过久。
- **建议**：
  - 仅对极短事务（<1s）且业务强一致场景使用 Seata TCC 模式。
  - 大多数工具调用推荐采用 **“确认-补偿”** 模式：先记录操作日志，失败后异步执行补偿脚本（可通过 RocketMQ 延迟消息触发）。

#### 5. 提示词热更新与版本管理
- **问题**：Nacos 配置中心适合少量简单配置，若提示词模板达到几十条且包含复杂 Jinja2 语法，管理困难。
- **建议**：
  - 提示词存储在 MySQL，通过 **Nacos 监听数据库变更 + 本地缓存** 实现热更新。
  - 增加版本回滚和 A/B 测试能力（可复用 Spring AI 的 `PromptTemplate`）。

#### 6. 语义缓存命中率与开销
- **问题**：Redis 语义缓存需将请求文本向量化后与历史缓存计算相似度，延迟较高（>50ms）。
- **建议**：
  - 采用 **两级缓存**：精确匹配（MD5）→ 语义匹配（仅对长文本且相似度阈值>0.95）。
  - 对高频简单问题（如 “公司报销制度”）使用精确缓存即可。

### 三、重新梳理后的逻辑架构（修正版）

基于以上验证，对原方案做微调，以下是可直接落地的分层梳理：

#### 接入层
- **API 网关**：Spring Cloud Gateway → 路由定义动态从 Nacos 拉取，集成 Sentinel（限流/熔断），JWT 鉴权。
- **BFF**：Spring Boot WebFlux + SkyWalking 探针 → 解析前端 SSE 请求，通过 WebClient 调用 Orchestrator。

#### AI 能力平台（核心层）
| 服务 | 技术实现 | 关键调整 |
|------|----------|----------|
| **对话编排器** | Spring AI Alibaba DashScopeAgent + 自定义 `AgentExecutor` 包装器 | 增加重试、超时、上下文压缩 |
| **工具调用引擎** | `@Tool` 注解 + 服务间 HTTP 调用（Feign） | 工具失败时记录补偿事件到 RocketMQ |
| **提示词管理** | MySQL + Redis + Nacos 配置开关 | Nacos 仅存储“提示词版本号”，内容从 Redis 读取 |
| **RAG 服务** | Spring AI 向量存储抽象（Milvus/百炼） + 通义嵌入 + BGE 重排 | 混合检索（BM25+向量）由自研 `HybridDocumentRetriever` 实现 |
| **大模型网关** | Spring Cloud Gateway 路由 + Sentinel + Redis 语义缓存（可选） | 手动埋点 SkyWalking，记录 Token 消耗 |
| **脱敏服务** | 独立 Spring Boot，使用 NER 模型（阿里云或自建） | 高性能场景可预加载 DFA 敏感词树 |
| **审计日志** | 所有服务通过 RocketMQ 发送审计事件 → 消费至 Elasticsearch | 同时关联 SkyWalking TraceId |

#### 业务微服务层
- 保持原样，仅需在需要暴露给 Agent 的方法上添加 `@Tool` 注解（需引入 Spring AI 依赖）。

#### 基础设施层（统一为国内主流）
| 类型 | 选型 | 说明 |
|------|------|------|
| 注册/配置 | Nacos 2.3+ | 服务发现 + 配置管理 |
| 缓存 | Redis Cluster / Tair | 会话、语义缓存、分布式锁 |
| 消息队列 | RocketMQ 5.x | 事务消息、顺序消息、审计通道 |
| 向量数据库 | Milvus（自建）或阿里云百炼 | 建议 Milvus 2.4+ 支持混合检索 |
| 关系数据库 | MySQL 8.0 / PolarDB | 提示词模板、知识库元数据、用户会话映射 |
| 可观测性 | **SkyWalking 9.x** + Elasticsearch + RocketBot | 补充：Prometheus + Grafana 用于指标告警（SkyWalking 已支持集成） |

#### 模型提供方层
- 私有化 Qwen（vLLM 或 TGI 部署）
- 云端通义千问、DeepSeek（通过 API）

### 四、修正后的架构图（文字版）

```mermaid
flowchart TD
    subgraph 客户端层
        Web[Web端] --> WAF
        Mobile[移动端] --> WAF
        Corp[企业微信] --> WAF
    end

    subgraph 接入层
        WAF[WAF] --> API_GW[Spring Cloud Gateway<br/>Nacos动态路由+Sentinel]
        API_GW --> BFF[corpassist-bff<br/>WebFlux+SSE]
    end

    subgraph AI能力平台层
        BFF --> Orchestrator[对话编排器<br/>DashScopeAgent+工具循环]
        Orchestrator --> RAG[RAG服务<br/>混合检索+重排]
        Orchestrator --> LLM_GW[大模型网关<br/>多模型路由+语义缓存]
        Orchestrator --> Tools[工具调用引擎<br/>@Tool + Feign]
        Orchestrator --> Prompt[提示词管理<br/>MySQL+Redis热更新]

        Tools --> BizService[业务微服务]
        LLM_GW --> Qwen[私有化Qwen集群]
        LLM_GW --> Tongyi[通义千问API]
        LLM_GW --> DeepSeek[DeepSeek API]

        subgraph 支撑服务
            Desensitize[数据脱敏服务]
            Audit[审计日志]
            Auth[认证中心<br/>Spring Authorization Server]
        end
        Orchestrator --> Desensitize
        Orchestrator --> Auth
        Tools --> Auth
    end

    subgraph 基础设施层
        Nacos[Nacos<br/>注册/配置]
        Redis[Redis集群]
        RocketMQ[RocketMQ]
        Milvus[Milvus向量库]
        MySQL[MySQL/PolarDB]
        SkyWalking[SkyWalking<br/>+Elasticsearch]
    end

    Orchestrator --> Nacos & Redis & Milvus & MySQL
    Tools --> RocketMQ
    Audit --> RocketMQ
    RocketMQ --> SkyWalking[审计日志关联Trace]

    所有服务 --> SkyWalking[自动探针+手动埋点]
```