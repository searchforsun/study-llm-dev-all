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
  return (
    `我在学习《${title}》（${ctx.scene}）。请用通俗中文解释「${label}」：它解决什么问题、在工程里通常怎么用。${tipClause}` +
    `结合一个 CorpAssist 落地例子，并${ctx.stackNote}。` +
    `最后列出 2 个常见误区或排查项（可参考：${ctx.pitfalls}）。`
  );
}

function enrichTermEntry(termId, term, course) {
  if (!term || typeof term !== 'object') return false;
  const existing = term.prompt?.trim() ?? '';
  if (existing.length >= MIN_CHARS && !force) return false;
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

for (const name of fs.readdirSync(courseDir)) {
  if (!name.startsWith('manifest-') || !name.endsWith('.json')) continue;
  const mPath = path.join(courseDir, name);
  const manifest = JSON.parse(fs.readFileSync(mPath, 'utf8'));
  if (!manifest.terms) continue;
  enrichTerms(manifest.terms, course);
  fs.writeFileSync(mPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
}

console.log(`${slug}: added/updated ${added} prompts, skipped ${skipped} (min ${MIN_CHARS} chars)`);
