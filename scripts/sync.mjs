/**
 * 从 outline-specs.json 生成 courses.json（门户目录）
 * 用法：node scripts/sync.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const coursesRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'courses');
const specPath = path.join(coursesRoot, 'outline-specs.json');

function migrateLegacyFiles(spec) {
  let changed = false;

  const legacyInterview = path.join(coursesRoot, 'interview-scenarios.json');
  if (fs.existsSync(legacyInterview)) {
    const legacy = JSON.parse(fs.readFileSync(legacyInterview, 'utf8'));
    spec.interviewScenarios = legacy;
    fs.unlinkSync(legacyInterview);
    changed = true;
    console.log('已合并并删除 interview-scenarios.json');
  }

  const legacyLanding = path.join(coursesRoot, 'scenario-landing-courses.json');
  if (fs.existsSync(legacyLanding)) {
    fs.unlinkSync(legacyLanding);
    console.log('已删除 scenario-landing-courses.json（内容已在 outline-specs）');
  }

  if (spec.demoProject?.interviewScenariosFile) {
    delete spec.demoProject.interviewScenariosFile;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(specPath, JSON.stringify(spec, null, 2) + '\n');
  }
}

function applyInterviewScenariosToCourses(spec) {
  const interview = spec.interviewScenarios;
  if (!interview?.scenarios) return 0;

  const allIds = interview.scenarios.map((s) => s.id);
  const byCourse = {};

  for (const s of interview.scenarios) {
    for (const slug of s.courses ?? []) {
      if (!byCourse[slug]) byCourse[slug] = new Set();
      byCourse[slug].add(s.id);
    }
  }
  for (const slug of interview.crossCuttingCourses ?? []) {
    byCourse[slug] = new Set(allIds);
  }

  let updated = 0;
  for (const slug of Object.keys(spec.courses)) {
    const merged = [
      ...new Set([
        ...(spec.courses[slug].interviewScenarios ?? []),
        ...[...(byCourse[slug] ?? [])],
      ]),
    ].sort();
    if (!merged.length) continue;
    const prev = JSON.stringify(spec.courses[slug].interviewScenarios ?? []);
    spec.courses[slug].interviewScenarios = merged;
    if (JSON.stringify(merged) !== prev) updated += 1;
  }
  return updated;
}

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
migrateLegacyFiles(spec);
const specAfterMigrate = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const interviewUpdated = applyInterviewScenariosToCourses(specAfterMigrate);
if (interviewUpdated > 0) {
  fs.writeFileSync(
    specPath,
    JSON.stringify(specAfterMigrate, null, 2) + '\n'
  );
  console.log(`outline-specs: ${interviewUpdated} 门课 interviewScenarios 已同步`);
}

const specFinal = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const interview = specFinal.interviewScenarios;

function buildInterviewMap() {
  if (!interview?.scenarios) return {};
  const allIds = interview.scenarios.map((s) => s.id);
  const map = {};
  for (const s of interview.scenarios) {
    for (const slug of s.courses ?? []) {
      if (!map[slug]) map[slug] = new Set();
      map[slug].add(s.id);
    }
  }
  for (const slug of interview.crossCuttingCourses ?? []) {
    map[slug] = new Set(allIds);
  }
  return map;
}

const interviewByCourse = buildInterviewMap();

const prevPath = path.join(coursesRoot, 'courses.json');
const prev = fs.existsSync(prevPath)
  ? JSON.parse(fs.readFileSync(prevPath, 'utf8'))
  : { courses: [] };
const prevPublished = Object.fromEntries(
  prev.courses.map((c) => [c.slug, c.stats?.publishedChapters ?? 0])
);
// Count actual chapter HTML files on disk for each course
const published = {};
for (const slug of Object.keys(specFinal.courses)) {
  const chDir = path.join(coursesRoot, slug, 'chapters');
  const onDisk = fs.existsSync(chDir) ? fs.readdirSync(chDir).filter(f => f.endsWith('.html')).length : 0;
  published[slug] = Math.max(prevPublished[slug] ?? 0, onDisk);
}

const accents = {
  'llm-application-fundamentals': { light: '#1565c0', dark: '#64b5f6' },
  'transformer-algorithms-fundamentals': { light: '#5e35b1', dark: '#b39ddb' },
  'python-engineering-for-llm': { light: '#2e7d32', dark: '#81c784' },
  'spring-ai-engineering': { light: '#1b5e20', dark: '#66bb6a' },
  'production-prompt-engineering': { light: '#6a1b9a', dark: '#ce93d8' },
  'context-memory-engineering': { light: '#5e35b1', dark: '#b39ddb' },
  'llm-evaluation-quality': { light: '#00838f', dark: '#4dd0e1' },
  'rag-system-engineering': { light: '#e65100', dark: '#ffb74d' },
  'retrieval-vector-platform': { light: '#283593', dark: '#9fa8da' },
  'spring-ai-alibaba-engineering': { light: '#ff6f00', dark: '#ffb74d' },
  'knowledge-lifecycle-governance': { light: '#6d4c41', dark: '#bcaaa4' },
  'agent-orchestration-engineering': { light: '#c62828', dark: '#ef9a9a' },
  'multimodel-routing-multimodal': { light: '#0277bd', dark: '#4fc3f7' },
  'llm-application-backend': { light: '#00695c', dark: '#80cbc4' },
  'domain-model-adaptation': { light: '#5d4037', dark: '#bcaaa4' },
  'llm-serving-for-applications': { light: '#455a64', dark: '#90a4ae' },
  'observability-reliability-ops': { light: '#37474f', dark: '#b0bec5' },
  'security-compliance-engineering': { light: '#c62828', dark: '#ef9a9a' },
  'llamaindex-rag-engineering': { light: '#0d47a1', dark: '#42a5f5' },
  'rag-system-py': { light: '#1565c0', dark: '#64b5f6' },
  'rag-system-java': { light: '#1b5e20', dark: '#81c784' },
  'agent-orchestration-java': { light: '#2e7d32', dark: '#a5d6a7' },
  'ai-dev-toolchain': { light: '#00838f', dark: '#4dd0e1' },
  'enterprise-llm-solution-delivery': { light: '#1a237e', dark: '#7986cb' },
  'scenario-py-rag-kb': { light: '#e65100', dark: '#ffb74d' },
  'scenario-java-rag-kb': { light: '#bf360c', dark: '#ff8a65' },
  'scenario-py-customer-service': { light: '#ad1457', dark: '#f48fb1' },
  'scenario-java-customer-service': { light: '#880e4f', dark: '#f06292' },
  'scenario-py-agent-automation': { light: '#c62828', dark: '#ef9a9a' },
  'scenario-java-agent-automation': { light: '#b71c1c', dark: '#e57373' },
  'scenario-py-code-assistant': { light: '#00695c', dark: '#80cbc4' },
  'scenario-java-code-assistant': { light: '#004d40', dark: '#4db6ac' },
  'scenario-py-content-studio': { light: '#6a1b9a', dark: '#ce93d8' },
  'scenario-java-content-studio': { light: '#4a148c', dark: '#ba68c8' },
};

const summaries = {
  'llm-application-fundamentals':
    'Token/上下文、模型选型、API 与成本；建立双轨共同问题域。',
  'python-engineering-for-llm':
    'asyncio、FastAPI、测试与项目结构（Python 轨基座）。',
  'spring-ai-engineering':
    'ChatClient、RAG、Tools、Memory、Micrometer（Spring AI 轨基座）。',
  'production-prompt-engineering':
    'Prompt 模板、Few-shot/CoT、版本与 A/B；覆盖 S1/S2/S5 面试场景。',
  'context-memory-engineering':
    '上下文窗口、压缩、工作/会话/长期混合记忆（双栈对照）。',
  'llm-evaluation-quality':
    'RAGAS、人工评测、A/B、坏例归因、用户反馈闭环。',
  'rag-system-engineering':
    'RAG 全链路双栈概念；含 S1 知识库与 S4 代码库 RAG',
  'retrieval-vector-platform':
    'Milvus/ES 混合检索、Rerank、索引调优。',
  'spring-ai-alibaba-engineering':
    'DashScope、ReactAgent、Graph、MCP/A2A、Admin。',
  'knowledge-lifecycle-governance':
    '采集、版本、增量、权限与知识库质量运营。',
  'agent-orchestration-engineering':
    'LangGraph、多 Agent、工具调用与生产级 Agent。',
  'multimodel-routing-multimodal':
    '多模型路由、Fallback、图文多模态 RAG。',
  'llm-application-backend':
    'Spring Cloud 网关、SSE、限流、多租户、MQ。',
  'domain-model-adaptation':
    'SFT/LoRA 数据与流水线；DashScope 定制接入。',
  'llm-serving-for-applications':
    'Docker、vLLM、量化、KV 缓存（应用层）与双栈接入。',
  'observability-reliability-ops':
    'OTel/Micrometer、告警、灰度、Token 成本、故障演练。',
  'security-compliance-engineering':
    '内容安全、注入防护、脱敏、工具权限、审计合规。',
  'llamaindex-rag-engineering':
    '掌握 LlamaIndex 核心抽象、索引类型与高级 RAG 管线，在生产环境中部署多模态索引',
  'rag-system-py':
    '使用 LangChain 与 LlamaIndex 双框架实现 RAG 系统，含 GraphRAG 实操与 Grounding 工程',
  'rag-system-java':
    '使用 Spring AI 实现 RAG Pipeline，VectorStore 实战，多知识库路由与企业级部署',
  'agent-orchestration-java':
    '基于 Spring AI Alibaba 实现 ReAct Agent、Graph 工作流、多 Agent 编排与 MCP 集成',
  'ai-dev-toolchain':
    '掌握 Cursor/Copilot/Claude Code 等 AI 编码工具，构建 Prompt 驱动的开发工作流',
  'enterprise-llm-solution-delivery':
    '双栈方案、PoC、验收与 ToB 交付收官。',
  'scenario-py-rag-kb':
    '[Python] 企业 RAG 知识库问答系统设计与实现，含文档管线、混合检索与生产化交付',
  'scenario-java-rag-kb':
    '[Java] 企业 RAG 知识库问答系统设计与实现，基于 Spring AI 的全链路实现',
  'scenario-py-customer-service':
    '[Python] 智能客服系统设计，含意图路由、多轮对话、工具调用与人工转接',
  'scenario-java-customer-service':
    '[Java] 智能客服系统设计，基于 Spring AI 的对话引擎与降级策略',
  'scenario-py-agent-automation':
    '[Python] Agent 任务自动化系统，LangGraph 工作流 + 多工具协作 + 生产可靠性',
  'scenario-java-agent-automation':
    '[Java] Agent 任务自动化系统，SAA Graph + 分布式 Agent + 容灾降级',
  'scenario-py-code-assistant':
    '[Python] 代码助手系统，代码库 RAG + FIM + 延迟优化 + IDE 集成',
  'scenario-java-code-assistant':
    '[Java] 代码助手系统，Spring AI 代码检索 + 安全检测 + 效能度量',
  'scenario-py-content-studio':
    '[Python] 内容生成工坊，风格控制 + 模板引擎 + 审核流水线 + 个性化',
  'scenario-java-content-studio':
    '[Java] 内容生成工坊，Spring 编排 + 批量生成 + 合规审核 + A/B 实验',
};

const prerequisites = {
  'llm-application-fundamentals': ['具备 Java 分布式/微服务经验'],
  'python-engineering-for-llm': ['《大模型应用基础》'],
  'spring-ai-engineering': ['《大模型应用基础》', 'Spring Boot 3 + 微服务经验'],
  'production-prompt-engineering': ['《大模型应用基础》', '双栈基座课进行中'],
  'security-compliance-engineering': ['《生产级 Prompt》', '可与可观测课并行'],
  'context-memory-engineering': ['《生产级 Prompt 与对话工程》', '双栈基座课进行中'],
  'rag-system-engineering': ['《生产级 Prompt》', '双栈基座 basics 完成'],
  'knowledge-lifecycle-governance': ['《RAG 双栈主课》basics'],
  'llm-evaluation-quality': ['《生产级 Prompt 与对话工程》'],
  'multimodel-routing-multimodal': ['《RAG 双栈主课》practice', '《Spring AI 工程化》advanced'],
  'retrieval-vector-platform': ['《RAG 双栈主课》basics'],
  'spring-ai-alibaba-engineering': ['《Spring AI 工程化》practice'],
  'agent-orchestration-engineering': ['《RAG 双栈主课》', '《Spring AI Alibaba》basics'],
  'llamaindex-rag-engineering': ['《Python 工程化》basics', '《RAG 双栈主课》basics'],
  'rag-system-py': ['《RAG 双栈主课》basics', '《Python 工程化》practice'],
  'rag-system-java': ['《RAG 双栈主课》basics', '《Spring AI 工程化》practice'],
  'agent-orchestration-java': ['《Spring AI Alibaba》practice', '《RAG 双栈主课》basics'],
  'ai-dev-toolchain': ['《Python 工程化》basics'],
  'llm-application-backend': ['《Spring AI 工程化》practice'],
  'domain-model-adaptation': ['阶段四课程进行中'],
  'llm-serving-for-applications': ['阶段四课程进行中'],
  'observability-reliability-ops': ['阶段四课程进行中'],
  'enterprise-llm-solution-delivery': [
    '至少完成 1 门场景课',
    '完成 stage-4 与 stage-5 核心课',
    'security-compliance-engineering basics',
  ],
  'scenario-py-rag-kb': [
    '《RAG 双栈主课》practice',
    '《向量检索平台》basics',
  ],
  'scenario-java-rag-kb': [
    '《RAG 双栈主课》practice',
    '《Spring AI 工程化》practice',
  ],
  'scenario-py-customer-service': [
    '《上下文记忆》practice',
    '《Agent 编排》basics',
    '《生产级 Prompt》',
    'security-compliance-engineering basics',
  ],
  'scenario-java-customer-service': [
    '《上下文记忆》practice',
    '《Agent 编排》basics',
    '《生产级 Prompt》',
    'security-compliance-engineering basics',
  ],
  'scenario-py-agent-automation': [
    '《Agent 编排》practice',
    '《Spring AI Alibaba》practice',
  ],
  'scenario-java-agent-automation': [
    '《Agent 编排》practice',
    '《Spring AI Alibaba》practice',
  ],
  'scenario-py-code-assistant': [
    '《RAG 双栈主课》practice',
    '《上下文记忆》basics',
  ],
  'scenario-java-code-assistant': [
    '《RAG 双栈主课》practice',
    '《上下文记忆》basics',
  ],
  'scenario-py-content-studio': [
    '《生产级 Prompt》practice',
    '《多模型与多模态》basics',
    'security-compliance-engineering basics',
  ],
  'scenario-java-content-studio': [
    '《生产级 Prompt》practice',
    '《多模型与多模态》basics',
    'security-compliance-engineering basics',
  ],
};

/** @type {import('../outline-specs.json').learningPath} */
const defaultLearningPath = {
  mode: 'dual-track',
  goal: '掌握 Python 与 Spring AI 两套工程体系，能在同一业务场景下实现、联调与交付。',
  trackLegend: [
    { id: 'shared', label: '共享能力课' },
    { id: 'python', label: 'Python 轨' },
    { id: 'java', label: 'Java 轨' },
    { id: 'scenario', label: '场景落地课' },
  ],
  stages: [],
  completionRule: {
    requiredTracks: 'one',
    requiredShared: 'all',
    requiredScenario: {
      mandatory: [],
      electiveMin: 1,
      electiveFrom: [],
    },
    securityBasicsBeforeScenario: true,
    capstoneLayersRequired: ['layer-1', 'layer-2', 'layer-3'],
  },
};

