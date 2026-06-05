/**
 * 为 course.json 术语补充 prompt（hover 用 tip，点击弹窗用 prompt）
 * 用法：node scripts/enrich-term-prompts.mjs <slug> [--force]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const coursesRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'courses');
const slug = process.argv[2];
const force = process.argv.includes('--force');
const MIN_CHARS = 80;

const COURSE_CONTEXT = {
  'llm-application-fundamentals': {
    scene: 'CorpAssist 企业智能助手（双栈基座课）',
    stackNote: '说明 Python 快速验证与 Spring AI 企业治理如何共用 OpenAI 兼容 API 与 Token 预算',
    pitfalls: '混淆算法岗与应用岗、200 页 PDF 全量进 prompt、选型只看榜单不看合规、无评测就微调',
  },
  'python-engineering-for-llm': {
    scene: 'CorpAssist Python 服务（FastAPI、uv、httpx）',
    stackNote: '说明与 Spring Boot 网关/BFF 的 OpenAPI 契约、request_id 与错误码如何对齐',
    pitfalls: '虚拟环境污染、lock 未提交、async 路由里阻塞 IO、测试直连真实 LLM',
  },
  'spring-ai-engineering': {
    scene: 'CorpAssist Spring AI（ChatClient、RAG、Tools、Memory）',
    stackNote: '说明与 Python 检索/实验服务的分工及 OpenAI 兼容网关配置如何共用',
    pitfalls: '业务代码绑死厂商 SDK、Prompt 硬编码、无 Mock ChatModel 的 CI、Advisor 顺序错误',
  },
  'production-prompt-engineering': {
    scene: 'CorpAssist Prompt 与对话工程（S1/S2/S5）',
    stackNote: '说明 Spring PromptTemplate 与 Python 模板/Jinja 如何版本化与 A/B',
    pitfalls: '只改 user 不改 system、Few-shot 示例过时、无拒答阈值、注入防护缺失',
  },
  'context-memory-engineering': {
    scene: 'CorpAssist 上下文与混合记忆（S2 客服 / S3 Agent）',
    stackNote: '说明 Spring ChatMemory 与 Python/LangChain Memory、Redis 会话 key 如何一致',
    pitfalls: '无限堆历史爆窗、摘要丢关键约束、双栈 session 冲突、长期记忆无过期与审计',
  },
  'llm-evaluation-quality': {
    scene: 'CorpAssist 评测与质量飞轮（RAGAS、A/B、用户反馈）',
    stackNote: '说明 Python 与 Spring 如何用同一评测集 JSONL 与指标 schema 对齐',
    pitfalls: '只报离线分不做 A/B、评测集偷换、无回归门禁、坏例不回流',
  },
  'rag-system-engineering': {
    scene: 'CorpAssist RAG 双栈（S1 知识库 / S4 代码库）',
    stackNote: '说明 Python 索引管线与 Spring AI VectorStore/Advisor 如何共用索引与 ACL',
    pitfalls: '脏 PDF 不清洗、检索层不做权限过滤、纯向量忽略关键词、Embedding 变更未 re-embed',
  },
  'retrieval-vector-platform': {
    scene: 'CorpAssist 向量检索平台（Milvus/ES、混合检索、Rerank）',
    stackNote: '说明 Python 索引工程与 Spring VectorStore 只读消费、filter 表达式如何对齐',
    pitfalls: 'HNSW 参数未调优、无元数据 ACL、混合权重拍脑袋、索引变更未 benchmark',
  },
  'spring-ai-alibaba-engineering': {
    scene: 'CorpAssist Spring AI Alibaba（通义/百炼、ReactAgent、Graph、MCP）',
    stackNote: '说明与 Python LangGraph Agent 课的能力对照及 CorpAssist S3 办公 Agent 落地',
    pitfalls: 'Agent 无步数预算、工具失败无降级、MCP 无鉴权、上下文无限堆积',
  },
  'knowledge-lifecycle-governance': {
    scene: 'CorpAssist 企业知识库全生命周期治理（S1 RAG 知识库）',
    stackNote: '说明 Python 索引管线与 Spring VectorStore 如何共用版本、ACL 与增量策略',
    pitfalls: '脏数据不清洗、ACL 未在检索层过滤、索引变更未 re-embed、无质量运营指标',
  },
  'agent-orchestration-engineering': {
    scene: 'CorpAssist Python Agent（LangGraph、S2 客服 / S3 办公自动化）',
    stackNote: '说明与 Spring AI Alibaba ReactAgent/Graph 的能力对照及 FastAPI 双栈调用',
    pitfalls: '无步数预算、死循环无检测、工具无白名单、缺 interrupt 与 LangSmith trace',
  },
  'multimodel-routing-multimodal': {
    scene: 'CorpAssist 多模型路由与多模态（S5 内容创作 / 附件问答）',
    stackNote: '说明 Spring Router 与 Python 路由服务如何统一策略、Fallback 与通义多模态 API',
    pitfalls: '路由拍脑袋无评测、视觉模型滥用烧成本、多模态解析无边界、降级链未演练',
  },
  'llm-composite-integration-workshop': {
    scene: 'CorpAssist 双栈对照集成（Spring 治理面 + Python AI 能力面）',
    stackNote: '说明 OpenAPI 契约、JWT 传递、RAG/Agent 分工与 docker-compose 联调如何落地',
    pitfalls: '契约不同步、trace_id 未贯通、长任务无幂等、双栈职责边界模糊',
  },
  'llm-application-backend': {
    scene: 'CorpAssist 大模型应用后端（网关、SSE、限流、多租户、S2 高并发）',
    stackNote: '说明 Spring Cloud Gateway 与 FastAPI 如何协同限流、熔断、会话与 MQ 异步',
    pitfalls: 'SSE 无断线重连、租户配额未隔离、熔断未配 fallback、密钥硬编码',
  },
  'domain-model-adaptation': {
    scene: 'CorpAssist 领域模型适配（SFT/LoRA、DashScope 定制、垂直话术）',
    stackNote: '说明 Python LoRA 训练流水线与 Spring/DashScope 定制模型接入及评测回滚',
    pitfalls: '该 RAG 却微调、语料不清洗、无基线对比、偏好飞轮无闭环',
  },
  'llm-serving-for-applications': {
    scene: 'CorpAssist 推理服务（vLLM 私有化、量化、双栈接入、S4 代码补全）',
    stackNote: '说明 Python/Spring AI 如何指向远程 OpenAI 兼容推理集群及灰度回滚',
    pitfalls: '无量化选型评测、KV/显存未估、无 fallback 到云 API、容器无 GPU 资源 limit',
  },
  'observability-reliability-ops': {
    scene: 'CorpAssist 可观测与可靠性运维（OTel、告警、灰度、Token 成本、SLO）',
    stackNote: '说明 Spring Micrometer 与 Python/LangSmith trace 如何统一 request_id 与看板',
    pitfalls: '无 request_id 贯通、告警无 Runbook、Token 无租户预算、灰度无回滚指标',
  },
  'security-compliance-engineering': {
    scene: 'CorpAssist 安全与合规（内容安全、注入防护、脱敏、工具权限、审计）',
    stackNote: '说明 Spring AI Advisor 与 Python 护栏如何双栈落地过滤、脱敏与审计留痕',
    pitfalls: '无输入输出审核、工具无白名单、PII 进日志、无红队回归',
  },
  'scenario-enterprise-rag-kb': {
    scene: 'CorpAssist 企业知识库 RAG 端到端落地（S1 场景课）',
    stackNote: '说明 Python 索引管线与 Spring QuestionAnswerAdvisor 如何共用索引、ACL 与评测闭环',
    pitfalls: '脏 PDF 不清洗、检索层无 ACL、纯向量忽略关键词、Embedding 变更未 re-embed',
  },
  'scenario-enterprise-customer-service': {
    scene: 'CorpAssist 智能客服端到端落地（S2 场景课）',
    stackNote: '说明意图路由、DST 双校验、工具调用与人工转接在 Python Agent 与 Spring BFF 如何协同',
    pitfalls: '纯 LLM 管状态幻觉改单、DST 无规则校验、截图未分级调贵模型、高 QPS 无缓存路由',
  },
  'scenario-enterprise-agent-automation': {
    scene: 'CorpAssist 办公 Agent 任务自动化端到端落地（S3 场景课）',
    stackNote: '说明 LangGraph 与 Spring AI Alibaba ReactAgent/Graph 双栈协作、MCP 工具与人工审批',
    pitfalls: '规划超 3 步无观察循环、工具假执行、记忆无限堆积、无步数预算与降级',
  },
  'scenario-enterprise-code-assistant': {
    scene: 'CorpAssist 代码助手端到端落地（S4 场景课）',
    stackNote: '说明代码 RAG 索引、FIM 补全、vLLM 延迟优化与 LSP 验证闭环的双栈实现',
    pitfalls: '整库塞 prompt Token 爆炸、FIM 格式错误、缺 LSP 验证、私有微调丧失通用理解',
  },
  'scenario-enterprise-content-studio': {
    scene: 'CorpAssist 内容生成工坊端到端落地（S5 场景课）',
    stackNote: '说明模板引擎、生成+审核流水线、千人千面个性化与双栈创作 API 如何协同',
    pitfalls: '营销过度承诺未接库存 API、缺解码约束与对抗样本、私域记忆无分层、S5-B 角色 OOC',
  },
  'enterprise-llm-solution-delivery': {
    scene: 'CorpAssist 企业级大模型解决方案交付收官课（bridge 汇合轨）',
    stackNote: '说明双栈方案文档、PoC/试点/验收全流程与 TOP5 场景总答辩如何串联',
    pitfalls: '过度承诺无 SLA、PoC 指标与合同脱节、缺坏例飞轮、三座大山 Rubric 缺失',
  },
};

/** llm-application-fundamentals：按 termId 定制 tip / prompt，避免全课同一模板 */
const LLM_APPLICATION_TERM_HINTS = {
  token: {
    tip: '商用 API 按 Token 计费；输入+输出均计入账单，制度 RAG 场景输入常占 80% 以上。',
    example: 'CorpAssist 单次制度问答 prompt 3180 + completion 412 Token 的 estimate_cost.py 估算',
    stackNote: '说明 llm-gateway 统一落库 usage 字段，Python httpx 与 Spring ChatClient 如何读到同一计量',
    pitfalls: '用汉字个数估费、只估输出忽略检索片段、Agent 工具 schema 未计入预算',
  },
  'context-window': {
    tip: '单次请求可处理的 Token 上限；多轮客服触顶后须截断或摘要，system 指令优先保留。',
    example: 'CorpAssist 客服 32K 窗口：system 保留 → RAG 片段裁剪 → 历史从新到旧填充',
    stackNote: '说明编排层 messages 组装与 tiktoken 计数在 Python/Spring 两侧如何对齐截断策略',
    pitfalls: '静默截断丢关键约束、200 页 PDF 全量进 prompt、未设 max_tokens 上限',
  },
  hallucination: {
    tip: '模型生成看似合理但事实错误的内容；制度问答须 RAG 引用与拒答，不能单靠生成。',
    example: 'CorpAssist 制度问答无检索命中时应拒答，而非编造年假天数',
    stackNote: '说明 citation prompt 与 golden set 评测如何在双栈共用同一拒答阈值',
    pitfalls: '无检索仍强行回答、引用条文 ID 未校验、评测集不覆盖边界问题',
  },
  temperature: {
    tip: '控制采样随机性；客服/制度问答宜低温度，营销创意可略高。',
    example: 'CorpAssist 客服 temperature=0.2 vs 营销草稿 temperature=0.7 的参数对照表',
    stackNote: '说明 Spring AI ChatOptions 与 Python 请求体 temperature 字段如何版本化',
    pitfalls: '制度场景温度过高导致措辞漂移、以为调温度能降 Token 费用',
  },
  rag: {
    tip: '检索增强生成：先查向量库/关键词再生成，带引用溯源；S1 知识库首选方案。',
    example: 'CorpAssist S1：混合检索 4 条 chunk → 拼装 prompt → 回答附制度条文 ID',
    stackNote: '说明 Python rag-service 检索 API 与 Spring QuestionAnswerAdvisor 如何共用索引',
    pitfalls: '脏 PDF 不清洗、检索层无 ACL、纯向量忽略 BM25、无评测就换 Embedding',
  },
  agent: {
    tip: '多步规划+工具调用循环；适合 S3 办公自动化，与 S2 客服「单轮意图」架构不同。',
    example: 'CorpAssist S3：审批→查库存→发邮件的多步 Agent，须设 max-steps 与工具白名单',
    stackNote: '说明 Python LangGraph 与 Spring AI Tool 调用在网关侧的步数预算与审计',
    pitfalls: '无步数预算死循环、工具假执行、记忆无限堆积淹没上下文',
  },
  'prompt-engineering': {
    tip: '可版本化的 system/user 模板；制度话术、引用格式、拒答策略应入库而非硬编码。',
    example: 'CorpAssist citation prompt v3：要求每条结论附 chunk_id',
    stackNote: '说明 Spring PromptTemplate 与 Python Jinja 模板如何共用 prompt_version 标签',
    pitfalls: '只改 user 不改 system、Few-shot 示例过时、无注入防护',
  },
  transformer: {
    tip: '应用层只需理解 Attention「关注上下文」直觉，无需推导公式；选型看窗口与工具能力。',
    example: 'CorpAssist 选型时看 128K 窗口、function calling、中文政策表述而非参数量',
    stackNote: '说明应用岗与算法岗职责边界：编排/数据/评测 vs 预训练/CUDA',
    pitfalls: '误投算法岗面试、用 Transformer 公式代替工程分层讨论',
  },
  streaming: {
    tip: 'SSE 流式返回 delta；BFF 须禁用缓冲，用户感知 TTFT 显著优于非流式。',
    example: 'CorpAssist BFF curl -N 透传 data: [DONE] 与网关 usage 尾包',
    stackNote: '说明 Spring WebFlux SSE 与 Python StreamingResponse 如何共用同一 OpenAI 兼容契约',
    pitfalls: '网关缓冲导致假流式、断线重试重复计费、未解析 delta 拼接',
  },
  'fine-tuning': {
    tip: '领域 SFT/LoRA；CorpAssist 制度问答通常 RAG 优先，微调需评测门禁与合规审批。',
    example: 'CorpAssist：先 120 条 golden set 评测，未达标不启动 LoRA',
    stackNote: '说明该 RAG 却微调的决策树在 Python 实验与 Spring 生产路由中的位置',
    pitfalls: '无评测就微调、语料含 PII 未清洗、微调后未回归 RAG 引用率',
  },
  embedding: {
    tip: '文本转向量用于检索；变更模型须全量 re-embed 并锁 index_version。',
    example: 'CorpAssist doc-ingest：bge-m3 Embedding → Milvus，与对话模型可不同厂商',
    stackNote: '说明 Python 索引流水线与 Spring VectorStore 如何共用 embedding_model 版本标签',
    pitfalls: 'Embedding 与对话不同域混用、索引变更未 re-embed、无 ACL 过滤',
  },
  'openai-compatible': {
    tip: 'POST /chat/completions 等路径与字段；双栈共用 llm-gateway base_url。',
    example: 'CorpAssist：curl / Python httpx / Spring ChatClient 三端对齐同一网关',
    stackNote: '说明 CORPASSIST_LLM_BASE_URL 环境变量在 demo 与 Spring application.yml 的对应关系',
    pitfalls: '业务服务直连厂商 Key、流式字段厂商差异未适配、429 无退避',
  },
  s1: {
    tip: '面试 TOP1：企业知识库 RAG，带引用溯源；落地课 scenario-enterprise-rag-kb。',
    example: 'CorpAssist 5000 员工 HR/采购制度问答，引用准确率与 P95 为核心指标',
    stackNote: '说明 rag-system-engineering 能力课与场景课的分工及双栈交付物',
    pitfalls: '脏 PDF 解析缺失、ACL 未在检索层过滤、无 citation 监控',
  },
  s2: {
    tip: '智能客服：多轮意图、工具查单、人工转接；常消费 S1 检索结果。',
    example: 'CorpAssist 客服：意图路由 → 可选 RAG → 工具 1～2 次 → 转人工降级',
    stackNote: '说明 DST 规则+模型双校验在 Spring BFF 与 Python Agent 的协作边界',
    pitfalls: '纯 LLM 管状态改单、高 QPS 无缓存路由、截图未分级调贵视觉模型',
  },
  s3: {
    tip: 'Agent 办公自动化：多步规划与工具链；比 S2 审计粒度更细。',
    example: 'CorpAssist 审批+邮件+工单：ReAct 循环 + 步数预算 + 人工审批节点',
    stackNote: '说明 agent-orchestration-engineering 与 Spring AI Alibaba Graph 的对照',
    pitfalls: '规划超 3 步无观察循环、工具返回过长淹没上下文、无降级',
  },
  s4: {
    tip: '代码助手：代码库 RAG + 低延迟补全；代码不出内网。',
    example: 'CorpAssist 内部 Spring 模板与 SQL 规范问答，P95 与 LSP 验证闭环',
    stackNote: '说明 scenario-enterprise-code-assistant 与 llm-serving 延迟优化的衔接',
    pitfalls: '整库塞 prompt、FIM 格式错误、私有代码未分级出网',
  },
  s5: {
    tip: '内容生成工坊：风格模板、审核流水线、品牌安全。',
    example: 'CorpAssist 营销文案：模板变量 + 审核 API + 千人千面个性化',
    stackNote: '说明 production-prompt-engineering 与多模态路由在 S5 场景中的位置',
    pitfalls: '营销过度承诺未接库存 API、缺内容安全审核、私域记忆无分层',
  },
  'model-selection': {
    tip: '能力/价格/合规三维矩阵；L3/L4 数据决定私有化或专有云路由。',
    example: 'CorpAssist L3 制度问答走私有化 Qwen，L2 营销草稿可走公有云',
    stackNote: '说明 llm-routing.example.yaml 中 dataClass 路由在网关的配置方式',
    pitfalls: '只看榜单不看合规、L4 仍出公网、Embedding 与对话不同域',
  },
  'data-privacy': {
    tip: 'L1～L4 数据分级、出网路由、日志脱敏、采购检查项。',
    example: 'CorpAssist L4 财务附件 deny 公网，日志中手机号掩码为 [PHONE]',
    stackNote: '说明 egress-policy.example.yaml 与 log-redaction.example.py 在双栈审计中的位置',
    pitfalls: 'PII 进 Jaeger、评测集黄金答案明文落日志、采购合同未核数据驻留',
  },
  'api-contracts': {
    tip: 'BFF→llm-gateway→厂商；流式 SSE、错误码 429 退避、usage 落库。',
    example: 'CorpAssist BFF 鉴权 SSE 透传，网关统一 Bearer Key 与 requestId 审计',
    stackNote: '说明 OpenAPI 契约与 practice-05 双栈首次调用实验的验收路径',
    pitfalls: 'BFF 持厂商 Key、400/429 重试策略错误、流式中断未处理计费',
  },
};

