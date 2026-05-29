/**
 * 从 outline-specs.json 生成 courses.json（门户目录）
 * 用法：node scripts/sync.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const specPath = path.join(root, 'outline-specs.json');

function migrateLegacyFiles(spec) {
  let changed = false;

  const legacyInterview = path.join(root, 'interview-scenarios.json');
  if (fs.existsSync(legacyInterview)) {
    const legacy = JSON.parse(fs.readFileSync(legacyInterview, 'utf8'));
    spec.interviewScenarios = legacy;
    fs.unlinkSync(legacyInterview);
    changed = true;
    console.log('已合并并删除 interview-scenarios.json');
  }

  const legacyLanding = path.join(root, 'scenario-landing-courses.json');
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

const prevPath = path.join(root, 'courses.json');
const prev = fs.existsSync(prevPath)
  ? JSON.parse(fs.readFileSync(prevPath, 'utf8'))
  : { courses: [] };
const published = Object.fromEntries(
  prev.courses.map((c) => [c.slug, c.stats?.publishedChapters ?? 0])
);

const accents = {
  'llm-application-fundamentals': { light: '#1565c0', dark: '#64b5f6' },
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
  'llm-composite-integration-workshop': { light: '#512da8', dark: '#b39ddb' },
  'llm-application-backend': { light: '#00695c', dark: '#80cbc4' },
  'domain-model-adaptation': { light: '#5d4037', dark: '#bcaaa4' },
  'llm-serving-for-applications': { light: '#455a64', dark: '#90a4ae' },
  'observability-reliability-ops': { light: '#37474f', dark: '#b0bec5' },
  'security-compliance-engineering': { light: '#c62828', dark: '#ef9a9a' },
  'enterprise-llm-solution-delivery': { light: '#1a237e', dark: '#7986cb' },
  'scenario-enterprise-rag-kb': { light: '#e65100', dark: '#ffb74d' },
  'scenario-enterprise-customer-service': { light: '#ad1457', dark: '#f48fb1' },
  'scenario-enterprise-agent-automation': { light: '#c62828', dark: '#ef9a9a' },
  'scenario-enterprise-code-assistant': { light: '#00695c', dark: '#80cbc4' },
  'scenario-enterprise-content-studio': { light: '#6a1b9a', dark: '#ce93d8' },
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
    'RAG 全链路双栈实现；含 S1 知识库与 S4 代码库 RAG 面试场景。',
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
  'llm-composite-integration-workshop':
    'CorpAssist 双栈联调：Spring 治理面 + Python AI 能力面。',
  'llm-application-backend':
    '网关、SSE、限流、多租户、MQ；Spring Cloud + FastAPI。',
  'domain-model-adaptation':
    'SFT/LoRA 数据与流水线；DashScope 定制接入。',
  'llm-serving-for-applications':
    'Docker、vLLM、量化、KV 缓存（应用层）与双栈接入。',
  'observability-reliability-ops':
    'OTel/Micrometer、告警、灰度、Token 成本、故障演练。',
  'security-compliance-engineering':
    '内容安全、注入防护、脱敏、工具权限、审计合规。',
  'enterprise-llm-solution-delivery':
    '双栈方案、PoC、验收与 ToB 交付收官。',
  'scenario-enterprise-rag-kb':
    'CorpAssist 知识库端到端落地（S1）；双栈 + 评测 + 面试答辩。',
  'scenario-enterprise-customer-service':
    'CorpAssist 智能客服端到端落地（S2）；意图/工具/转人工。',
  'scenario-enterprise-agent-automation':
    'CorpAssist 办公 Agent 端到端落地（S3）；LangGraph + SAA。',
  'scenario-enterprise-code-assistant':
    'CorpAssist 代码助手端到端落地（S4）；代码 RAG + 延迟优化。',
  'scenario-enterprise-content-studio':
    'CorpAssist 内容工坊端到端落地（S5）；模板/审核/个性化。',
};

const prerequisites = {
  'llm-application-fundamentals': ['具备 Java 分布式/微服务经验'],
  'python-engineering-for-llm': ['《大模型应用基础》'],
  'spring-ai-engineering': ['《大模型应用基础》', 'Spring Boot 3 + 微服务经验'],
  'production-prompt-engineering': ['《大模型应用基础》', '双栈基座课进行中'],
  'context-memory-engineering': ['《生产级 Prompt 与对话工程》', '双栈基座课进行中'],
  'llm-evaluation-quality': ['《生产级 Prompt 与对话工程》'],
  'rag-system-engineering': ['《生产级 Prompt》', '双栈基座 basics 完成'],
  'retrieval-vector-platform': ['《RAG 双栈主课》basics'],
  'spring-ai-alibaba-engineering': ['《Spring AI 工程化》practice'],
  'knowledge-lifecycle-governance': ['《RAG 双栈主课》basics'],
  'agent-orchestration-engineering': ['《RAG 双栈主课》', '《Spring AI Alibaba》basics'],
  'multimodel-routing-multimodal': ['《RAG 双栈主课》practice', '《Spring AI 工程化》advanced'],
  'llm-composite-integration-workshop': ['《RAG》practice', '《SAA》与《Agent》basics'],
  'llm-application-backend': ['《双栈集成实战》basics'],
  'domain-model-adaptation': ['《双栈集成实战》'],
  'llm-serving-for-applications': ['《应用后端治理》'],
  'observability-reliability-ops': ['阶段三汇合课进行中'],
  'security-compliance-engineering': ['《生产级 Prompt》', '可与可观测课并行'],
  'enterprise-llm-solution-delivery': [
    '完成 layer-1：至少 1 门场景课（必修 S1 + 选修 ≥1）',
    '完成 layer-2：llm-composite-integration-workshop',
    'security-compliance-engineering basics（场景课前）',
  ],
  'scenario-enterprise-rag-kb': [
    '《RAG 双栈主课》practice',
    '《向量检索平台》basics',
  ],
  'scenario-enterprise-customer-service': [
    '《上下文记忆》practice',
    '《Agent 编排》basics',
    '《生产级 Prompt》',
    'security-compliance-engineering basics',
  ],
  'scenario-enterprise-agent-automation': [
    '《Agent 编排》practice',
    '《Spring AI Alibaba》practice',
  ],
  'scenario-enterprise-code-assistant': [
    '《RAG 双栈主课》practice',
    '《上下文记忆》basics',
  ],
  'scenario-enterprise-content-studio': [
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
    { id: 'shared', label: '共用轨' },
    { id: 'python', label: 'Python 轨' },
    { id: 'java', label: 'Spring AI 轨' },
    { id: 'bridge', label: '汇合轨' },
    { id: 'scenario', label: '场景落地轨' },
  ],
  stages: [],
  completionRule: {
    requiredTracks: ['python', 'java'],
    requiredShared: 'all',
    requiredBridge: 'all',
    requiredScenario: 'all',
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

const trackOrder = {
  'llm-application-fundamentals': 1,
  'python-engineering-for-llm': 2,
  'spring-ai-engineering': 2,
  'production-prompt-engineering': 3,
  'context-memory-engineering': 4,
  'llm-evaluation-quality': 5,
  'rag-system-engineering': 6,
  'retrieval-vector-platform': 7,
  'spring-ai-alibaba-engineering': 7,
  'knowledge-lifecycle-governance': 8,
  'agent-orchestration-engineering': 9,
  'multimodel-routing-multimodal': 10,
  'llm-composite-integration-workshop': 11,
  'llm-application-backend': 12,
  'domain-model-adaptation': 13,
  'llm-serving-for-applications': 14,
  'observability-reliability-ops': 15,
  'security-compliance-engineering': 15,
  'scenario-enterprise-rag-kb': 15,
  'scenario-enterprise-customer-service': 15,
  'scenario-enterprise-agent-automation': 15,
  'scenario-enterprise-code-assistant': 15,
  'scenario-enterprise-content-studio': 15,
  'enterprise-llm-solution-delivery': 16,
};

function chapters(c) {
  return c.outline.reduce((n, ph) => n + ph.chapters.length, 0);
}

const TRACK_LABELS = {
  shared: '共用轨',
  python: 'Python 轨',
  java: 'Spring AI 轨',
  bridge: '汇合轨',
  scenario: '场景落地',
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
  return {
    slug,
    track,
    trackLabel: TRACK_LABELS[track] ?? track,
    trackOrder: trackOrder[slug] ?? 99,
    title: c.title,
    summary: summaries[slug] ?? c.title,
    path: `${slug}/index.html`,
    themePreset: slug,
    accent: accents[slug] ?? { light: '#1565c0', dark: '#64b5f6' },
    stats: {
      phases: 3,
      chapters: chapters(c),
      publishedChapters: published[slug] ?? 0,
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
  .sort((a, b) => (trackOrder[a] ?? 99) - (trackOrder[b] ?? 99))
  .map((slug) => enrichCourse(slug, specFinal.courses[slug], specFinal, scenarioMetaBySlug));

const catalog = {
  title: '大模型应用开发 · 课程中心',
  subtitle: 'Python × Spring AI 双轨并行 · 复合型应用工程（3–5 年）',
  globalThemeKey: 'study-self_theme',
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