function buildLearningPath(spec) {
  const lp = spec.learningPath ?? defaultLearningPath;
  const stages = (lp.stages ?? []).map((s) => {
    const out = { id: s.id, title: s.title };
    if (s.shared) out.shared = s.shared;
    if (s.parallel) out.parallel = s.parallel;
    if (s.bridge) out.bridge = s.bridge;
    if (s.scenarioMandatory || s.scenarioElective) {
      out.scenario = [
        ...(s.scenarioMandatory ?? []),
        ...(s.scenarioElective ?? []),
      ];
      out.scenarioMandatory = s.scenarioMandatory;
      out.scenarioElective = s.scenarioElective;
    } else if (s.scenario) {
      out.scenario = s.scenario;
    }
    if (s.notes) out.notes = s.notes;
    if (s.prerequisiteFor) out.prerequisiteFor = s.prerequisiteFor;
    if (s.capstoneLayers) out.capstoneLayers = s.capstoneLayers;
    return out;
  });
  return {
    mode: lp.mode ?? 'dual-track',
    goal: lp.goal,
    trackLegend: lp.trackLegend ?? defaultLearningPath.trackLegend,
    stages,
    completionRule: lp.completionRule ?? defaultLearningPath.completionRule,
    northStarCapabilities: spec.northStarCapabilities ?? [],
    capstoneModel: spec.capstoneModel ?? null,
  };
}