/** 按 course.json terms.tip 前缀（章主题）定制 prompt，减少全课同一模板感 */
const CONTEXT_MEMORY_CHAPTER_HINTS = {
  '上下文组成与窗口预算': {
    example: 'CorpAssist 客服 32K 窗口四层 budget split 与 validate_budget.py',
    stackNote: '说明 budget-template.yaml 各层 ratio 如何映射到实际 prompt 组装',
    pitfalls: 'window_limit 与代码常量不一致、System 层被 History 挤占',
  },
  '截断、摘要与滑动窗口': {
    example: '客服 15 轮对话后会员等级约束被 FIFO 裁掉',
    stackNote: '说明 sliding window 与 rolling summary 如何保护约束字段',
    pitfalls: '摘要链多层失真 lose constraint、FIFO 删除首轮关键信息',
  },
  '上下文压缩入门': {
    example: 'History 层超 80% 触发 compress trigger 与实体保留校验',
    stackNote: '说明 Python 规则压缩与 SAA ContextCompressAdvisor 触发阈值对齐',
    pitfalls: '压缩丢 order_id/会员等级、压缩与截断策略冲突',
  },
  '上下文污染与注入面': {
    example: 'RAG chunk 夹带「忽略上文指令」或用户劫持 system prompt',
    stackNote: '说明 boundary zone 三区隔离与安全课 injection 分工',
    pitfalls: '仅打 [UNTRUSTED] 标签不做检测、工具输出未截断进上下文',
  },
  '工作记忆与会话状态': {
    example: 'S2 客服「它」指代订单 20240501、人工转接 session handoff',
    stackNote: '说明 corpassist-session-v1 JSON 与 Spring ChatMemory / LangChain 双栈 key',
    pitfalls: '双栈双写竞态、session key 不一致导致换栈失忆',
  },
  '长期记忆与向量记忆': {
    example: '从对话提取偏好写入 Milvus，召回带 tenant/user 过滤',
    stackNote: '说明 fact extract → vector recall → GDPR delete 生命周期',
    pitfalls: '长期记忆无 TTL/审计、跨用户召回未过滤',
  },
  '混合记忆架构': {
    example: '会话层修正偏好覆盖长期层旧事实（write-through + read-merge）',
    stackNote: '说明 mem router 问候语跳过长期层、一致性优先级',
    pitfalls: '三层各自写入无协调、长期层与当轮会话矛盾',
  },
  '人在回路与记忆编辑': {
    example: '置信度 0.75 偏好进审批队列，主管 edit_and_approve 后写入',
    stackNote: '说明 append-only audit trail 与 mem changelog 分工',
    pitfalls: '低置信度直写长期库、审计日志可篡改',
  },
  '实战：CorpAssist 记忆子系统': {
    example: 'mem API + MemoryEvalSuite 多轮一致性 ≥95% 发布门禁',
    stackNote: '说明 /v1/session 与 /v1/memory 如何供 RAG/Agent 课集成',
    pitfalls: '只有功能测试无 consistency 指标、handoff 文档缺 Redis key',
  },
  'Spring AI Alibaba 上下文工程': {
    example: 'ContextCompressAdvisor + ContextEditingAdvisor + Graph Checkpoint',
    stackNote: '说明 SAA Advisor 链与 Python 手工压缩/编辑的对照',
    pitfalls: 'Advisor 顺序错误、graph checkpoint 与 session_id 未对齐',
  },
  'Agent 场景记忆': {
    example: 'LangGraph 中断恢复 + 多 Agent 共享 blackboard',
    stackNote: '说明 thread_id 与 session_id 对齐、mem scope 私有/共享分离',
    pitfalls: 'Checkpoint 未持久化、黑板与私有日志混写',
  },
  '记忆的成本与延迟': {
    example: '简单问候跳过长期召回，会话内 fact cache 降 P95',
    stackNote: '说明 read-write amplification 与 lazy load + recall budget',
    pitfalls: '每轮全量向量搜索、缓存无 TTL 导致脏读',
  },
  '面试：上下文爆窗排障': {
    example: '20 轮后 History 44%、System 7% 的 overflow case 五步法',
    stackNote: '说明 WindowOverflowDiagnoser 各层占比正常区间',
    pitfalls: '未看 token 分布直接换大窗口、双栈重复注入未排查',
  },
  '与 RAG/Agent 课集成验收': {
    example: 'OpenAPI 契约 + RAG 会话连续性 + Agent Checkpoint 集成测试',
    stackNote: '说明 handoff.md 中 API/Redis key 与 metric bind CI 门禁',
    pitfalls: '契约漂移未签字、跨课联调缺 mock 环境',
  },
};

