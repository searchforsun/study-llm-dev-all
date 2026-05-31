# spring-ai-engineering 课程深度提升设计文档

**日期：** 2026-05-31  
**状态：** 已批准  
**范围：** 全部 15 章 + 对应 demos + quizzes

## 1. 问题诊断

`courses/spring-ai-engineering/` 的 15 章质量严重不均：

| 阶段 | 现有行数范围 | 平均 | 问题 |
|------|-------------|------|------|
| basics (4章) | 357–372 | ~365 | 勉强可用，缺代码对比和深度 |
| practice (5章) | 347–368 | ~357 | 类似 basics，缺生产实战 |
| advanced (6章) | 140–395 | ~244 | adv-04/05/06 仅 140–146 行，骨架占位 |

**具体缺陷：**
- 每节仅一个 `<p>` 标签 + 术语链接，无实质性讲解
- 无真正的 Java 代码示例（仅 5-10 行片段）
- Mermaid 图跨章重复（同一张 Portal→Spring→LLM→Py 图用了 N 次）
- "先记住 3 件事"在 advanced 阶段 6 章完全相同
- `learn-micro-check` 答案全是 "结合 S1/S2/S3 模块复述即可"
- Demo 目录仅含 50–300 字节骨架文件
- 缺少 learn-compare、learn-code-compare、role-cards、learn-faq 等丰富内容块

## 2. 质量标杆

引用 CLAUDE.md 第 82 行：

> The skill's `example/java-distributed-architecture/` is the **gold standard** for all courses.

该示例的 `basics-01-distributed-fundamentals.html`（484 行）包含：

- 5 个 `.section-block` 小节，每节 h3 + 多个 h4
- 3 组 `learn-compare` / `learn-code-compare`
- 2 个 mermaid 图（时序 + 流程，不重复）
- 3 个 FAQ（`learn-faq`）
- 2 个 `learn-micro-check`（有具体思考题和答案）
- 1 组 `role-cards` + 1 个 `learn-tabs`
- 1 个 `learn-param-slider`（交互组件）
- 决策表 + 场景排序表
- 4 条常见误区（`notice` 块）
- 2 个判断练习（含 `<details>` 答案）
- 3 道面试/答辩口述题（`learn-interview`）
- 速查卡（`learn-cheat-sheet`）
- 5 个清单项（`learn-checklist`）
- 4 个官方文档链接

## 3. 目标

15 章全部达到 450–550 行，与 gold standard 对齐。

### 3.1 每章统一 DOM 结构

```
<section id="ch-{id}" class="chapter" data-chapter="{id}">
  <header class="chapter-header"><!-- title + badge + mark-done button --></header>
  <div class="concept">
    <div class="chapter-intro content-section">
      <!-- .chapter-meta + .notice-why-learn + .notice-outcome + key-points(3) -->
    </div>
    <!-- 4 个 .section-block（继承 outline-specs 定义） -->
    <!--   每节 ≥ h3 + 2-4 个 h4，含代码/图表/对比 -->
    <div class="section-block chapter-conclusions-block notice"><!-- --></div>
    <div class="section-block learn-review-block">
      <!-- .learn-checklist + .learn-cheat-sheet + .learn-interview -->
    </div>
  </div>
  <div class="official-links content-section"><!-- --></div>
  <div class="chapter-practice">
    <!-- .steps-operate + .steps-judgment-list + .demo-box -->
  </div>
  <div class="resources content-section"><!-- --></div>
</section>
```

### 3.2 内容密度要求

| 内容块 | 每章最少 |
|--------|---------|
| Java 代码示例（完整类/方法） | 3–5 个 |
| YAML/XML 配置 | 2–3 个 |
| mermaid 图（不跨章重复） | 2 个（≥1 时序图） |
| `learn-compare` 推荐 vs 不推荐 | 2 组 |
| `learn-code-compare` 好代码 vs 坏代码 | 1 组 |
| `learn-scenario` 具体业务情境 | 2–3 个 |
| `learn-faq` 具体问答 | 3 个 |
| `learn-micro-check` "先想 10 秒" | 每节 1 个 |
| `role-cards` 结构化卡片 | 1 组 |
| 常见误区 notice | 1 组 (3–4 条) |
| 判断练习（含答案） | 2 题 |
| 面试/答辩口述题 | 3 题 |
| 速查卡 | 1 张 |
| 清单项 | 4–6 个 |

### 3.3 CorpAssist 场景差异化

不再复用同一段话。每章分配独特的 CorpAssist 业务情境：