const TRACK_ORDER = {
  shared: 0,
  python: 1,
  java: 2,
  scenario: 3,
};

const trackOrder = {
  'llm-application-fundamentals': 1,
  'python-engineering-for-llm': 2,
  'ai-dev-toolchain': 2,
  'spring-ai-engineering': 2,
  'spring-ai-alibaba-engineering': 2,
  'production-prompt-engineering': 3,
  'security-compliance-engineering': 3,
  'context-memory-engineering': 3,
  'rag-system-engineering': 4,
  'knowledge-lifecycle-governance': 4,
  'rag-system-py': 4,
  'llamaindex-rag-engineering': 4,
  'retrieval-vector-platform': 4,
  'rag-system-java': 4,
  'llm-application-backend': 4,
  'llm-evaluation-quality': 5,
  'multimodel-routing-multimodal': 5,
  'agent-orchestration-engineering': 5,
  'agent-orchestration-java': 5,
  'domain-model-adaptation': 6,
  'llm-serving-for-applications': 6,
  'observability-reliability-ops': 6,
  'scenario-py-rag-kb': 7,
  'scenario-java-rag-kb': 7,
  'scenario-py-customer-service': 7,
  'scenario-java-customer-service': 7,
  'scenario-py-agent-automation': 7,
  'scenario-java-agent-automation': 7,
  'scenario-py-code-assistant': 7,
  'scenario-java-code-assistant': 7,
  'scenario-py-content-studio': 7,
  'scenario-java-content-studio': 7,
  'enterprise-llm-solution-delivery': 8,
};

