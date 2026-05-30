/**
 * 重新生成 context-memory-engineering 全章（示例级深度）
 * 用法：node scripts/gen-context-memory-full.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const courseDir = path.join(root, 'context-memory-engineering');
const SLUG = 'context-memory-engineering';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function term(id, label) {
  return `<span class="term" data-term-id="${id}" tabindex="0">${label ?? id.replace(/-/g, ' ')}</span>`;
}

function codeBlock(lang, code) {
  return `<div class="code-block"><div class="code-toolbar"><span class="lang-tag">${lang}</span><button type="button" class="btn-copy" aria-label="复制代码">复制</button></div>
<pre><code class="language-${lang}">${esc(code.trim())}</code></pre></div>`;
}

function mermaid(title, diagram, caption) {
  return `<div class="mermaid-wrap"><h5>${esc(title)}</h5>
<pre class="mermaid">${esc(diagram.trim())}</pre>
${caption ? `<p class="diagram-caption">${caption}</p>` : ''}</div>`;
}

function buildSection(sec) {
  const blocks = [`<div class="section-block"><h3>${esc(sec.h)}</h3>`];
  if (sec.scenario) {
    blocks.push(`<aside class="learn-scenario" aria-label="业务情境"><span class="learn-scenario-title">${esc(sec.scenarioTitle ?? 'CorpAssist')}</span>${sec.scenario}</aside>`);
  }
  blocks.push(`<p>${sec.body}</p>`);
  if (sec.list) blocks.push('<ul>' + sec.list.map((li) => `<li>${li}</li>`).join('') + '</ul>');
  if (sec.table) {
    blocks.push(`<div class="outline-table-wrap"><table class="outline-table"><thead><tr>${sec.table.headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>`);
    for (const row of sec.table.rows) blocks.push(`<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`);
    blocks.push('</tbody></table></div>');
  }
  if (sec.compare) {
    blocks.push(`<div class="learn-compare"><div class="learn-compare-col learn-compare-bad"><span class="learn-compare-heading">不推荐</span><ul>${sec.compare.bad.map((x) => `<li>${x}</li>`).join('')}</ul></div>
<div class="learn-compare-col learn-compare-good"><span class="learn-compare-heading">推荐</span><ul>${sec.compare.good.map((x) => `<li>${x}</li>`).join('')}</ul></div></div>`);
  }
  if (sec.code) {
    blocks.push(`<h4>${sec.codeTitle ?? '代码示例'}</h4>`);
    blocks.push(codeBlock(sec.code.lang, sec.code.body));
  }
  if (sec.mermaid) blocks.push(mermaid(sec.mermaid.title, sec.mermaid.body, sec.mermaid.caption));
  if (sec.faq) blocks.push(`<details class="learn-faq"><summary>${sec.faq.q}</summary><p>${sec.faq.a}</p></details>`);
  if (sec.microCheck) blocks.push(`<details class="learn-micro-check"><summary>${sec.microCheck.q}</summary><p>${sec.microCheck.a}</p></details>`);
  blocks.push('</div>');
  return blocks.join('\n');
}

function buildChapter(ch) {
  const n = ch.sections.length;
  const sectionsHtml = ch.sections.map((s) => buildSection(s)).join('\n');
  const conclusions = ch.sections
    .map((s) => `<li><strong>${esc(s.h)}</strong>：${s.conclusion ?? s.body.replace(/<[^>]+>/g, '').slice(0, 100)}</li>`)
    .join('\n');
  const checklistItems = ch.checklist ?? [
    '能复述本章核心 takeaway',
    '完成正文对照表或代码示例阅读',
    '完成判断练习',
    '完成 Demo 或等价笔记',
    '已完成章节测验',
  ];
  const judgment = ch.judgment ?? {
    stem: ch.judgmentStem ?? '客服会话无限堆 raw history 进 prompt，30 轮后 P95 延迟飙升且模型开始「忘记」改单约束。优先排查什么？',
    answer: ch.judgmentAnswer ?? '根因是未做 Token 预算与截断/摘要；应启用 window budget、结构化 DST 与 Redis 会话 key 一致的双栈策略，而非换更大模型。',
  };

  return `<section id="ch-${ch.id}" class="chapter" data-chapter="${ch.id}">
  <header class="chapter-header">
    <h2><span class="chapter-done-badge">已完成</span>${esc(ch.title)}</h2>
    <button type="button" class="btn-mark-done" data-chapter="${ch.id}" aria-label="标记本章完成">标记完成</button>
  </header>
  <div class="concept">
    <div class="chapter-intro content-section">
      <p class="chapter-meta">约 <strong>${ch.minutes} 分钟</strong> · 阶段：<strong>${esc(ch.phase)}</strong> · 能力：${esc(ch.goal)}</p>
      <div class="notice notice-why-learn"><strong>为什么要学本章</strong><p>${ch.why}</p></div>
      <div class="notice notice-outcome"><strong>学完你能</strong><ul>${ch.outcomes.map((o) => `<li>${o}</li>`).join('')}</ul></div>
      <div class="notice"><strong>本章先记住 ${ch.remember.length} 件事</strong><ul>${ch.remember.map((r) => `<li>${r}</li>`).join('')}</ul></div>
    </div>
${sectionsHtml}
    <div class="section-block chapter-conclusions-block notice">
      <h3>本章结论</h3>
      <p class="chapter-conclusions-lead">${ch.conclusionLead ?? '本章能力将接入 CorpAssist 双栈记忆子系统，并衔接 S2 客服 / S3 Agent 场景。'}</p>
      <ul class="chapter-conclusions-list">${conclusions}</ul>
    </div>
    <div class="section-block learn-review-block">
      <h3>复习与自检</h3>
      <div class="learn-checklist" data-storage-key="${SLUG}_${ch.id.replace(/-/g, '_')}">
        <p class="learn-checklist-lead">过关清单（勾选会保存在本浏览器）</p>
        <p class="learn-checklist-progress" aria-live="polite">0 / ${checklistItems.length} 已勾选</p>
        <ul>${checklistItems.map((c, i) => `<li><label><input type="checkbox" data-id="c${i}" /> ${c}</label></li>`).join('')}</ul>
      </div>
      ${ch.interview ? `<div class="learn-interview"><details><summary>答辩 / 面试口述题</summary><div class="learn-interview-body"><ol>${ch.interview.map((q) => `<li>${q}</li>`).join('')}</ol></div></details></div>` : ''}
      <p class="chapter-review-next">下一步：勾选过关清单、完成章节测验${ch.next ? `；${ch.next}` : ''}。</p>
    </div>
  </div>
  <div class="official-links content-section"><h3>官方文档</h3><ul>${ch.officialLinks.map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener">${esc(l.label)}</a></li>`).join('')}</ul></div>
  <div class="chapter-practice">
    <h3>动手练习</h3>
    <p class="steps-intro">${ch.practiceIntro}</p>
    <h4 class="practice-section-title">操作步骤</h4>
    <ol class="steps steps-operate">${ch.practiceSteps.map((s) => `<li>${s}</li>`).join('')}</ol>
    <h4 class="practice-section-title">判断练习</h4>
    <ol class="steps-judgment-list"><li><p class="judgment-stem">${judgment.stem}</p>
    <div class="learn-practice-answer"><details><summary>参考答案</summary><div class="learn-practice-answer-body"><p>${judgment.answer}</p></div></details></div></li></ol>
    <div class="demo-box"><h4 class="demo-box-title">Demo：${esc(ch.title)}</h4><p>${ch.demoBox}</p></div>
  </div>
  <div class="resources content-section"><h3>延伸学习</h3><ul>${ch.resources.map((r) => `<li>${r}</li>`).join('')}</ul></div>
</section>`;
}

function buildQuiz(ch, prefix) {
  const q = ch.quiz ?? {};
  return `<section id="quiz-${ch.id}-quiz" class="quiz-section" data-quiz="${ch.id}-quiz" data-chapter="${ch.id}">
  <h3>章节测验</h3>
  <p class="quiz-panel-lead">学完「${esc(ch.title)}」后作答。<span class="quiz-level-hint">热身+理解+场景</span></p>
  <article class="quiz-item" data-qid="q1" data-answer="${q.q1?.answer ?? 'A'}"><p class="stem"><strong>1.</strong> （单选）${q.q1?.stem ?? `本章首要工程目标是？`}</p>
  <ul class="options">${(q.q1?.opts ?? [`A) ${ch.goal}`, 'B) 训练基础模型', 'C) 仅做 UI']).map((o, i) => {
    const v = String.fromCharCode(65 + i);
    return `<li><label><input type="radio" name="${prefix}-q1" value="${v}"> ${esc(o)}</label></li>`;
  }).join('')}</ul>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q1?.hint ?? '见本章学习目标'}</p><p class="answer hidden"><strong>答案：</strong>${q.q1?.answer ?? 'A'} — ${q.q1?.explain ?? ch.goal}</p></article>
  <article class="quiz-item" data-qid="q2" data-answer="${q.q2?.answer ?? 'A,C'}"><p class="stem"><strong>2.</strong> （多选）${q.q2?.stem ?? 'CorpAssist 混合记忆生产实践应包含？'}</p>
  <ul class="options"><li><label><input type="checkbox" name="${prefix}-q2" value="A"> A) Token 预算与截断/压缩</label></li>
  <li><label><input type="checkbox" name="${prefix}-q2" value="B"> B) 无限堆历史不设上限</label></li>
  <li><label><input type="checkbox" name="${prefix}-q2" value="C"> C) 长期记忆 TTL 与审计</label></li>
  <li><label><input type="checkbox" name="${prefix}-q2" value="D"> D) 双栈 session key 一致</label></li></ul>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q2?.hint ?? '见正文对比表'}</p><p class="answer hidden"><strong>答案：</strong>${q.q2?.answer ?? 'A,C,D'}</p></article>
  <article class="quiz-item" data-qid="q3" data-answer="${q.q3?.answer ?? 'B'}"><p class="stem"><strong>3.</strong> （场景）${q.q3?.stem ?? 'S2 客服 20 轮后模型开始改错订单状态，最可能原因？'}</p>
  <ul class="options"><li><label><input type="radio" name="${prefix}-q3" value="A"> A) 模型能力不足</label></li>
  <li><label><input type="radio" name="${prefix}-q3" value="B"> B) 摘要丢失结构化 DST / 约束被截断</label></li>
  <li><label><input type="radio" name="${prefix}-q3" value="C"> C) Redis 未安装</label></li></ul>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q3?.hint ?? '记忆与截断'}</p><p class="answer hidden"><strong>答案：</strong>${q.q3?.answer ?? 'B'}</p></article>
  <article class="quiz-item" data-qid="q4" data-answer="${q.q4?.answer ?? (ch.quizFill ?? 'Redis')}"><p class="stem"><strong>4.</strong> （填空）${q.q4?.stem ?? 'CorpAssist 双栈会话状态常用________存储。'}</p>
  <p><input type="text" class="fill-input" autocomplete="off" /></p>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q4?.hint ?? '见 practice-01'}</p><p class="answer hidden"><strong>答案：</strong>${q.q4?.answer ?? 'Redis'}</p></article>
</section>`;
}

const OFFICIAL = [
  { label: 'Spring AI Chat Memory', url: 'https://docs.spring.io/spring-ai/reference/api/chat-memory.html' },
  { label: 'LangGraph Memory', url: 'https://langchain-ai.github.io/langgraph/concepts/memory/' },
];

const CHAPTERS = [
  {
    id: 'basics-01-context-anatomy',
    title: '上下文组成与窗口预算',
    phase: '上下文工程基础',
    minutes: 35,
    goal: '拆分 System/Tool/History 并设计 Token 预算',
    why: '爆窗根因常是<strong>预算未量化</strong>：RAG chunks、工具 JSON、多轮 history 争抢同一窗口。S2 客服改单约束被挤掉、S3 Agent 工具回传淹没 system——都要先建立 ${term('context-anatomy', 'context anatomy')} 与 ${term('token-budget', 'token budget')}。',
    outcomes: [
      '画出 CorpAssist 单次请求的 context 分层与占比',
      '为 S1/S2 场景写出 budget split 表',
      '说明 system 与 user 中检索块的分工（衔接 Prompt 课）',
      '定义 reserve 留给模型输出与 tool 往返',
    ],
    remember: [
      `<strong>分层</strong>：${term('system-tool-history', 'system / tool / history')} 各司其职；稳定规则不进可变 user 块。`,
      `<strong>预算</strong>：${term('window-budget', 'window budget')} 先定 max_tokens，再 ${term('budget-split', 'budget split')}。`,
      `<strong>模板</strong>：${term('corpassist-template', 'CorpAssist 模板')} 固定 system + 动态检索 + 滑动 history。`,
      `<strong>双栈</strong>：Python messages 与 Spring ChatClient 组装同一 ${term('context-layer', 'context layer')} 契约。`,
    ],
    sections: [
      {
        h: 'System/Tool/History',
        body: `${term('context-anatomy', 'context anatomy')} 描述一次 Chat 请求里各 ${term('context-layer', 'context layer')} 的职责。Agent 场景下 tool 回传往往比 user 问题更长，必须单独占预算。`,
        mermaid: {
          title: 'CorpAssist 上下文分层',
          body: `flowchart TB\n  SYS[system · 人设+边界+格式] --> CTX[LLM 窗口]\n  RET[retrieval · RAG chunks] --> CTX\n  HIST[history · 多轮] --> CTX\n  TOOL[tool · JSON 结果] --> CTX\n  RES[reserve · 输出+下轮 tool] --> CTX`,
          caption: 'S3 Agent 会在 assistant↔tool 间多轮；每层都应有 max token 上限。',
        },
        table: {
          headers: ['层', '典型内容', 'S2 客服', '常见误区'],
          rows: [
            ['system', '人设、改单规则、输出 schema', '不得 LLM 直接改库存', '把订单 JSON 写进 system 导致无法按会话变化'],
            ['retrieval', 'RAG chunks / 制度片段', 'FAQ + 工单政策', 'chunks 无上限挤占 history'],
            ['history', 'user/assistant 轮次', '意图+摘要', '无限 append 导致爆窗'],
            ['tool', '查单 API 结果', 'order_status JSON', '未截断的大 JSON 一次吃满窗口'],
          ],
        },
        microCheck: { q: '检索 chunks 应主要放在哪一层？', a: '通常作为 user 侧动态块（或专用 context 段），system 保持稳定的拒答与格式规则。' },
      },
      {
        h: 'Token 预算分配',
        body: `${term('token-budget', 'token budget')} 要在发版前写进配置，而不是上线后靠告警发现 OOM。${term('alloc-ratio', 'alloc ratio')} 可按场景微调：S1 偏 retrieval，S2 偏 history + 结构化 DST。`,
        scenario: 'CorpAssist S2：用户连问 5 次物流，检索 FAQ 占 40% 仍不够，history 被截断后模型「忘记」已确认不可退款。',
        code: {
          lang: 'yaml',
          title: 'context_budget 配置',
          body: `context_budget:\n  max_tokens: 32000\n  system: 0.12\n  retrieval: 0.38\n  history: 0.35\n  tool: 0.10\n  reserve: 0.05`,
        },
        compare: {
          bad: ['只有 max_tokens，无各层 cap', 'reserve=0 导致输出被截断', 'Python/Spring 两套比例不一致'],
          good: ['各层 hard cap + 软告警', 'reserve 预留 tool 往返', 'Git 管理 budget 版本并走评测'],
        },
      },
      {
        h: 'CorpAssist 模板',
        body: `${term('corpassist-template', 'CorpAssist 模板')} 把 budget 落到可复用的 Prompt 组装：system 管 ${term('boundary-zone', 'boundary')}，user 管本次检索与问题，history 走 ${term('turn-store', 'turn store')}。`,
        code: {
          lang: 'python',
          title: 'Python · 按预算组装 messages',
          body: `def build_messages(system, chunks, history, question, budget):\n    cap = budget["max_tokens"]\n    sys_t = min(count_tokens(system), int(cap * budget["system"]))\n    ret_t = trim_chunks(chunks, int(cap * budget["retrieval"]))\n    hist = trim_history(history, int(cap * budget["history"]))\n    return [\n        {"role": "system", "content": system[:sys_t]},\n        *hist,\n        {"role": "user", "content": f"<context>\\n{ret_t}\\n</context>\\n{question}"},\n    ]`,
        },
        faq: { q: '与《生产级 Prompt》课分工？', a: 'Prompt 课教 messages 组装与模板变量；本课教<strong>记忆分层与预算治理</strong>，二者通过 memory-bridge 衔接。' },
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '填写 budget-sheet.md，使各层占比之和为 100%，并说明 S2 为何 history 比例高于 S1。',
    practiceSteps: [
      '打开 <code>demos/basics-01-context-anatomy-lab/budget-sheet.md</code> 补全 system/retrieval/history/reserve',
      '对照正文 yaml，写一句 reserve 为何不能为 0',
      '画出四层 context 流向（可纸面或 Mermaid）',
      '说明 Python 与 Spring 如何共用同一 budget 配置文件',
    ],
    demoBox: '目录：<code>demos/basics-01-context-anatomy-lab/</code> — <strong>验收</strong>：budget 表四层齐全且合计 100%。',
    resources: ['<strong>下一章</strong>：<a href="#ch-basics-02-truncation">截断、摘要与滑动窗口</a>', '<a href="../production-prompt-engineering/index.html">生产级 Prompt 与对话工程</a>'],
    next: '下一章 <a href="#ch-basics-02-truncation">截断、摘要与滑动窗口</a>',
    quiz: {
      q1: { stem: 'CorpAssist 上下文预算首先要定义什么？', answer: 'A', opts: ['A) max_tokens 与各层 alloc ratio', 'B) 仅 GPU 数量', 'C) 前端主题色'], explain: '先量化再裁剪' },
      q2: { stem: '生产上下文治理应包含？', answer: 'A,C,D', hint: '见对比表' },
      q3: { stem: '（场景）tool JSON 一次占满窗口，优先改哪一层 cap？', answer: 'B', hint: 'tool 层' },
      q4: { stem: '各层占比配置常放在________文件（如 yaml）', answer: 'context_budget', hint: '见代码块' },
    },
  },
  {
    id: 'basics-02-truncation',
    title: '截断、摘要与滑动窗口',
    phase: '上下文工程基础',
    minutes: 40,
    goal: '对比截断策略并控制摘要质量风险',
    why: '预算定好后必须<strong>裁剪</strong>。${term('fifo-trim', 'FIFO 截断')} 简单但易丢约束；${term('rolling-summary', 'rolling summary')} 省 Token 却可能 ${term('lose-constraint', 'lose constraint')}。S2 改单规则消失是典型事故。',
    outcomes: [
      '对比 FIFO / 滑动窗口 / 摘要链',
      '为 S2 设计 trim policy 保留 DST 字段',
      '识别 summary 丢约束的 quality risk',
      '选择 rolling summary 触发阈值',
    ],
    remember: [
      `<strong>策略</strong>：${term('truncation-strategy', 'truncation strategy')} 没有银弹，按场景选。`,
      `<strong>摘要链</strong>：${term('summary-chain', 'summary chain')} 要锁关键槽位（订单号、不可退）。`,
      `<strong>滑动</strong>：${term('sliding-window', 'sliding window')} 保留最近 K 轮 + 早期摘要。`,
      `<strong>风险</strong>：${term('quality-risk', 'quality risk')} 需评测集回归，不是凭感觉。`,
    ],
    sections: [
      {
        h: '策略对比',
        body: `${term('trim-policy', 'trim policy')} 决定「删什么」。客服场景禁止删结构化 DST；Agent 场景可删早期 tool 细节但保留结论。`,
        table: {
          headers: ['策略', '优点', '风险', 'CorpAssist 适用'],
          rows: [
            [`${term('fifo-trim', 'FIFO trim')}`, '实现简单', '最早 system 约束可能被挤', '仅短会话 FAQ'],
            [`${term('sliding-window', 'sliding window')}`, '保留近期语境', '远期承诺丢失', 'S2 配合 DST'],
            [`${term('rolling-summary', 'rolling summary')}`, '大幅省 Token', '摘要幻觉/丢约束', '长会话 S2/S3'],
            ['摘要链', '分层压缩', '链路过长难 debug', 'S3 多步 Agent'],
          ],
        },
        compare: {
          bad: ['无 trim，依赖更大 context 模型', '摘要 prompt 无「禁止删字段」', '截断后不跑回归评测'],
          good: ['结构化 DST 永不摘要', '摘要模板列出 must_keep', 'badcase 进评测集'],
        },
      },
      {
        h: '摘要链',
        body: `${term('summary-chain', 'summary chain')}：每 N 轮用 LLM 压缩早期对话，输出写入 ${term('turn-store', 'turn store')} 的 summary 槽，原始 turn 可归档到冷存储。`,
        code: {
          lang: 'markdown',
          title: '摘要 prompt 片段（must_keep）',
          body: `## 摘要任务\n- 保留：order_id, refund_eligible, user_intent\n- 禁止：改写已确认的工单状态\n- 输出 ≤120 tokens`,
        },
        mermaid: {
          title: 'rolling summary 触发',
          body: `flowchart LR\n  T[turns>12] --> SUM[summary job]\n  SUM --> SLOT[session.summary]\n  SLOT --> PROMPT[assemble prompt]\n  RAW[raw turns] --> ARCH[冷存储]`,
        },
      },
      {
        h: '质量风险',
        body: `${term('quality-risk', 'quality risk')}：faithfulness 对摘要同样适用——摘要编造「已同意退款」比 raw 胡编更隐蔽。`,
        scenario: 'S2：摘要写「用户已确认收货」但原始对话仅询问物流；后续 tool 改单失败引发投诉。',
        microCheck: { q: '能否对 DST 字段做 rolling summary？', a: '不应。DST 应以结构化 JSON 存储，摘要只描述自然语言部分。' },
        list: [`评测：摘要前后 DST 字段 diff 必须为 0`, `人工 spot check 摘要链`, `${term('lose-constraint', 'lose constraint')} badcase 回流`],
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '完成 trim-compare.md：为 S2 选策略并写 must_keep 列表。',
    practiceSteps: [
      '编辑 <code>demos/basics-02-truncation-lab/trim-compare.md</code>',
      '写出 FIFO vs rolling summary 各 1 条风险',
      '设计 must_keep 字段 ≥3 个',
      '说明摘要触发条件（轮次或 token 阈值）',
    ],
    demoBox: '目录：<code>demos/basics-02-truncation-lab/</code> — <strong>验收</strong>：对比表 + must_keep 列表完整。',
    resources: ['<strong>下一章</strong>：<a href="#ch-basics-03-compression">上下文压缩入门</a>'],
    next: '下一章 <a href="#ch-basics-03-compression">上下文压缩入门</a>',
    judgmentStem: '团队选用 rolling summary 后 faithfulness 不变但「错误改单」投诉上升，说明什么？',
    judgmentAnswer: '摘要丢失改单约束或 DST 被污染；应结构化存储 DST、摘要 prompt 加 must_keep，并对摘要链跑 badcase 回归。',
    quiz: { q4: { stem: '长会话保留最近 K 轮的策略叫________窗口', answer: 'sliding', hint: 'sliding window' } },
  },
  {
    id: 'basics-03-compression',
    title: '上下文压缩入门',
    phase: '上下文工程基础',
    minutes: 35,
    goal: '掌握压缩触发时机与 LLM 摘要，对照 SAA',
    why: '截断是「删」，压缩是「浓缩」。${term('context-compress', 'context compress')} 在 ${term('token-threshold', 'token threshold')} 触发，可延迟爆窗；Spring AI Alibaba 提供 ${term('saa-compress', 'saa compress')} advisor 对照实现。',
    outcomes: ['定义 compress trigger 与 cooldown', '编写 summary prompt', '对比 Python 自研与 SAA compress', '评估 compress 对延迟的影响'],
    remember: [
      `<strong>时机</strong>：${term('compress-timing', 'compress timing')} 在 70–85% 窗口触发，避免临界失败。`,
      `<strong>摘要</strong>：${term('llm-summary', 'llm summary')} 用小模型降本。`,
      `<strong>对照</strong>：${term('compress-compare', 'compress compare')} 双栈输出 diff。`,
      `<strong>阈值</strong>：${term('compress-trigger', 'compress trigger')} 写进配置与 metrics。`,
    ],
    sections: [
      {
        h: '压缩时机',
        body: `${term('compress-timing', 'compress timing')} 应基于<strong>实测 token 计数</strong>，而非轮次数。`,
        code: {
          lang: 'yaml',
          body: `compress:\n  enabled: true\n  trigger_ratio: 0.80\n  cooldown_turns: 2\n  model: qwen-turbo`,
        },
        table: {
          headers: ['信号', '动作', '告警'],
          rows: [
            ['used/max > 0.80', '异步 summary job', 'metric: compress_started'],
            ['used/max > 0.92', '同步 block + 强制 trim', 'page on-call'],
            ['summary 失败', 'fallback FIFO + 拒答', 'incident'],
          ],
        },
      },
      {
        h: 'LLM 摘要',
        body: `${term('summary-prompt', 'summary prompt')} 与 ${term('llm-summary', 'llm summary')} 模型选择：压缩任务可用更小模型，但 must_keep 规则与主对话一致。`,
        code: {
          lang: 'python',
          body: `async def maybe_compress(session, budget):\n    if session.token_used / budget["max_tokens"] < budget["compress_trigger"]:\n        return\n    summary = await llm_summarize(session.turns, MUST_KEEP)\n    session.compressed = summary\n    session.turns = session.turns[-4:]`,
        },
      },
      {
        h: '对照 SAA 压缩',
        body: `${term('saa-compress', 'saa compress')}：Spring AI Alibaba MessageChatMemoryAdvisor 可在 Java 侧声明式压缩；Python 侧用等价 hook，保证 ${term('dual-session', 'dual session')} 读到同一 summary 版本。`,
        compare: {
          bad: ['仅 Java 压缩，Python 仍全量 history', '压缩后无 version 字段', '无 compress-compare 报告'],
          good: ['mem_summary_version 双栈同步', 'CI 对比压缩前后 DST', 'Micrometer 记录 compress latency'],
        },
        faq: { q: '压缩 vs 截断？', a: '截断直接丢弃；压缩保留语义但引入摘要风险。生产通常<strong>组合</strong>：先 compress，仍超限再 trim。' },
      },
    ],
    officialLinks: [...OFFICIAL, { label: 'Spring AI Alibaba — Memory Advisor', url: 'https://java2ai.com/docs/dev/tutorials/starters-and-quick-guide/' }],
    practiceIntro: '编辑 compress-trigger.md，定义 trigger_ratio 与 fallback。',
    practiceSteps: [
      '打开 <code>demos/basics-03-compression-lab/compress-trigger.md</code>',
      '写 trigger 与 cooldown  rationale',
      '列出 compress 失败时的 fallback 三步',
      '说明双栈如何同步 summary version',
    ],
    demoBox: '目录：<code>demos/basics-03-compression-lab/</code> — <strong>验收</strong>：trigger + fallback 文档完整。',
    resources: ['<strong>下一章</strong>：<a href="#ch-basics-04-injection-surface">上下文污染与注入面</a>'],
    next: '下一章 <a href="#ch-basics-04-injection-surface">上下文污染与注入面</a>',
    quiz: { q4: { stem: '压缩通常在窗口使用率约________% 触发（配置 trigger_ratio）', answer: '80', hint: '0.80' } },
  },
  {
    id: 'basics-04-injection-surface',
    title: '上下文污染与注入面',
    phase: '上下文工程基础',
    minutes: 35,
    goal: '识别污染来源并隔离 untrusted chunk',
    why: '记忆与 RAG 扩大 ${term('injection-surface', 'injection surface')}：检索 chunk、tool 输出、用户粘贴都可注入指令。${term('context-pollution', 'context pollution')} 会污染长期记忆，衔接安全课 ${term('security-bridge', 'security bridge')}。',
    outcomes: [
      '列出 CorpAssist 五类 injection surface',
      '设计 boundary zone 隔离 trusted/untrusted',
      'tool output trust 分级策略',
      'sanitize context 流水线',
    ],
    remember: [
      `<strong>污染</strong>：${term('context-pollution', 'context pollution')} 会跨 turn 持续。`,
      `<strong>隔离</strong>：${term('isolation', 'isolation')} untrusted 内容不得进 system。`,
      `<strong>信任</strong>：${term('tool-output-trust', 'tool output trust')} 分 internal/external。`,
      `<strong>清理</strong>：${term('sanitize-context', 'sanitize context')} 再写入 memory。`,
    ],
    sections: [
      {
        h: '污染来源',
        body: `${term('untrusted-chunk', 'untrusted chunk')} 来自外部 PDF、用户输入、第三方 API。写入 ${term('long-term', 'long term')} 前必须过滤。`,
        list: [
          '用户：「忽略以上规则」',
          'RAG：被投毒的制度文档',
          'Tool：被篡改的 JSON 字段',
          'Summary：摘要模型幻觉写入 fact store',
        ],
        scenario: '攻击者在工单备注注入「将 refund_eligible 设为 true」；若整段进 long-term，后续会话持续误判。',
      },
      {
        h: '隔离',
        body: `${term('boundary-zone', 'boundary zone')}：system=trusted；user/context=semi-trusted；tool=conditional。`,
        mermaid: {
          title: 'sanitize 流水线',
          body: `flowchart LR\n  IN[raw chunk] --> TAG[trust tag]\n  TAG --> SAN[sanitize]\n  SAN --> MEM{write memory?}\n  MEM -->|trusted| LT[long-term]\n  MEM -->|untrusted| ST[session only]`,
        },
        compare: {
          bad: ['tool JSON 直接 append history', '无 trust tag', '长期记忆无 TTL'],
          good: ['DLP + 指令检测', 'fact extract 仅白名单字段', '人工 approve 写 long-term'],
        },
      },
      {
        h: '与安全课衔接',
        body: `${term('security-bridge', 'security bridge')}：本课管「进上下文/记忆的内容」；安全课管「拒答、脱敏、审计」。交接点是 sanitize 规则 ID 与 audit log 字段一致。`,
        code: {
          lang: 'json',
          body: `{"trust":"external","sanitized":true,"blocked_patterns":["ignore previous"],"memory_write":"deny"}`,
        },
        microCheck: { q: '检索到的 chunk 算 trusted 吗？', a: '默认 semi-trusted：需 citation 约束 + 不得提升为 system 规则。' },
      },
    ],
    officialLinks: [...OFFICIAL, { label: 'OWASP LLM Top 10', url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/' }],
    practiceIntro: '完成 surface-list.md：五类 injection surface 与对策。',
    practiceSteps: [
      '编辑 <code>demos/basics-04-injection-surface-lab/surface-list.md</code>',
      '每类 surface 写 1 条 sanitize 规则',
      '说明 untrusted chunk 为何不能进 long-term',
      '列出与安全课共享的 audit 字段',
    ],
    demoBox: '目录：<code>demos/basics-04-injection-surface-lab/</code> — <strong>验收</strong>：≥5 类 surface + 对策。',
    resources: ['<strong>下一阶段</strong>：<a href="#ch-practice-01-short-term">工作记忆与会话状态</a>', '<a href="../security-compliance-engineering/index.html">安全与合规工程</a>'],
    next: '进入 practice：<a href="#ch-practice-01-short-term">工作记忆与会话状态</a>',
    quiz: { q4: { stem: '不可信检索块英文常称 untrusted________', answer: 'chunk', hint: 'untrusted chunk' } },
  },
];

// Append remaining chapters via second array merge in same file
CHAPTERS.push(
  {
    id: 'practice-01-short-term',
    title: '工作记忆与会话状态',
    phase: '混合记忆实现',
    minutes: 45,
    goal: '双栈实现 short-term / working memory 与 Redis session',
    why: `${term('working-memory', 'working memory')} 保存当前 plan 与槽位；${term('short-term', 'short term')} 会话进 ${term('redis-session', 'redis session')}。${term('spring-chatmemory', 'Spring ChatMemory')} 与 ${term('langchain-memory', 'langchain memory')} 必须 ${term('session-key', 'session key')} 一致。`,
    outcomes: ['设计 Redis key schema', '实现 Spring MessageWindowChatMemory', 'Python LangGraph checkpointer 对照', '避免 dual session 冲突'],
    remember: [
      `<strong>键</strong>：${term('session-key', 'session key')} = tenant:user:conversation`,
      `<strong>存储</strong>：${term('turn-store', 'turn store')} JSON + TTL`,
      `<strong>双栈</strong>：${term('dual-session', 'dual session')} 同 id 读写`,
      `<strong>工作记忆</strong>：${term('working-memory', 'working memory')} 不进 Redis 全量 history`,
    ],
    sections: [
      {
        h: 'LangChain Memory',
        body: `Python 侧 ${term('langchain-memory', 'langchain memory')} / LangGraph checkpoint 存 thread state；BFF 只传 conversation_id。`,
        code: {
          lang: 'python',
          body: `SESSION_KEY = "corp:{tenant}:{user}:{conv}"\n\ndef load_turns(r, key):\n    raw = r.get(key)\n    return json.loads(raw) if raw else []`,
        },
      },
      {
        h: 'Spring ChatMemory',
        body: `${term('spring-chatmemory', 'spring chatmemory')}：MessageWindowChatMemory + RedisChatMemoryRepository。`,
        code: {
          lang: 'java',
          body: `@Bean\nChatMemory chatMemory(RedisChatMemoryRepository repo) {\n  return MessageWindowChatMemory.builder()\n    .chatMemoryRepository(repo)\n    .maxMessages(40)\n    .build();\n}`,
        },
      },
      {
        h: 'Redis',
        body: `${term('redis-session', 'redis session')} TTL 对齐 SLA：ToC 24h，ToB 可 7d；键前缀防跨租户。`,
        table: {
          headers: ['字段', '说明'],
          rows: [['turns[]', '最近 N 轮'], ['summary', 'rolling 摘要'], ['dst', '结构化状态'], ['mem_version', '压缩版本']],
        },
        compare: {
          bad: ['Python 用 conv-uuid，Spring 用 userId 拼接', '无 TTL 键堆积', 'DST 只存 natural language'],
          good: ['OpenAPI 定义 session_id', '双栈集成测试同一 key', 'DST JSON schema 校验'],
        },
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '完成 session-key.md：写出 key 格式与 TTL。',
    practiceSteps: ['编辑 demos/practice-01-short-term-lab/session-key.md', '写 key 三段式含义', '列 Redis hash 字段', '说明 Spring/Python 谁创建 session_id'],
    demoBox: '目录：<code>demos/practice-01-short-term-lab/</code> — <strong>验收</strong>：key 格式 + ≥3 字段。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-02-long-term">长期记忆与向量记忆</a>'],
    next: '下一章 <a href="#ch-practice-02-long-term">长期记忆与向量记忆</a>',
    quizFill: 'Redis',
  },
  {
    id: 'practice-02-long-term',
    title: '长期记忆与向量记忆',
    phase: '混合记忆实现',
    minutes: 45,
    goal: '用户画像、fact store 与过期策略',
    why: `${term('long-term', 'long term')} 支撑千人千面；${term('vector-memory', 'vector memory')} 召回相关 fact。必须有 ${term('expiry-policy', 'expiry policy')} 与 ${term('gdpr-delete', 'gdpr delete')}。`,
    outcomes: ['设计 fact store schema', 'fact extract 白名单', 'mem TTL 分层', '向量记忆与 ACL'],
    remember: [
      `<strong>画像</strong>：${term('user-profile-mem', 'user profile mem')} 少而精`,
      `<strong>事实</strong>：${term('fact-store', 'fact store')} 带来源与时间`,
      `<strong>抽取</strong>：${term('fact-extract', 'fact extract')} 禁止自由文本入库',
      `<strong>TTL</strong>：${term('mem-ttl', 'mem ttl')} 默认 90d 可续期`,
    ],
    sections: [
      {
        h: '用户画像',
        body: `${term('user-profile-mem', 'user profile mem')}：偏好语言、渠道、会员等级——字段固定，不用 LLM 自由发挥。`,
        code: {
          lang: 'json',
          body: `{"user_id":"u1","locale":"zh-CN","tier":"gold","updated_at":"2026-05-01T00:00:00Z"}`,
        },
      },
      {
        h: '事实库',
        body: `${term('fact-store', 'fact store')} + ${term('fact-extract', 'fact extract')}：从对话抽「默认地址=上海」需 confidence + source_turn。`,
        mermaid: {
          title: 'fact 写入路径',
          body: `flowchart LR\n  TURN[dialog turn] --> EXT[extract]\n  EXT --> REV{human approve?}\n  REV -->|yes| DB[(fact store)]\n  REV -->|no| DROP[discard]`,
        },
      },
      {
        h: '过期策略',
        body: `${term('expiry-policy', 'expiry policy')}：营销偏好 30d，地址 180d；${term('gdpr-delete', 'gdpr delete')} 级联向量索引。`,
        list: ['TTL 到期自动归档', '用户「忘记我」硬删', 're-embed 后旧 vector 失效'],
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '编辑 fact-schema.md 定义 3 个 fact 类型。',
    practiceSteps: ['打开 demos/practice-02-long-term-lab/fact-schema.md', '写 TTL 列', '说明 fact extract 白名单', '向量删除与 GDPR 关系'],
    demoBox: '目录：<code>demos/practice-02-long-term-lab/</code> — <strong>验收</strong>：schema ≥3 类型 + TTL。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-03-hybrid-design">混合记忆架构</a>'],
    next: '下一章 <a href="#ch-practice-03-hybrid-design">混合记忆架构</a>',
    quiz: { q4: { stem: '用户要求删除个人记忆，合规流程简称 GDPR________', answer: 'delete', hint: 'gdpr delete' } },
  },
  {
    id: 'practice-03-hybrid-design',
    title: '混合记忆架构',
    phase: '混合记忆实现',
    minutes: 50,
    goal: '三层记忆模型与读写路径一致性',
    why: `${term('three-layer-mem', 'three layer mem')}：working + session + long。${term('mem-router', 'mem router')} 决定读写路径；${term('write-through', 'write through')} 与 ${term('sync-policy', 'sync policy')} 保证 ${term('consistency', 'consistency')}。`,
    outcomes: ['画 hybrid arch 图', '定义 read write path', 'mem router 规则', '双栈 sync policy'],
    remember: [
      `<strong>三层</strong>：${term('working-session-long', 'working / session / long')}`,
      `<strong>路由</strong>：${term('mem-router', 'mem router')} 按 intent 分流`,
      `<strong>一致</strong>：${term('sync-policy', 'sync policy')} 版本号`,
      `<strong>架构</strong>：${term('hybrid-arch', 'hybrid arch')} 文档化`,
    ],
    sections: [
      {
        h: '三层记忆模型',
        body: `${term('hybrid-arch', 'hybrid arch')} 是 CorpAssist 记忆子系统核心视图。`,
        mermaid: {
          title: '三层混合记忆',
          body: `flowchart TB\n  WM[Working · 当前 plan/slots] --> MR[mem router]\n  SM[Session · Redis turns+summary] --> MR\n  LM[Long · fact store + vector] --> MR\n  MR --> ASM[Prompt assembler]`,
        },
      },
      {
        h: '读写路径',
        body: `${term('read-write-path', 'read write path')}：读时并行拉 session.summary + top-k facts；写时 session 同步，long-term 异步 + 审批。`,
        table: {
          headers: ['操作', '路径', '延迟'],
          rows: [['读 session', 'Redis GET', '<5ms'], ['读 long', 'vector+DB', '20-80ms'], ['写 long', 'queue+approve', 'async']],
        },
      },
      {
        h: '一致性',
        body: `${term('consistency', 'consistency')}：${term('write-through', 'write through')} session.dst 后立刻可见；long-term 最终一致。`,
        code: {
          lang: 'yaml',
          body: `sync_policy:\n  session: write_through\n  long_term: async\n  version_field: mem_version`,
        },
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '完成 layer-table.md。',
    practiceSteps: ['编辑 demos/practice-03-hybrid-design-lab/layer-table.md', '三层各写职责', '读路径时序', '写 long-term 审批点'],
    demoBox: '目录：<code>demos/practice-03-hybrid-design-lab/</code> — <strong>验收</strong>：三层表 + 读写说明。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-04-human-loop">人在回路与记忆编辑</a>'],
    next: '下一章 <a href="#ch-practice-04-human-loop">人在回路与记忆编辑</a>',
    quiz: { q4: { stem: '工作/会话/长期三层模型英文 three layer________', answer: 'mem', hint: 'three layer mem' } },
  },
  {
    id: 'practice-04-human-loop',
    title: '人在回路与记忆编辑',
    phase: '混合记忆实现',
    minutes: 40,
    goal: '审批、纠正与 audit trail',
    why: `${term('human-loop', 'human loop')}：${term('approve-write', 'approve write')} 进 long-term；${term('correct-fact', 'correct fact')} 与 ${term('override', 'override')} 需 ${term('audit-trail-mem', 'audit trail mem')}。`,
    outcomes: ['设计 approve 工作流', 'memory edit API', 'mem changelog', 'human approval SLA'],
    remember: [
      `<strong>审批</strong>：${term('human-approval', 'human approval')} P1 事实 4h 内`,
      `<strong>编辑</strong>：${term('memory-edit', 'memory edit')} 版本化`,
      `<strong>审计</strong>：${term('mem-changelog', 'mem changelog')}`,
      `<strong>纠正</strong>：${term('correct-fact', 'correct fact')} 不删历史，追加新版本`,
    ],
    sections: [
      {
        h: '审批',
        body: `${term('human-approval', 'human approval')} 队列：高风险 fact（退款资格、合同金额）必须人审。`,
        code: {
          lang: 'json',
          body: `{"fact_id":"f9","status":"pending","proposed_by":"extract-v2","reviewer":null}`,
        },
      },
      {
        h: '纠正',
        body: `${term('correct-fact', 'correct fact')}：客服修正「默认地址」→ 新版本 supersedes，旧版 marked invalid。`,
        compare: {
          bad: ['直接 DELETE 无审计', 'LLM 自动改 long-term'],
          good: ['changelog + actor', 'override 需 ticket_id'],
        },
      },
      {
        h: '审计',
        body: `${term('audit-trail-mem', 'audit trail mem')} 字段：who/when/old/new/reason，对接合规课。`,
        scenario: '监管抽查：需证明某用户偏好何时写入、谁批准。',
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '阅读 audit-log.md 并补全 changelog 字段。',
    practiceSteps: ['打开 demos/practice-04-human-loop-lab/audit-log.md', '列 ≥5 audit 字段', '写 approve SLA', '说明 override 场景'],
    demoBox: '目录：<code>demos/practice-04-human-loop-lab/</code> — <strong>验收</strong>：audit 字段齐全。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-05-corpassist-memory">实战：CorpAssist 记忆子系统</a>'],
    next: '下一章 <a href="#ch-practice-05-corpassist-memory">实战：CorpAssist 记忆子系统</a>',
    quiz: { q4: { stem: '人工审批写入长期记忆简称 approve________', answer: 'write', hint: 'approve write' } },
  },
  {
    id: 'practice-05-corpassist-memory',
    title: '实战：CorpAssist 记忆子系统',
    phase: '混合记忆实现',
    minutes: 60,
    goal: '端到端记忆 API、评测与双栈对照',
    why: `${term('corpassist-mem', 'corpassist mem')} 整合 ${term('e2e-memory', 'e2e memory')}：${term('mem-api', 'mem api')} + ${term('mem-eval', 'mem eval')} + ${term('dual-compare-mem', 'dual compare mem')}。`,
    outcomes: ['定义 mem API OpenAPI', 'eval session 指标', 'handover 文档', 'integration mem 清单'],
    remember: [
      `<strong>API</strong>：${term('mem-api', 'mem api')} CRUD + search`,
      `<strong>评测</strong>：${term('eval-session', 'eval session')} 多轮 recall`,
      `<strong>对照</strong>：${term('dual-compare-mem', 'dual compare mem')}`,
      `<strong>交付</strong>：${term('handover-mem', 'handover mem')} 给 RAG/Agent 课`,
    ],
    sections: [
      {
        h: '端到端',
        body: `${term('integration-mem', 'integration mem')}：Gateway → Memory Service → Redis/Vector/DB。`,
        mermaid: {
          title: 'CorpAssist 记忆子系统',
          body: `flowchart LR\n  GW[API Gateway] --> MS[Memory Service]\n  MS --> R[Redis session]\n  MS --> V[Vector facts]\n  MS --> PG[(PostgreSQL audit)]`,
        },
        code: {
          lang: 'yaml',
          title: 'mem-api 片段',
          body: `paths:\n  /v1/sessions/{id}/turns:\n    post:\n      summary: append turn\n  /v1/users/{id}/facts:\n    get:\n      summary: search long-term facts`,
        },
      },
      {
        h: '评测',
        body: `${term('mem-eval', 'mem eval')}：10 轮对话后提问「第 3 轮说的订单号」→ session recall 率。`,
        list: ['session recall@k', 'summary fidelity', 'DST 字段保持率', 'compress 后 recall 下降 ≤5%'],
      },
      {
        h: '双栈对照',
        body: `${term('dual-compare-mem', 'dual compare mem')}：同一 session_id 调 Python 与 Spring，diff turns hash。`,
        compare: {
          bad: ['只测单栈', '无 mem_version'],
          good: ['parity CI job', '不一致自动 block'],
        },
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '完成 mem-checklist.md 端到端验收。',
    practiceSteps: ['打开 demos/practice-05-corpassist-memory-lab/mem-checklist.md', '勾 API 项', '写 eval 用例 2 条', '双栈 parity 说明'],
    demoBox: '目录：<code>demos/practice-05-corpassist-memory-lab/</code> — <strong>验收</strong>：checklist 全勾。',
    resources: ['<strong>下一阶段</strong>：<a href="#ch-advanced-01-saa-context">Spring AI Alibaba 上下文工程</a>'],
    next: '进入 advanced：<a href="#ch-advanced-01-saa-context">Spring AI Alibaba 上下文工程</a>',
    quiz: { q4: { stem: '记忆服务对外 REST 简称 mem________', answer: 'api', hint: 'mem api' } },
  },
  {
    id: 'advanced-01-saa-context',
    title: 'Spring AI Alibaba 上下文工程',
    phase: '生产级上下文',
    minutes: 45,
    goal: 'SAA 压缩/编辑、context limit 与 graph state',
    why: `${term('saa-context', 'saa context')} 提供 ${term('saa-compress-edit', 'saa compress edit')}；${term('graph-state', 'graph state')} 与 ${term('state-reducer', 'state reducer')} 管理 Agent 上下文。`,
    outcomes: ['配置 saa advisor', 'edit memory 流程', 'graph checkpoint 对照', 'context limit 排障'],
    remember: [
      `<strong>SAA</strong>：${term('saa-advisor', 'saa advisor')} 声明式压缩`,
      `<strong>编辑</strong>：${term('edit-memory', 'edit memory')} 人工修正`,
      `<strong>状态</strong>：${term('graph-state', 'graph state')} reducer 合并`,
      `<strong>限制</strong>：${term('context-limit', 'context limit')} 硬顶`,
    ],
    sections: [
      {
        h: '压缩/编辑',
        body: `${term('saa-compress-edit', 'saa compress edit')}：MessageChatMemoryAdvisor 触发压缩；${term('edit-memory', 'edit memory')} API 供运营修正。`,
        code: {
          lang: 'java',
          body: `ChatClient.builder(chatModel)\n  .defaultAdvisors(new MessageChatMemoryAdvisor(chatMemory))\n  .build();`,
        },
      },
      {
        h: '限制',
        body: `${term('context-limit', 'context limit')}：模型 max + advisor 预压缩；超限时抛 ContextOverflowException 并 metrics。`,
        compare: {
          bad: ['静默截断无日志', 'advisor 顺序错误'],
          good: ['limit 配置化', 'overflow 转拒答话术'],
        },
      },
      {
        h: 'Graph 状态',
        body: `${term('graph-checkpoint', 'graph checkpoint')} + ${term('state-reducer', 'state reducer')}：多节点写入 messages 列表时 reducer 定义合并规则。`,
        mermaid: {
          title: 'Graph state 合并',
          body: `flowchart LR\n  N1[node A] --> ST[state.messages]\n  N2[node B] --> ST\n  ST --> RED[state reducer append]`,
        },
      },
    ],
    officialLinks: [...OFFICIAL, { label: 'Spring AI Alibaba Graph', url: 'https://java2ai.com/docs/dev/tutorials/graph/' }],
    practiceIntro: '阅读 saa-notes.md 列出 2 个 advisor 注意点。',
    practiceSteps: ['打开 demos/advanced-01-saa-context-lab/saa-notes.md', '写 compress 触发', 'state reducer 举例', 'context limit 告警'],
    demoBox: '目录：<code>demos/advanced-01-saa-context-lab/</code> — <strong>验收</strong>：notes ≥2 advisor 点。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-02-agent-memory">Agent 场景记忆</a>'],
    next: '下一章 <a href="#ch-advanced-02-agent-memory">Agent 场景记忆</a>',
    quiz: { q4: { stem: 'Graph 节点状态合并组件 state________', answer: 'reducer', hint: 'state reducer' } },
  },
  {
    id: 'advanced-02-agent-memory',
    title: 'Agent 场景记忆',
    phase: '生产级上下文',
    minutes: 45,
    goal: 'LangGraph checkpoint 与 multi agent share',
    why: `S3 Agent 依赖 ${term('langgraph-checkpoint', 'langgraph checkpoint')}；${term('multi-agent-share', 'multi agent share')} 用 ${term('shared-blackboard', 'shared blackboard')}；${term('thread-state', 'thread state')} 与 ${term('mem-scope', 'mem scope')} 防污染。`,
    outcomes: ['配置 checkpoint store', 'resume agent 流程', 'agent memory 分层', '多 Agent 写隔离'],
    remember: [
      `<strong>检查点</strong>：${term('checkpoint-store', 'checkpoint store')}`,
      `<strong>恢复</strong>：${term('resume-agent', 'resume agent')}`,
      `<strong>共享</strong>：${term('shared-blackboard', 'shared blackboard')} 只读/读写分离`,
      `<strong>范围</strong>：${term('mem-scope', 'mem scope')} thread vs user`,
    ],
    sections: [
      {
        h: 'LangGraph checkpoint',
        body: `${term('agent-memory', 'agent memory')}：checkpoint 存 ${term('thread-state', 'thread state')}，含 messages + plan + tool results。`,
        code: {
          lang: 'python',
          body: `from langgraph.checkpoint.redis import RedisSaver\n\ncheckpointer = RedisSaver.from_conn_string(REDIS_URL)\ngraph = builder.compile(checkpointer=checkpointer)`,
        },
      },
      {
        h: '多 Agent 共享',
        body: `${term('multi-agent-share', 'multi agent share')}：Planner 写 plan 到 blackboard；Executor 只读 plan + 写 tool result。`,
        mermaid: {
          title: 'Multi-agent memory scope',
          body: `flowchart TB\n  P[Planner] --> BB[shared blackboard]\n  E[Executor] --> BB\n  BB --> CP[checkpoint per thread]`,
        },
      },
      {
        h: '步数预算',
        body: 'Agent 记忆无限堆积导致检索干扰——步数上限 + 每步 compress tool output。',
        faq: { q: 'checkpoint 与 session 区别？', a: 'session 面向用户对话；checkpoint 面向 Agent 图状态与恢复。' },
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '编辑 checkpoint-config.md。',
    practiceSteps: ['打开 demos/advanced-02-agent-memory-lab/checkpoint-config.md', '写 Redis checkpoint 配置', 'blackboard 字段', 'mem scope 表'],
    demoBox: '目录：<code>demos/advanced-02-agent-memory-lab/</code> — <strong>验收</strong>：config + scope 表。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-03-cost-latency">记忆的成本与延迟</a>'],
    next: '下一章 <a href="#ch-advanced-03-cost-latency">记忆的成本与延迟</a>',
    quiz: { q4: { stem: 'LangGraph 持久化状态组件 checkpoint________', answer: 'store', hint: 'checkpoint store' } },
  },
  {
    id: 'advanced-03-cost-latency',
    title: '记忆的成本与延迟',
    phase: '生产级上下文',
    minutes: 40,
    goal: '读写放大、缓存与 NS3 权衡',
    why: `${term('read-write-amp', 'read write amp')}：每轮读 long-term + 写 session；${term('mem-cache', 'mem cache')} 与 ${term('lazy-load-mem', 'lazy load mem')} 支撑 ${term('ns3-trade', 'ns3 trade')}。`,
    outcomes: ['估算 token cost mem', 'recall budget', 'cache hit 策略', 'P95 分解'],
    remember: [
      `<strong>放大</strong>：${term('read-write-amp', 'read write amp')}`,
      `<strong>缓存</strong>：${term('cache-hit', 'cache hit')} session 热 key`,
      `<strong>懒加载</strong>：${term('lazy-load-mem', 'lazy load mem')}`,
      `<strong>成本</strong>：${term('token-cost-mem', 'token cost mem')}`,
    ],
    sections: [
      {
        h: '读写放大',
        body: `${term('cost-latency-mem', 'cost latency mem')}：一次回复 = 读 Redis + 向量检索 + 组装 prompt + 可能 compress LLM 调用。`,
        table: {
          headers: ['环节', '典型耗时', '优化'],
          rows: [['Redis GET', '1-3ms', 'pipeline'], ['vector top-k', '20-60ms', 'cache facts'], ['compress LLM', '200-800ms', '异步+小模型']],
        },
      },
      {
        h: '缓存',
        body: `${term('mem-cache', 'mem cache')}：session 摘要 cache 5min；fact 向量 cache 按 user_id。`,
        code: {
          lang: 'yaml',
          body: `cache:\n  session_summary_ttl: 300\n  fact_embedding_lru: 1000`,
        },
      },
      {
        h: 'NS3 权衡',
        body: `${term('recall-budget', 'recall budget')}：ToC 高 QPS 降低 long-term top-k；复杂问句才 lazy-load 全量 facts。${term('ns3-trade', 'ns3 trade')} 文档化。`,
        compare: {
          bad: ['每轮全量 vector 检索', '同步 compress 阻塞 TTFT'],
          good: ['intent 路由 recall 深度', 'compress 异步'],
        },
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '填写 latency-budget.md。',
    practiceSteps: ['编辑 demos/advanced-03-cost-latency-lab/latency-budget.md', 'P95 分解', '写 cache 策略', 'NS3 权衡 1 例'],
    demoBox: '目录：<code>demos/advanced-03-cost-latency-lab/</code> — <strong>验收</strong>：budget 表完整。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-04-interview">面试：上下文爆窗排障</a>'],
    next: '下一章 <a href="#ch-advanced-04-interview">面试：上下文爆窗排障</a>',
    quiz: { q4: { stem: '记忆链路 P95 与成本权衡对应北极星 NS________', answer: '3', hint: 'NS3' } },
  },
  {
    id: 'advanced-04-interview',
    title: '面试：上下文爆窗排障',
    phase: '生产级上下文',
    minutes: 40,
    goal: 'window overflow 案例与 debug checklist',
    why: `面试高频：${term('window-overflow', 'window overflow')}、${term('token-spike', 'token spike')}、${term('summary-bug', 'summary bug')}。用 ${term('debug-checklist', 'debug checklist')} 与 ${term('answer-template-mem', 'answer template mem')} 结构化答辩。`,
    outcomes: ['讲清 overflow case', 'trim debug 顺序', 'interview context 叙事', '避免只答「换大模型」'],
    remember: [
      `<strong>爆窗</strong>：${term('window-overflow', 'window overflow')}`,
      `<strong>尖刺</strong>：${term('token-spike', 'token spike')} 常因 tool JSON`,
      `<strong>调试</strong>：${term('trim-debug', 'trim debug')}`,
      `<strong>清单</strong>：${term('debug-checklist', 'debug checklist')}`,
    ],
    interview: [
      '用 3 分钟说明 S2 多轮爆窗排障顺序',
      '摘要丢约束与检索无关时如何区分',
      '双栈 session 不一致如何定位',
    ],
    sections: [
      {
        h: '案例',
        body: `${term('overflow-case', 'overflow case')}：P95 从 2s→8s，log 显示 prompt tokens 从 8k→28k。`,
        list: ['Step1: 分层 token 计数', 'Step2: 查 tool 回传大小', 'Step3: 查 compress 是否失败', 'Step4: 查 history trim 策略'],
      },
      {
        h: '清单',
        body: `${term('debug-checklist', 'debug checklist')}：budget 配置 → session 长度 → RAG topK → tool truncate → summary fidelity。`,
        code: {
          lang: 'markdown',
          body: `## 爆窗排障\n1. used/max per layer\n2. last 3 turns byte size\n3. compress job status\n4. DST hash unchanged?`,
        },
      },
      {
        h: '答题模板',
        body: `${term('interview-context', 'interview context')}：现象→分层计数→根因→修复→回归指标。${term('answer-template-mem', 'answer template mem')} 避免跳步。',
        compare: {
          bad: ['「加 128k 上下文模型」', '无 metrics 凭感觉'],
          good: ['budget + trim + 评测', 'before/after token 曲线'],
        },
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '完成 debug-steps.md 并口述 2 分钟。',
    practiceSteps: ['打开 demos/advanced-04-interview-lab/debug-steps.md', '写 5 步排障', '虚构 token 曲线描述', '录音 2 分钟（可选）'],
    demoBox: '目录：<code>demos/advanced-04-interview-lab/</code> — <strong>验收</strong>：5 步清单。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-05-capstone">与 RAG/Agent 课集成验收</a>'],
    next: '下一章 <a href="#ch-advanced-05-capstone">与 RAG/Agent 课集成验收</a>',
    quiz: { q4: { stem: '爆窗现象英文 window________', answer: 'overflow', hint: 'window overflow' } },
  },
  {
    id: 'advanced-05-capstone',
    title: '与 RAG/Agent 课集成验收',
    phase: '生产级上下文',
    minutes: 50,
    goal: 'mem API contract 与 cross course 指标绑定',
    why: `${term('capstone-mem', 'capstone mem')}：${term('mem-api-contract', 'mem api contract')} 连接 ${term('integration-rag', 'integration rag')} 与 ${term('integration-agent', 'integration agent')}；${term('handoff-api', 'handoff api')} 交付下游课。`,
    outcomes: ['OpenAPI mem contract', 'acceptance mem 指标', 'metric bind', 'cross course 文档'],
    remember: [
      `<strong>契约</strong>：${term('mem-api-contract', 'mem api contract')}`,
      `<strong>RAG</strong>：${term('integration-rag', 'integration rag')} 检索块占 budget`,
      `<strong>Agent</strong>：${term('integration-agent', 'integration agent')} checkpoint 对齐',
      `<strong>验收</strong>：${term('acceptance-mem', 'acceptance mem')}`,
    ],
    sections: [
      {
        h: '接口',
        body: `${term('handoff-api', 'handoff api')}：RAG 课消费 <code>GET /facts/search</code>；Agent 课消费 checkpoint thread_id 映射。`,
        code: {
          lang: 'yaml',
          body: `MemServiceContract:\n  version: v1\n  endpoints:\n    - GET /v1/sessions/{id}\n    - POST /v1/sessions/{id}/compress\n  sla:\n    p95_read_ms: 50`,
        },
      },
      {
        h: '指标',
        body: `${term('metric-bind', 'metric bind')}：session recall、DST 保持率、compress 失败率绑定 NS2/NS3 看板。`,
        mermaid: {
          title: 'Cross course 集成',
          body: `flowchart LR\n  MEM[Memory Service] --> RAG[RAG 课]\n  MEM --> AG[Agent 课]\n  MEM --> EV[Eval 课]`,
        },
      },
      {
        h: '验收',
        body: `${term('cross-course', 'cross course')} checklist：双栈 parity ✓、budget 配置 ✓、audit ✓、badcase 回流 ✓。`,
        list: ['integration-checklist.md 全勾', '演示 5 分钟 mem 子系统', '交接 RAG/Agent 负责人签字'],
      },
    ],
    officialLinks: OFFICIAL,
    practiceIntro: '完成 integration-checklist.md。',
    practiceSteps: ['打开 demos/advanced-05-capstone-lab/integration-checklist.md', '勾验收项', '写 handoff 段落', '列 metric bind 3 项'],
    demoBox: '目录：<code>demos/advanced-05-capstone-lab/</code> — <strong>验收</strong>：checklist 完成。',
    resources: ['<strong>回顾</strong>：<a href="#ch-basics-01-context-anatomy">上下文组成</a> · <a href="#ch-practice-05-corpassist-memory">CorpAssist 记忆</a>', '<a href="../rag-system-engineering/index.html">RAG 系统架构</a>'],
    next: '回顾全课，进入 RAG / Agent 姊妹课',
    quiz: { q4: { stem: '记忆服务与 RAG/Agent 课的接口文档简称 mem api________', answer: 'contract', hint: 'mem api contract' } },
  }
);

const chaptersDir = path.join(courseDir, 'chapters');
const quizzes = [];

for (const ch of CHAPTERS) {
  const html = buildChapter(ch);
  fs.writeFileSync(path.join(chaptersDir, `${ch.id}.html`), html + '\n', 'utf8');
  quizzes.push(buildQuiz(ch, `cme-${ch.id.replace(/[^a-z0-9]/gi, '').slice(0, 10)}`));
  console.log(`Wrote ${ch.id}.html (${html.split('\n').length} lines)`);
}

fs.writeFileSync(path.join(courseDir, 'quiz.partial.html'), quizzes.join('\n\n') + '\n', 'utf8');
console.log('Wrote quiz.partial.html');
console.log('Done. Run assemble + validate + review-chapter.');