| 章 | CorpAssist 情境（唯一） |
|----|------------------------|
| basics-01 | S2 客服：项目启动 checklist，父 POM 与网关配置对齐 |
| basics-02 | S2 客服：高峰期模型切换——GPT-4o-mini→qwen-turbo 客户无感知 |
| basics-03 | S3 办公 Agent：Prompt 模板库管理 30+ 场景的告警触发与回滚 |
| basics-04 | S1 制度问答：请假单/报销单/会议纪要三场景结构化抽取 |
| practice-01 | S1 制度问答：10 万份制度文档的 PGVector 索引方案 |
| practice-02 | S1 制度问答：chunk=512, overlap=64 参数对召回率的影响实验 |
| practice-03 | S3 办公 Agent：OA 系统 Tool 集成（查审批/创建工单/发公告） |
| practice-04 | S2 客服：多租户（HR/IT/财务）共用 Redis 的 Key 隔离设计 |
| practice-05 | S4 代码助理：SSE 流式代码补全 API + OpenAPI 文档 |
| advanced-01 | S2 客服：PII 脱敏 + 竞品名称过滤 + 降级回复"请您联系 HR" |
| advanced-02 | S3 办公 Agent：成本路由——简单查询走 qwen-turbo，复杂推理走 GPT-4o |
| advanced-03 | S1+S2+S3 全景：Grafana 大屏展示三场景 Token 消耗与延迟分布 |
| advanced-04 | CI Pipeline：Mock ChatModel 单元测 + PGVector 集成测 + 快照回归 |
| advanced-05 | S1 端到端交付：制度问答 RAG API 从代码到 K8s 部署 |
| advanced-06 | 国产化迁移 SOP：OpenAI → 通义/DeepSeek 私有化 5 步切换 |

## 4. 章节大纲（15 章）

### 4.1 Basics 阶段（4 章）

#### basics-01：项目搭建与自动配置（目标 ~480 行）

- **Starter 依赖**：BOM 版本对齐 · 条件装配原理 · Ollama vs OpenAI · 完整父/子 POM
- **application.yml**：配置前缀 · Profile 分层 · 环境变量对照表 · K8s Secret
- **Bean 生命周期**：AutoConfiguration 源码解读 · ChatModel→ChatClient 链路 · @Primary/@Qualifier
- **CorpAssist-spring 模块**：四模块职责矩阵 · 模块间契约 · OpenAPI 契约文件

#### basics-02：ChatClient 与 ChatModel（目标 ~490 行）

- **调用链**：call()→HTTP Request 全链路 · Prompt 组装 · Response 解析
- **多模型 Bean**：@Primary/@Qualifier · 按场景路由 · 动态模型切换
- **流式 Flux**：Flux\<ChatResponse\> · SSE → 前端 · 背压 · 首 Token 延迟
- **与 Python 客户端对照**：httpx vs Flux · 错误处理 · 配置管理

#### basics-03：Prompt 模板与 Advisor（目标 ~480 行）

- **PromptTemplate**：占位符语法 · Message 类型 · .st 外部化 · 动态选择
- **Advisor 链**：接口与执行顺序 · 内置 Advisor · 自定义 Advisor
- **系统/用户消息**：角色最佳实践 · 多轮构建 · System Message 分层
- **可测试 Prompt**：单元测试 · 快照测试 · 回归检测 · CI 变更审核

#### basics-04：结构化输出（目标 ~470 行）

- **JSON mode**：启用方式 · Schema 约束 · Token 消耗
- **Bean 映射**：OutputConverter · Record/DTO · 嵌套对象 · 集合类型
- **校验失败处理**：异常分类 · 重试 · 降级 · 告警
- **CorpAssist 表单抽取**：请假/报销/会议纪要 · 与 Pydantic 对照

### 4.2 Practice 阶段（5 章）

#### practice-01：VectorStore 与 Embedding（目标 ~500 行）

- **接口模型**：VectorStore 体系 · Document/Embedding · SearchRequest/Response
- **Simple vs 外部库**：PGVector/Redis/ChromaDB 选型矩阵 · 各环境推荐
- **元数据过滤**：Filter DSL · 元数据规范（部门/类型/时间/密级）· 索引策略
- **Python 索引同源**：双栈 Embedding 一致性 · 索引同步 · 数据迁移

#### practice-02：RAG Pipeline 实现（目标 ~520 行）

- **DocumentReader**：多格式支持 · 自定义 Reader · 编码处理
- **Splitter**：三策略对比 · chunk/overlap 调参 · CorpAssist 最佳参数
- **RetrievalAugmentation**：QA Advisor 内部原理 · 检索→增强→生成链路
- **引用溯源**：Citation 元数据 · 前端展示 · 缺失告警

#### practice-03：Function Calling / Tools（目标 ~510 行）

- **@Tool 定义**：完整注解参数 · ToolCallback · 工具注册 · 3 个实例
- **参数 schema**：自动生成 Schema · @ToolParam 控制 · 校验
- **错误重试**：异常分类 · 指数退避 · 降级 · 可观测
- **与 Agent 课衔接**：Tool→Agent 演进 · ReAct · 多 Tool 编排

#### practice-04：Chat Memory 与会话（目标 ~490 行）

- **Memory 类型**：4 种实现对比 · 序列化 · 裁剪策略（最近 N/Token/时间）
- **Redis 存储**：配置 · Lettuce/Redisson · 哨兵/集群 · Key 设计
- **多租户 session**：TenantContext · ThreadLocal · Gateway 透传 · 隔离级别
- **Python 会话同步**：共享 Redis/API/JWT · 迁移方案

#### practice-05：暴露 REST 与 SSE（目标 ~490 行）