/** 优先用磁盘 course.json 的 outline（与侧栏一致），否则 outline-specs */
function loadOutlineForSlug(slug, specCourse) {
  const courseJsonPath = path.join(coursesRoot, slug, 'course.json');
  if (fs.existsSync(courseJsonPath)) {
    try {
      const local = JSON.parse(fs.readFileSync(courseJsonPath, 'utf8'));
      if (Array.isArray(local.outline) && local.outline.length) return local.outline;
    } catch (e) {
      console.warn(`warn: ${slug}/course.json outline 解析失败，回退 outline-specs`);
    }
  }
  return specCourse.outline || [];
}

function chaptersFromOutline(outline) {
  return outline.reduce((n, ph) => n + (ph.chapters?.length || 0), 0);
}

const TRACK_LABELS = {
  shared: '共享能力课',
  python: 'Python 轨',
  java: 'Java 轨',
  scenario: '场景落地课',
};

function buildCurriculumGlossary(spec) {
  const glossary = {};
  for (const ns of spec.northStarCapabilities ?? []) {
    glossary[ns.id] = {
      id: ns.id,
      kind: 'northStar',
      label: ns.readerLabel ?? ns.title,
      title: ns.title,
      popularTerms: ns.popularTerms ?? [],
      oneLiner: ns.oneLiner ?? ns.summary ?? '',
      summary: ns.summary ?? '',
    };
  }
  for (const s of spec.interviewScenarios?.scenarios ?? []) {
    glossary[s.id] = {
      id: s.id,
      kind: 'scenario',
      label: s.readerLabel ?? s.title,
      title: s.title,
      popularTerms: s.popularTerms ?? [],
      oneLiner: s.oneLiner ?? '',
    };
  }
  return glossary;
}