function chapterKeyFromTip(tip) {
  const placeholder = (tip ?? '').match(/^(.+) 相关术语：/);
  if (placeholder) return placeholder[1];
  const m = (tip ?? '').match(/^([^：]+)：/);
  return m?.[1] ?? null;
}

/** python-engineering-for-llm：按章主题定制 prompt/tip，替换「{章} 相关术语：{slug}」占位 */
const PYTHON_ENGINEERING_CHAPTER_HINTS = {
  'asyncio 与并发': {
    example: 'CorpAssist 流式 RAG 与 LLM Semaphore 并发限制',
    stackNote: '说明 async 路由、SSE 与 httpx AsyncClient lifespan 如何配合',
    pitfalls: 'async 路由里阻塞 IO、Semaphore 每请求新建、SSE Content-Type 写错',
  },
  '测试策略': {
    example: 'pytest + ASGITransport 测 /health，MockTransport 模拟 LLM',
    stackNote: '说明 CI 零外网、OpenAPI 快照与 Java 消费方契约对齐',
    pitfalls: '测试直连真实 LLM、dependency_overrides 未清理导致 flaky',
  },
  '中间件、鉴权与 CORS': {
    example: 'API Key/JWT 校验与 X-Request-Id 中间件贯穿 Spring MDC',
    stackNote: '说明 /health 探针与 /v1/rag/query 鉴权分层、生产 CORS 由 BFF 处理',
    pitfalls: 'JWT 只 decode 不验签、504 与上游 timeout 混淆、固定 demo-id 非 UUID',
  },
  '容器化与本地 compose': {
    example: '多阶段 Dockerfile + compose 联调 Spring BFF',
    stackNote: '说明 non-root、healthcheck 与 uv sync 在镜像构建中的位置',
    pitfalls: '密钥 bake 进镜像、root 运行、healthcheck 探测业务路由',
  },
  '性能与资源': {
    example: 'cProfile 定位热点、Embedding 批处理降 RPC',
    stackNote: '说明 httpx 连接池 Limits 与索引任务内存驻留策略',
    pitfalls: '未 profiling 就加缓存、连接池每请求新建、批大小无上限 OOM',
  },
  '后台任务与队列': {
    example: 'Spring 触发 RAG 索引，Python 返回 202 + ARQ/Celery 选型',
    stackNote: '说明 doc_set_version 幂等键与 MQ 桥接 Spring 事件',
    pitfalls: '长任务放 sync 路由、无 pending→succeeded 状态、重复投递重复索引',
  },
  '打包、版本与发布': {
    example: 'semver 发版、uv publish 内部 PyPI、CI lock 校验',
    stackNote: '说明 pyproject version 与 Docker tag、openapi info.version 三处一致',
    pitfalls: '破坏性变更只 bump MINOR、lock 未提交、CHANGELOG 与 tag 不同步',
  },
  '实战：CorpAssist Python 服务 API': {
    example: 'OpenAPI 导出 + schema diff + 交付检查单 handoff',
    stackNote: '说明 practice /v1/rag/query 与交付 /api/v1/rag/search 的路径演进',
    pitfalls: '契约未双签、集成测试未覆盖 422/502、version 三处不一致',
  },
  '双栈协作规范': {
    example: '错误码表、snake_case DTO 与联调冒烟清单',
    stackNote: '说明 Python JSON 日志 code 字段与 Java ProblemDetail 映射',
    pitfalls: '错误码不对齐、DTO 命名混用、联调路径与 OpenAPI 定稿不一致',
  },
};