- **Controller 设计**：RESTful · DTO 分层 · Bean Validation
- **SSE 流式**：SseEmitter vs Flux\<SSE\> · 错误处理 · 断连检测
- **全局异常**：@ControllerAdvice · LLM 异常分类 · ProblemDetail (RFC 9457)
- **OpenAPI**：SpringDoc · 文档规范 · 双栈对齐 · 版本策略

### 4.3 Advanced 阶段（6 章）

#### advanced-01：生产 Advisor：安全与护栏（目标 ~530 行）

- **输入过滤**：PII 脱敏 · Prompt Injection 检测 · 长度限制 · Trie 敏感词
- **输出审核**：信息泄露检测 · 合规审核 · 幻觉检测 · 格式校验
- **敏感词**：词库管理 · AC 自动机 · 行业扩展 · 动态更新
- **降级回复**：分级降级 · SafeGuard 组装 · 可观测 · A/B 测试

#### advanced-02：多模型路由与 Fallback（目标 ~510 行）

- **路由策略**：内容路由 · 租户路由 · 成本路由 · 自定义 Router
- **熔断**：Resilience4j · 状态机 · 滑动窗口 · 降级行为
- **缓存**：语义缓存 · Redis/本地分层 · Key 设计 · 失效策略
- **成本路由**：Token 成本追踪 · 预算管理 · 省钱策略

#### advanced-03：Micrometer 与可观测（目标 ~520 行）

- **指标埋点**：自动指标 · 自定义业务指标 · 命名规范
- **Tracing**：MDC traceId · Sleuth/Micrometer Tracing · 跨服务 · 与 Python OTel 串联
- **与 OTel 打通**：Java Agent · OTLP Exporter · Span 属性 · Jaeger/Tempo
- **Dashboard**：Grafana LLM 专属面板 · PromQL · 告警规则

#### advanced-04：测试与本地替身（目标 ~500 行）

- **@MockBean ChatModel**：隔离策略 · 固定响应 · 验证 Advisor/Tool
- **Testcontainers**：PGVector · Redis 容器 · 生命周期 · DinD
- **快照测试**：Prompt 快照 · 结构化输出快照 · MR 审核 · 不匹配处理
- **CI**：Pipeline 配置 · 测试分层 · Mock 开关 · 覆盖率

#### advanced-05：实战：CorpAssist Spring RAG API（目标 ~540 行）

- **端到端接口**：完整 Controller + Service + Repository（三层全量代码）
- **与 Python 检索契约**：OpenAPI 3.1 完整 YAML · 契约测试（Pact）
- **评测挂钩**：RAGAS 集成 · 三指标 · 评测流水线
- **交付物**：Dockerfile（多阶段）· K8s YAML · 运维手册

#### advanced-06：可移植性与供应商锁定（目标 ~520 行）

- **换模型步骤**：5 步 SOP · 厂商对比矩阵 · 回滚方案
- **配置外部化**：Config/Nacos/K8s ConfigMap 三方案 · 热更新 · 加密
- **对比 Python 抽象**：成熟度模型 L1-L4 · 双栈统一标准
- **面试题**：5 道高频题深度解析（考点 + 框架 + 代码 + 追问）

## 5. Demo 同步升级

每章对应的 `demos/{chapter-id}-lab/` 从骨架文件升级为：

```
{chapter-id}-lab/
├── README.md            # 350-500 字：场景说明 + 验收项
├── pom.snippet.xml      # (如适用) Maven 依赖片段
├── application.yml      # (如适用) 完整配置
├── {KeyClass}.java      # 1-3 个核心 Java 文件（完整可编译）
└── verify.sh / verify.http  # 验收脚本（curl/HTTPie 命令）
```

Demo 验收标准：每个 lab 至少包含 **1 个完整 Java 类** + **1 个可执行的配置/脚本**。

## 6. Quiz 同步升级

每章 5 道测验题（`quiz-partial/{phase}.html`），题型混合：
- 2 道单选
- 1 道多选
- 1 道填空
- 1 道判断（结合 CorpAssist 场景）

## 7. 实施约束

- **不修改 `outline-specs.json`**：现有 outline 定义和 sections 结构已足够
- **不修改 `course.json` 的 term 定义**：现有词库足够，新章节引用已有 term
- **遵循 pipeline**：chapters → demos → quizzes → merge → assemble
- **PR 策略**：每阶段（basics/practice/advanced）完成后独立 commit + PR 审核
- **每个 chapter 都是独立 `<section>` fragment**，不直接编辑 `index.html`

## 8. 验收标准

1. `wc -l chapters/*.html | tail -1` → total ≥ 7000 行（15 × ~470）
2. 每章包含全部 mandatory DOM blocks（见第 3.1 节）
3. 每章包含 ≥ 表格第 3.2 节的最低内容块数量
4. mermaid 图跨章无重复
5. CorpAssist 情境跨章无重复（每章分配不同场景，见第 3.3 节）
6. 所有 demo 目录包含 ≥1 个完整 Java 类
7. `npx serve .` 从 `courses/` 目录正常加载，无 JS/CSS 控制台错误
8. 每个 chapter `data-chapter` 属性正确，`btn-mark-done` 可正常交互