function buildNorthStarIndex(spec) {
  return Object.fromEntries(
    (spec.northStarCapabilities ?? []).map((ns) => [
      ns.id,
      {
        title: ns.title,
        readerLabel: ns.readerLabel ?? ns.title,
        popularTerms: ns.popularTerms ?? [],
        oneLiner: ns.oneLiner ?? ns.summary ?? '',
        summary: ns.summary ?? '',
        primaryCourses: ns.primaryCourses ?? [],
      },
    ])
  );
}

function buildScenarioMeta(spec) {
  const bySlug = {};
  for (const s of spec.interviewScenarios?.scenarios ?? []) {
    const meta = {
      id: s.id,
      title: s.title,
      scenarioRole: s.scenarioRole ?? null,
      northStarFocus: s.northStarFocus ?? [],
      productionPitfalls: s.productionPitfalls ?? [],
      subTracks: s.subTracks ?? null,
    };
    if (s.landingCourse) bySlug[s.landingCourse] = meta;
    for (const slug of s.courses ?? []) {
      if (!bySlug[slug]) bySlug[slug] = { ...meta, scenarioRole: bySlug[slug]?.scenarioRole ?? null };
    }
  }
  return bySlug;
}

const EN_TITLES = {
  'llm-application-fundamentals': 'llm-application-fundamentals',
  'python-engineering-for-llm': 'python-engineering-for-llm',
  'spring-ai-engineering': 'spring-ai-engineering',
  'spring-ai-alibaba-engineering': 'spring-ai-alibaba-engineering',
  'production-prompt-engineering': 'production-prompt-engineering',
  'context-memory-engineering': 'context-memory-engineering',
  'llm-evaluation-quality': 'llm-evaluation-quality',
  'rag-system-engineering': 'rag-system-engineering',
  'rag-system-py': 'rag-system-py',
  'rag-system-java': 'rag-system-java',
  'llamaindex-rag-engineering': 'llamaindex-rag-engineering',
  'retrieval-vector-platform': 'retrieval-vector-platform',
  'agent-orchestration-engineering': 'agent-orchestration-engineering',
  'agent-orchestration-java': 'agent-orchestration-java',
  'agentscope-agent-engineering': 'agentscope-agent-engineering',
  'agentscope-agent-engineering-java': 'agentscope-agent-engineering-java',
  'agentscope-harness-engineering': 'agentscope-harness-engineering',
  'ai-dev-toolchain': 'ai-dev-toolchain',
  'domain-model-adaptation': 'domain-model-adaptation',
  'llm-serving-for-applications': 'llm-serving-for-applications',
  'multimodel-routing-multimodal': 'multimodel-routing-multimodal',
  'knowledge-lifecycle-governance': 'knowledge-lifecycle-governance',
  'observability-reliability-ops': 'observability-reliability-ops',
  'security-compliance-engineering': 'security-compliance-engineering',
  'llm-application-backend': 'llm-application-backend',
  'enterprise-llm-solution-delivery': 'enterprise-llm-solution-delivery',
  'scenario-py-rag-kb': 'scenario-py-rag-kb',
  'scenario-java-rag-kb': 'scenario-java-rag-kb',
  'scenario-py-customer-service': 'scenario-py-customer-service',
  'scenario-java-customer-service': 'scenario-java-customer-service',
  'scenario-py-agent-automation': 'scenario-py-agent-automation',
  'scenario-java-agent-automation': 'scenario-java-agent-automation',
  'scenario-py-code-assistant': 'scenario-py-code-assistant',
  'scenario-java-code-assistant': 'scenario-java-code-assistant',
  'scenario-py-content-studio': 'scenario-py-content-studio',
  'scenario-java-content-studio': 'scenario-java-content-studio',
};