const PLACEHOLDER_TIP_RE = /^(.+) 相关术语：.+$/;

function maybeFixPythonPlaceholderTip(term) {
  if (!PLACEHOLDER_TIP_RE.test(term.tip ?? '')) return false;
  const chapterKey = chapterKeyFromTip(term.tip);
  const label = term.label ?? '';
  const hint = PYTHON_ENGINEERING_CHAPTER_HINTS[chapterKey];
  if (hint) {
    term.tip = `「${label}」— ${hint.example}（${chapterKey}）。`;
  } else {
    term.tip = `「${label}」在 CorpAssist Python 服务「${chapterKey}」中的工程要点。`;
  }
  return true;
}

function buildTermPrompt(termId, term, course) {
  const ctx = COURSE_CONTEXT[slug] ?? {
    scene: 'CorpAssist 企业智能助手',
    stackNote: '结合双栈（Python + Spring AI）协作说明',
    pitfalls: '配置写死、缺评测、缺可观测与 request_id',
  };
  const title = course.meta?.title ?? slug;
  const label = term.label ?? termId;
  const tip = (term.tip ?? '').replace(/\s+/g, ' ').trim().replace(/。$/, '');
  const tipClause = tip ? `简要背景：${tip}。` : '';
  const chapterKey = chapterKeyFromTip(term.tip);
  const hint =
    slug === 'llm-application-fundamentals' && LLM_APPLICATION_TERM_HINTS[termId]
      ? LLM_APPLICATION_TERM_HINTS[termId]
      : slug === 'context-memory-engineering' && chapterKey
        ? CONTEXT_MEMORY_CHAPTER_HINTS[chapterKey]
        : slug === 'python-engineering-for-llm' && chapterKey
          ? PYTHON_ENGINEERING_CHAPTER_HINTS[chapterKey]
          : null;
  const stackNote = hint?.stackNote ?? ctx.stackNote;
  const pitfalls = hint?.pitfalls ?? ctx.pitfalls;
  const exampleClause = hint?.example
    ? `请围绕「${hint.example}」举一个 CorpAssist 例子，并`
    : '结合一个 CorpAssist 落地例子，并';
  return (
    `我在学习《${title}》（${ctx.scene}）。请用通俗中文解释「${label}」：它解决什么问题、在工程里通常怎么用。${tipClause}` +
    `${exampleClause}${stackNote}。` +
    `最后列出 2 个与本章场景最相关的误区或排查项（可参考：${pitfalls}）。`
  );
}

function enrichTermEntry(termId, term, course) {
  if (!term || typeof term !== 'object') return false;
  let tipFixed = false;
  if (slug === 'python-engineering-for-llm') {
    tipFixed = maybeFixPythonPlaceholderTip(term);
  }
  if (slug === 'llm-application-fundamentals' && LLM_APPLICATION_TERM_HINTS[termId]?.tip) {
    const want = LLM_APPLICATION_TERM_HINTS[termId].tip;
    if (term.tip !== want) {
      term.tip = want;
      tipFixed = true;
    }
  }
  const existing = term.prompt?.trim() ?? '';
  if (existing.length >= MIN_CHARS && !force && !tipFixed) return false;
  term.prompt = buildTermPrompt(termId, term, course);
  return true;
}

if (!slug) {
  console.error('Usage: node scripts/enrich-term-prompts.mjs <slug> [--force]');
  process.exit(1);
}

function enrichTerms(terms, course) {
  let added = 0;
  let skipped = 0;
  for (const [id, term] of Object.entries(terms)) {
    if (enrichTermEntry(id, term, course)) added++;
    else skipped++;
  }
  return { added, skipped };
}

const courseDir = path.join(coursesRoot, slug);
const coursePath = path.join(courseDir, 'course.json');
if (!fs.existsSync(coursePath)) {
  console.error(`not found: ${coursePath}`);
  process.exit(1);
}
const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));

const { added, skipped } = enrichTerms(course.terms ?? {}, course);
fs.writeFileSync(coursePath, JSON.stringify(course, null, 2) + '\n', 'utf8');

console.log(`${slug}: added/updated ${added} prompts, skipped ${skipped} (min ${MIN_CHARS} chars)`);