function enrichCourse(slug, c, spec, scenarioMetaBySlug) {
  const rule = spec.learningPath?.completionRule?.requiredScenario;
  let scenarioRole = scenarioMetaBySlug[slug]?.scenarioRole ?? null;
  if (!scenarioRole && rule?.mandatory?.includes(slug)) scenarioRole = 'mandatory';
  if (!scenarioRole && rule?.electiveFrom?.includes(slug)) scenarioRole = 'elective';

  const northStarIds = new Set();
  for (const ns of spec.northStarCapabilities ?? []) {
    if (ns.primaryCourses?.includes(slug)) northStarIds.add(ns.id);
  }
  for (const id of scenarioMetaBySlug[slug]?.northStarFocus ?? []) {
    northStarIds.add(id);
  }

  const track = c.track ?? 'shared';
  const outline = loadOutlineForSlug(slug, c);
  const totalChapters = chaptersFromOutline(outline);
  const publishedTotal = published[slug] ?? 0;
  return {
    slug,
    track,
    trackLabel: TRACK_LABELS[track] ?? track,
    trackOrder: trackOrder[slug] ?? 99,
    title: c.title,
    enTitle: EN_TITLES[slug] ?? '',
    summary: summaries[slug] ?? c.title,
    path: `${slug}/index.html`,
    themePreset: slug,
    accent: accents[slug] ?? { light: '#1565c0', dark: '#64b5f6' },
    stats: {
      phases: outline.length,
      chapters: totalChapters,
      publishedChapters: publishedTotal,
    },
    capabilityIds: c.capabilityIds ?? [],
    prerequisites: prerequisites[slug] ?? [],
    interviewScenarios: [
      ...new Set([
        ...(c.interviewScenarios ?? []),
        ...[...(interviewByCourse[slug] ?? [])],
      ]),
    ].sort(),
    scenarioRole,
    northStarIds: [...northStarIds].sort(),
    scenarioMeta: scenarioMetaBySlug[slug] ?? null,
  };
}

const scenarioMetaBySlug = buildScenarioMeta(specFinal);

const courses = Object.keys(specFinal.courses)
  .sort((a, b) => {
    const trackA = specFinal.courses[a]?.track ?? 'shared';
    const trackB = specFinal.courses[b]?.track ?? 'shared';
    const trackDiff = (TRACK_ORDER[trackA] ?? 99) - (TRACK_ORDER[trackB] ?? 99);
    if (trackDiff !== 0) return trackDiff;
    return (trackOrder[a] ?? 99) - (trackOrder[b] ?? 99);
  })
  .map((slug) => enrichCourse(slug, specFinal.courses[slug], specFinal, scenarioMetaBySlug));

const catalog = {
  title: '大模型应用开发 · 课程中心',
  subtitle: 'Python × Spring AI 双轨并行 · 复合型应用工程（3–5 年）',
  globalThemeKey: 'html-tutorial_theme',
  outlineSpecFile: 'outline-specs.json',
  outlineSpecVersion: specFinal.schemaVersion ?? '1',
  courseTitleCatalog: Object.fromEntries(
    courses.map((c) => [c.slug, c.title])
  ),
  learningPath: buildLearningPath(specFinal),
  interviewScenarioIndex: Object.fromEntries(
    (specFinal.interviewScenarios?.scenarios ?? []).map((s) => [
      s.id,
      {
        title: s.title,
        readerLabel: s.readerLabel ?? s.title,
        popularTerms: s.popularTerms ?? [],
        oneLiner: s.oneLiner ?? '',
        landingCourse: s.landingCourse,
        scenarioRole: s.scenarioRole,
        northStarFocus: s.northStarFocus ?? [],
        productionPitfalls: s.productionPitfalls ?? [],
        subTracks: s.subTracks ?? null,
      },
    ])
  ),
  northStarIndex: buildNorthStarIndex(specFinal),
  curriculumGlossary: buildCurriculumGlossary(specFinal),
  courses,
};

fs.writeFileSync(prevPath, JSON.stringify(catalog, null, 2) + '\n');
const total = courses.reduce((s, c) => s + c.stats.chapters, 0);
console.log(`courses.json: ${courses.length} 门课, ${total} 章`);
