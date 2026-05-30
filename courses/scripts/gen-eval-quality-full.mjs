/**
 * 重新生成 llm-evaluation-quality 全章（示例级深度）
 * 用法：node scripts/gen-eval-quality-full.mjs [--skip-basics-01]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const courseDir = path.join(root, 'llm-evaluation-quality');
const skipB01 = process.argv.includes('--skip-basics-01');

const SLUG = 'llm-evaluation-quality';

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

function buildSection(sec, idx, chapter) {
  const blocks = [];
  blocks.push(`<div class="section-block"><h3>${esc(sec.h)}</h3>`);
  if (sec.scenario) {
    blocks.push(`<aside class="learn-scenario" aria-label="业务情境"><span class="learn-scenario-title">${esc(sec.scenarioTitle ?? 'CorpAssist')}</span>${sec.scenario}</aside>`);
  }
  blocks.push(`<p>${sec.body}</p>`);
  if (sec.list) {
    blocks.push('<ul>' + sec.list.map((li) => `<li>${li}</li>`).join('') + '</ul>');
  }
  if (sec.table) {
    blocks.push(`<div class="outline-table-wrap"><table class="outline-table"><thead><tr>${sec.table.headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>`);
    for (const row of sec.table.rows) {
      blocks.push(`<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`);
    }
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
  if (sec.mermaid) {
    blocks.push(mermaid(sec.mermaid.title, sec.mermaid.body, sec.mermaid.caption));
  }
  if (sec.faq) {
    blocks.push(`<details class="learn-faq"><summary>${sec.faq.q}</summary><p>${sec.faq.a}</p></details>`);
  }
  if (sec.microCheck) {
    blocks.push(`<details class="learn-micro-check"><summary>${sec.microCheck.q}</summary><p>${sec.microCheck.a}</p></details>`);
  }
  if (sec.extra) {
    blocks.push(`<p>${sec.extra}</p>`);
  }
  if (!sec.code && !sec.mermaid && idx % 2 === 1) {
    blocks.push(`<h4>CorpAssist 工程检查清单 · ${esc(sec.h)}</h4>`);
    blocks.push('<ul>');
    blocks.push(`<li>双栈报告是否包含与「${esc(sec.h)}」相关的可观测字段？</li>`);
    blocks.push(`<li>发版前是否在固定 dataset_version 上回归本节能力点？</li>`);
    blocks.push(`<li>坏例回流是否标注环节标签（检索/生成/Prompt）？</li>`);
    blocks.push('</ul>');
  }
  if (!sec.compare && idx === 0) {
    blocks.push(`<div class="notice"><strong>常见误区</strong><ul>
      <li>只讨论「${esc(sec.h)}」概念，不写入 CI 门禁或 yaml 阈值</li>
      <li>Python 与 Spring 各写各的报告字段，无法 ${term('cross-stack-compare', 'cross stack compare')}</li>
      <li>线上问题未回流到评测集，${term('ns1-flywheel', 'ns1 flywheel')} 空转</li>
    </ul></div>`);
  }
  blocks.push('</div>');
  return blocks.join('\n');
}

function chapterHasMermaid(ch) {
  return ch.sections.some((s) => s.mermaid);
}

function chapterHasCode(ch) {
  return ch.sections.some((s) => s.code);
}

function buildChapter(ch) {
  const n = ch.sections.length;
  const sectionsHtml = ch.sections.map((s, i) => buildSection(s, i, ch)).join('\n');
  const conclusions = ch.sections
    .map((s) => `<li><strong>${esc(s.h)}</strong>：${s.conclusion ?? s.body.slice(0, 80)}</li>`)
    .join('\n');
  const checklistItems = ch.checklist ?? [
    '能复述本章 4 条核心 takeaway',
    '完成正文对照表或代码示例阅读',
    '完成判断练习',
    '完成 Demo 或等价笔记',
    '已完成章节测验',
  ];
  const judgment = ch.judgment ?? {
    stem: `发版前只跑 10 条样例手工点检，不做回归集与 CI 门禁。在 CorpAssist ${ch.phase} 场景下风险是什么？`,
    answer: '无法发现 Prompt/索引变更导致的回归；难例与拒答边界未覆盖；不符合 NS1 飞轮。应固定 dataset_version + 阈值门禁。',
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
      <div class="notice"><strong>本章先记住 ${n} 件事</strong><ul>${ch.remember.map((r) => `<li>${r}</li>`).join('')}</ul></div>
    </div>
${sectionsHtml}
    <div class="section-block chapter-conclusions-block notice">
      <h3>本章结论</h3>
      <p class="chapter-conclusions-lead">${ch.conclusionLead ?? '本章能力将接入 CorpAssist NS1 评测飞轮与双栈 CI。'}</p>
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
  <article class="quiz-item" data-qid="q1" data-answer="${q.q1?.answer ?? 'B'}"><p class="stem"><strong>1.</strong> （单选）${q.q1?.stem ?? `本章「${ch.sections[0].h}」的首要目标是？`}</p>
  <ul class="options">${(q.q1?.opts ?? [`A) ${ch.goal}`, 'B) 训练基础模型', 'C) 仅做 UI']).map((o, i) => {
    const v = String.fromCharCode(65 + i);
    return `<li><label><input type="radio" name="${prefix}-q1" value="${v}"> ${esc(o)}</label></li>`;
  }).join('')}</ul>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q1?.hint ?? '见本章学习目标'}</p><p class="answer hidden"><strong>答案：</strong>${q.q1?.answer ?? 'A'} — ${q.q1?.explain ?? ch.goal}</p></article>
  <article class="quiz-item" data-qid="q2" data-answer="${q.q2?.answer ?? 'A,C'}"><p class="stem"><strong>2.</strong> （多选）${q.q2?.stem ?? 'CorpAssist 评测飞轮应包含哪些实践？'}</p>
  <ul class="options"><li><label><input type="checkbox" name="${prefix}-q2" value="A"> A) 评测集版本化</label></li>
  <li><label><input type="checkbox" name="${prefix}-q2" value="B"> B) 发版跳过 CI</label></li>
  <li><label><input type="checkbox" name="${prefix}-q2" value="C"> C) 坏例回流评测集</label></li>
  <li><label><input type="checkbox" name="${prefix}-q2" value="D"> D) 双栈同 schema 报告</label></li></ul>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q2?.hint ?? 'NS1 飞轮'}</p><p class="answer hidden"><strong>答案：</strong>${q.q2?.answer ?? 'A,C,D'}</p></article>
  <article class="quiz-item" data-qid="q3" data-answer="${q.q3?.answer ?? 'B'}"><p class="stem"><strong>3.</strong> （场景）${q.q3?.stem ?? '离线 faithfulness 0.96 但线上 thumbs-down 上升，优先排查？'}</p>
  <ul class="options"><li><label><input type="radio" name="${prefix}-q3" value="A"> A) 换更大模型</label></li>
  <li><label><input type="radio" name="${prefix}-q3" value="B"> B) 评测集与线上分布漂移 / 归因</label></li>
  <li><label><input type="radio" name="${prefix}-q3" value="C"> C) 关闭用户反馈</label></li></ul>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q3?.hint ?? '离线/在线 gap'}</p><p class="answer hidden"><strong>答案：</strong>${q.q3?.answer ?? 'B'}</p></article>
  <article class="quiz-item" data-qid="q4" data-answer="${q.q4?.answer ?? (ch.quizFill ?? 'RAGAS')}"><p class="stem"><strong>4.</strong> （填空）${q.q4?.stem ?? 'RAG 自动评测常用框架简称________。'}</p>
  <p><input type="text" class="fill-input" autocomplete="off" /></p>
  <div class="quiz-actions"><button type="button" class="btn-check">检查</button><button type="button" class="btn-hint">提示</button><button type="button" class="btn-answer">答案</button></div>
  <p class="hint hidden">${q.q4?.hint ?? '见 basics-03'}</p><p class="answer hidden"><strong>答案：</strong>${q.q4?.answer ?? 'RAGAS'}</p></article>
</section>`;
}

// Chapter definitions with rich section content
const CHAPTERS = [
  {
    id: 'basics-02-dataset',
    title: '评测集构建',
    phase: '评测体系设计',
    minutes: 40,
    goal: '构建可版本化、可分层采样的 CorpAssist 评测集',
    why: '没有固定评测集，每次改 Prompt 都像「凭感觉验收」。<strong>Golden Set</strong> 是 NS1 飞轮的燃料：坏例回流、发版回归都依赖同一套可 pin 的 JSONL。',
    outcomes: ['设计 S1 JSONL 字段（question、contexts、gold_answer、metadata）', '用分层采样覆盖拒答/多跳/表格题', '建立难例库与 version pin 流程', '编写标注 rubric 减少标注员漂移'],
    remember: ['<strong>版本 pin</strong>：dataset_version 与 git tag 对齐，禁止偷换评测集', '<strong>gold 多样性</strong>：拒答、引用、数值计算题都要占比例', '<strong>分层采样</strong>：按意图/文档类型分层，避免只测简单 FAQ', '<strong>难例库</strong>：线上 badcase 必须可回流且带 trace'],
    sections: [
      {
        h: '采样',
        body: `${term('sampling', '采样')} 决定评测集是否代表真实流量。CorpAssist S1 应从生产日志脱敏抽样，而非只用产品同事写的 20 条 demo 问句。`,
        list: [`<strong>随机抽样</strong>：适合建立 baseline，但易漏长尾`, `<strong>${term('stratified-sample', 'stratified sample')}</strong>：按 intent、doc_type、是否拒答分层`, `<strong>主动学习</strong>：优先标注模型不确定或 disagreement 高的样本`],
        table: { headers: ['层', '比例示意', '示例'], rows: [['制度 FAQ', '40%', '异地办公材料'], ['拒答', '15%', '库外政策'], ['多跳', '20%', '比较两个条款'], ['表格/数值', '15%', '审批天数'], [' adversarial ', '10%', '诱导胡编']] },
        code: { lang: 'json', title: 'JSONL 单条样例', body: `{"id":"s1-0042","question":"异地办公最长几天？","contexts":["chunk-883"],"gold_answer":"依据《远程办公管理办法》第5条，单次不超过15个工作日…","metadata":{"intent":"policy_qa","requires_refusal":false,"doc_version":"2026-Q1"}}` },
      },
      {
        h: '标注规范',
        body: `${term('annotation-rubric', 'annotation rubric')} 要可操作：什么算 faithful、什么算应拒答、引用指向哪个 chunk_id。`,
        compare: { bad: ['「答案要好」无细则', '每标注员自定标准', 'gold 写完整段落复制粘贴'], good: ['Likert + 通过/不通过二元门', '双盲标注 + 仲裁', 'gold 允许 paraphrase 但关键数字必须对'] },
        code: { lang: 'markdown', title: 'Rubric 片段', body: `## 忠实度\n- Pass：每个事实可在 contexts 找到\n- Fail：出现库外政策名称或编造天数\n\n## 拒答\n- Pass：明确说明无依据\n- Fail：无检索仍给具体审批流程` },
      },
      {
        h: '难例库',
        body: `${term('hard-case', 'hard case')} 单独成库，回归时<strong>必须全量跑</strong>，不可与普通集混平均稀释。`,
        scenario: '上次发版后线上出现「扫描件 PDF 表格审批天数错误」，已回流 12 条。难例库标记 source=prod_badcase，发版前 faithfulness 在此子集不得下降。',
        mermaid: { title: '难例回流', body: `flowchart LR\n  PROD[线上 thumbs-down] --> TRIAGE[归因标注]\n  TRIAGE --> HARD[hard_cases.jsonl]\n  HARD --> CI[回归全量跑]\n  CI --> MERGE[合并进下版 dataset vN+1]` },
      },
      {
        h: 'CorpAssist 评测集',
        body: `${term('corpassist-eval', 'corpassist eval')} 最终产物：<code>eval/corpassist-s1-vN.jsonl</code> + manifest（条数、分层比例、${term('version-pin', 'version pin')}）。`,
        list: [`Python 轨维护 ingest 脚本与 hash`, `Spring 轨集成测试通过 classpath 或 artifact 拉同一文件`, `CI 打印 dataset_version 到报告 header`],
        code: { lang: 'yaml', body: `dataset:\n  name: corpassist-s1\n  version: v3\n  sha256: a1b2...\n  counts:\n    total: 120\n    refusal: 18\n    hard_case: 12` },
        microCheck: { q: '能否用「更多简单题」把平均 faithfulness 刷高？', a: '可以，但掩盖回归。应报告<strong>分层指标</strong>与难例子集，并在门禁中对 hard_case 单独设阈值。' },
      },
    ],
    officialLinks: [{ label: 'RAGAS — Testset Generation', url: 'https://docs.ragas.io/en/stable/concepts/testset_generation/' }],
    practiceIntro: '设计 S1 评测集分层比例并写 2 条 JSONL 样例（含 1 条拒答）。',
    practiceSteps: ['按正文分层表填写你们 S1 的五层比例（可调整百分比）', '写一条拒答 gold：requires_refusal=true', '说明 version pin 在 CI 报告里如何打印', '可选：demos/basics-02-dataset-lab/ 编辑 eval-sample.jsonl'],
    demoBox: '目录：<code>demos/basics-02-dataset-lab/</code> — <strong>验收</strong>：jsonl ≥3 条，含 metadata.intent；至少 1 条拒答。',
    resources: ['<strong>下一章</strong>：<a href="#ch-basics-03-ragas">RAGAS 与自动评测</a>', '<a href="#ch-basics-01-metrics">指标：准确、召回、忠实、延迟</a>'],
    next: '下一章 <a href="#ch-basics-03-ragas">RAGAS 与自动评测</a>',
    quizFill: 'RAGAS',
  },
  {
    id: 'basics-03-ragas',
    title: 'RAGAS 与自动评测',
    phase: '评测体系设计',
    minutes: 45,
    goal: '用 RAGAS pipeline 自动打分并接入 CI',
    why: '人工评 120 条太贵。RAGAS 用 LLM-as-judge 批量算 faithfulness 等，是 CorpAssist 离线回归的默认引擎。',
    outcomes: ['跑通 evaluate() 产出 DataFrame/JSON', '解读 LLM judge 方差与成本', '在 GitHub Actions 设 threshold gate', '知道何时需人工仲裁'],
    remember: ['<strong>pipeline</strong>：question+contexts+answer → metrics', '<strong>judge 成本</strong>：评测也要算 Token', '<strong>CI 集成</strong>：失败 block merge', '<strong>解读</strong>：单条低分要看 trace'],
    quizFill: 'RAGAS',
    sections: [
      { h: 'pipeline', body: `${term('ragas', 'ragas')} ${term('eval-pipeline', 'eval pipeline')}：加载 JSONL → 调 RAG 链 → 收集 contexts/answer → ${term('batch-eval', 'batch eval')}。`, mermaid: { title: 'RAGAS pipeline', body: `flowchart TB\n  J[JSONL] --> RAG[RAG invoke]\n  RAG --> E[ragas.evaluate]\n  E --> M[faithfulness / recall / relevance]\n  M --> R[report.json]` }, list: [`需配置 evaluator LLM（可与生产模型不同，但要 document）`, `${term('llm-judge', 'llm judge')} 温度建议 0`] },
      { h: 'Python 脚本', body: 'CorpAssist 在 Python 轨维护 runner，Spring 只消费报告。', code: { lang: 'python', body: `from ragas import evaluate\nfrom ragas.metrics import faithfulness, answer_relevancy, context_recall\n\nresult = evaluate(dataset=ds, metrics=[faithfulness, answer_relevancy, context_recall])\nresult.to_pandas().to_json("report.json", orient="records")` }, compare: { bad: ['notebook 手点运行', '无固定 seed'], good: ['CLI + 退出码', '报告 upload artifact'] } },
      { h: 'CI 集成', body: `${term('ci-gate', 'ci gate')}：MR 触发 eval job，对比 baseline。`, code: { lang: 'yaml', body: `- name: RAGAS eval\n  run: python -m corpassist_eval.run --dataset eval/corpassist-s1-v3.jsonl\n- name: Gate\n  run: python -m corpassist_eval.gate --min-faithfulness 0.90` }, faq: { q: 'CI 里用 mock LLM 可以吗？', a: '单元测试可以 mock；<strong>回归门禁</strong>必须用与 staging 一致的模型与索引，否则分数无意义。' } },
      { h: '结果解读', body: `${term('metric-interpret', 'metric interpret')}：看分布而非均值；导出最低分 10 条进 badcase 评审。`, table: { headers: ['现象', '可能原因', '动作'], rows: [['整体 recall 降', '索引未 re-embed', '检查 embedding 版本'], ['faithfulness 降、recall 正常', 'Prompt 约束变弱', '对比 prompt_version'], ['judge 分方差大', 'judge 模型温度/语言', '固定 judge + 人工抽检']] }, microCheck: { q: 'RAGAS 分数 0.91 是否一定能发版？', a: '不一定。还要看 hard case 子集、P95、以及与 Spring 链 parity diff。' } },
    ],
    officialLinks: [{ label: 'RAGAS Documentation', url: 'https://docs.ragas.io/' }, { label: 'RAGAS GitHub', url: 'https://github.com/explodinggradients/ragas' }],
    practiceIntro: '本地或 lab 跑 mock RAGAS，理解报告字段与 gate 退出码。',
    practiceSteps: ['阅读 demos/basics-03-ragas-lab/mock_ragas.py 输出字段', '写出 faithfulness 低于阈值时 CI 应返回的 exit code', '对照 pipeline 图说明 evaluate 输入需要哪三列', '可选：对 3 条样例跑 mock 并截报告'],
    demoBox: '目录：<code>demos/basics-03-ragas-lab/</code> — <strong>验收</strong>：运行 mock 脚本输出 ≥3 个 metric 键。',
    resources: ['<strong>下一章</strong>：<a href="#ch-basics-04-human-eval">人工评测与仲裁</a>'],
    next: '下一章 <a href="#ch-basics-04-human-eval">人工评测与仲裁</a>',
  },
  {
    id: 'basics-04-human-eval',
    title: '人工评测与仲裁',
    phase: '评测体系设计',
    minutes: 35,
    goal: '设计 rubrics、抽样与一致性检查，控制人工成本',
    why: 'RAGAS 不能覆盖品牌语气、合规措辞、复杂仲裁。ToB 验收与抽检仍要人工，但要<strong>抽样化、标准化</strong>。',
    outcomes: ['写可操作 rubric', '设计 sampling plan 与双盲流程', '算 inter-annotator 一致性', '估算 eval cost 并选抽检率'],
    remember: ['<strong>rubrics</strong>：二元门 + 示例', '<strong>抽样</strong>：按风险分层加抽', '<strong>一致性</strong>：Cohen κ / 仲裁', '<strong>成本</strong>：全量人工不可持续'],
    sections: [
      { h: 'rubrics', body: `${term('human-rubric', 'human rubric')} 每条 ≤1 分钟可判。`, code: { lang: 'markdown', body: `| 维度 | Pass | Fail |\n| 引用 | 含 chunk_id | 无引用仍断言 |\n| 合规 | 无绝对化承诺 | 「保证通过」等措辞 |` } },
      { h: '抽样', body: `${term('sampling-plan', 'sampling plan')}：每周从新上线版本抽 N 条；高风险 intent 加倍。`, table: { headers: ['类型', '抽检率'], rows: [['新功能首周', '20%'], ['稳定 FAQ', '2%'], ['拒答类', '10%']] } },
      { h: '一致性', body: `${term('inter-annotator', 'inter annotator')}：双盲标注，κ&lt;0.6 暂停扩标。${term('adjudication', 'adjudication')} 由法务/产品仲裁。`, compare: { bad: ['单人标注即 gold', '讨论后改分无记录'], good: ['双盲 + 第三人仲裁', '分歧样本回流培训'] } },
      { h: '成本', body: `${term('eval-cost', 'eval cost')} ≈ 条数 × 单条分钟 × 人力单价。用 RAGAS 筛出边界样本再人工，可省 60%+ 成本。`, code: { lang: 'python', body: `# 仅人工评 RAGAS faithfulness 0.7-0.85 的边界样本\nborder = df[(df.faithfulness >= 0.7) & (df.faithfulness < 0.85)]` }, faq: { q: '人工是否还要评每条 RAGAS？', a: '不需要。RAGAS 全量；人工抽检 + 边界集 + 发版前 sign-off 子集。' } },
    ],
    officialLinks: [{ label: 'Amazon Science — Human eval guidelines', url: 'https://www.amazon.science/blog/how-we-measure-alexa-quality' }],
    practiceIntro: '为 S1 写 4 行 rubric 并设计双盲抽样表。',
    practiceSteps: ['复制 rubric 表并增加「拒答」一行', '写 sampling plan：新文档上线首周抽多少', '说明 κ 低于阈值时的流程', '可选：demos/basics-04-human-eval-lab/rubric.md'],
    demoBox: '目录：<code>demos/basics-04-human-eval-lab/</code> — <strong>验收</strong>：rubric.md 含 ≥4 维度。',
    resources: ['<strong>下一阶段</strong>：<a href="#ch-practice-01-python-eval">Python 服务评测流水线</a>'],
    next: '进入 practice：<a href="#ch-practice-01-python-eval">Python 服务评测流水线</a>',
  },
  {
    id: 'practice-01-python-eval',
    title: 'Python 服务评测流水线',
    phase: '双栈评测落地',
    minutes: 50,
    goal: '用 pytest + RAGAS 产出报告并 threshold block',
    why: 'Python 轨是 CorpAssist RAG 索引与批评的主战场。流水线要可重复、可 artifact、可 gate。',
    outcomes: ['pytest 集成 eval fixture', '上传 json artifact', '实现 threshold_block', '对接 GitHub Actions'],
    remember: ['pytest 收集 eval 用 marker', '报告进 CI artifact', '失败 exit 1', '与 dataset pin 绑定'],
    sections: [
      { h: 'pytest + RAGAS', body: `${term('pytest-eval', 'pytest eval')}：把 evaluate 包在 test 里，或单独 job。`, code: { lang: 'python', body: `@pytest.mark.eval\ndef test_s1_faithfulness(eval_runner):\n    report = eval_runner.run("corpassist-s1-v3.jsonl")\n    assert report["faithfulness"] >= 0.90` } },
      { h: '报告', body: `${term('eval-report', 'eval report')} 写 ${term('json-artifact', 'json artifact')}，含 git sha、prompt_version、index_version。`, mermaid: { title: 'Python eval CI', body: `flowchart LR\n  PY[pytest eval] --> ART[report.json]\n  ART --> S3[artifact store]\n  S3 --> SPRING[Spring 对比 job]` } },
      { h: '阈值闸门', body: `${term('threshold-block', 'threshold block')}：任一项低于 yaml 阈值则 pytest.fail。`, code: { lang: 'yaml', body: `thresholds:\n  faithfulness_min: 0.90\n  hard_case_faithfulness_min: 0.88` }, compare: { bad: ['只 print warning'], good: ['exit 1 block merge'] } },
    ],
    officialLinks: [{ label: 'pytest documentation', url: 'https://docs.pytest.org/' }],
    practiceIntro: '阅读 test_regression_demo.py，写出一条 failing threshold 用例。',
    practiceSteps: ['打开 demos/practice-01-python-eval-lab/test_regression_demo.py', '指出 assert 对应的 metric 名', '写出 report.json 应含的 3 个 metadata 字段', '说明 threshold 失败时 MR 能否合并'],
    demoBox: '目录：<code>demos/practice-01-python-eval-lab/</code> — <strong>验收</strong>：pytest 可运行（mock 即可）。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-02-spring-eval">Spring AI 服务评测</a>'],
    next: '下一章 <a href="#ch-practice-02-spring-eval">Spring AI 服务评测</a>',
    quizFill: 'pytest',
  },
  {
    id: 'practice-02-spring-eval',
    title: 'Spring AI 服务评测',
    phase: '双栈评测落地',
    minutes: 50,
    goal: 'Spring 集成测试与 Advisor 断言，对比 Python 报告',
    why: '生产 BFF 在 Spring。必须在同 dataset 子集上验证 Advisor 链与 Python parity。',
    outcomes: ['@SpringBootTest 加载 eval 集', 'Advisor 断言 citation', 'cross-stack compare diff', '输出 junit + json'],
    remember: ['禁 mock 检索做假绿', '同 JSONL 子集', '字段级 diff', 'Micrometer 可选记 latency'],
    sections: [
      { h: '集成测试', body: `${term('spring-integration-test', 'spring integration test')} 读 classpath JSONL 或 testcontainer 索引。`, code: { lang: 'java', body: `@SpringBootTest\nclass RagEvalIT {\n  @Test\n  void faithfulnessOnGoldenSubset() {\n    var report = evalService.runSubset("eval/corpassist-s1-v3.jsonl", 20);\n    assertThat(report.getFaithfulness()).isGreaterThan(0.88);\n  }\n}` } },
      { h: 'Advisor 断言', body: `${term('advisor-assert', 'advisor assert')}：QuestionAnswerAdvisor 输出含 citation marker。`, list: ['断言 retrievedDocuments 非空（非拒答）', '断言 answer 含 [doc:chunk_id] 格式'] },
      { h: '对比 Python 结果', body: `${term('cross-stack-compare', 'cross stack compare')}：diff &gt;0.02 的题号导出 parity report。`, code: { lang: 'json', body: `{"question_id":"s1-0042","python_faithfulness":0.94,"spring_faithfulness":0.71,"likely_cause":"index_lag"}` }, faq: { q: 'Spring 分低一定是 bug 吗？', a: '可能是索引同步延迟、Prompt advisor 顺序、或 tokenizer 差异。逐题 diff。' } },
    ],
    officialLinks: [{ label: 'Spring AI Evaluators', url: 'https://docs.spring.io/spring-ai/reference/api/evaluators.html' }],
    practiceIntro: '阅读 EvalAssertDemo.java，列出 2 个断言点。',
    practiceSteps: ['打开 demos/practice-02-spring-eval-lab/EvalAssertDemo.java', '写出 parity diff 报告里 likely_cause 枚举', '说明为何不能在 IT 里 mock VectorStore 返回固定文本', '可选：运行 Demo 测试类'],
    demoBox: '目录：<code>demos/practice-02-spring-eval-lab/</code> — <strong>验收</strong>：Java 文件含 ≥2 个 assert。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-03-ab-online">线上 A/B 与灰度</a>'],
    next: '下一章 <a href="#ch-practice-03-ab-online">线上 A/B 与灰度</a>',
    quizFill: 'Advisor',
  },
  {
    id: 'practice-03-ab-online',
    title: '线上 A/B 与灰度',
    phase: '双栈评测落地',
    minutes: 40,
    goal: '设计分流、看板与回滚策略',
    why: '离线 0.92 不代表线上更好。A/B 验证新 Prompt/索引对 thumbs、转人工的真实影响。',
    outcomes: ['配置 traffic split', 'experiment id 贯穿 trace', 'metric dashboard 指标', '自动 rollback 条件'],
    remember: ['分流要 sticky', '样本量够再结论', 'guardrail 指标', '一键回滚'],
    sections: [
      { h: '分流', body: `${term('ab-test', 'ab test')} + ${term('traffic-split', 'traffic split')}：user_id hash 到 variant B。`, code: { lang: 'yaml', body: `experiment:\n  id: exp-prompt-v7\n  variants:\n    control: 0.9\n    treatment: 0.1` } },
      { h: '指标看板', body: `${term('metric-dashboard', 'metric dashboard')}：thumbs-up rate、faithfulness 代理指标、${term('p95-latency', 'p95 latency')}。`, table: { headers: ['指标', 'guardrail'], rows: [['thumbs_up_rate', '不得低于 control -2%'], ['p95_ms', '不得高于 control +15%'], ['refusal_rate', '突变告警']] } },
      { h: '回滚', body: `${term('gray-release', 'gray release')} 10% → 50% → 100%；${term('rollback', 'rollback')} 触发即切回 control。`, mermaid: { title: '灰度与回滚', body: `flowchart LR\n  CANARY[10% canary] --> CHECK{guardrail OK?}\n  CHECK -->|yes| EXPAND[扩量]\n  CHECK -->|no| RB[rollback control]` } },
    ],
    officialLinks: [{ label: 'Google Exp Platform', url: 'https://developers.google.com/analytics/devguides/collection/protocol/ga4' }],
    practiceIntro: '填写 experiment.yaml 并写 2 条 guardrail。',
    practiceSteps: ['编辑 demos/practice-03-ab-online-lab/experiment.yaml', '写 guardrail：p95 超标如何 rollback', '说明 experiment_id 在 OTel span 如何传递', '对照灰度图口述 canary 失败路径'],
    demoBox: '目录：<code>demos/practice-03-ab-online-lab/</code> — <strong>验收</strong>：yaml 含 variants + guardrails。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-04-root-cause">坏例归因方法论</a>'],
    next: '下一章 <a href="#ch-practice-04-root-cause">坏例归因方法论</a>',
    quizFill: 'A/B',
  },
  {
    id: 'practice-04-root-cause',
    title: '坏例归因方法论',
    phase: '双栈评测落地',
    minutes: 45,
    goal: '区分检索/生成/Prompt 失败并沉淀案例库',
    why: '「模型不行」不是工程结论。归因到环节才能选对修复：re-embed、改 chunk、改 Prompt、加规则。',
    outcomes: ['使用 error taxonomy', 'trace 分析定位', '维护 case library', '驱动 fix loop'],
    remember: ['检索 vs 生成 vs Prompt', 'trace 必看', '案例库带 fix', '闭环进评测集'],
    sections: [
      { h: '检索 vs 生成 vs Prompt', body: `${term('retrieval-failure', 'retrieval failure')} recall 低；${term('generation-failure', 'generation failure')} recall 高 faithfulness 低；${term('prompt-regression', 'prompt regression')} 整体漂移。`, table: { headers: ['信号', '归因', '修复'], rows: [['recall↓', '检索', 'chunk/embedding/topK'], ['faith↓ recall OK', '生成', 'Prompt/温度/拒答'], ['全指标↓', 'Prompt/模型', '版本 diff']] } },
      { h: '工具链', body: `${term('trace-analysis', 'trace analysis')}：LangSmith / OTel span 看 retrieve → rerank → generate。`, code: { lang: 'json', body: `{"trace_id":"t-99","spans":["retrieve:120ms","rerank:40ms","llm:800ms"],"top_chunks":["c-883","c-102"]}` } },
      { h: '案例库', body: `${term('case-library', 'case library')} + ${term('error-taxonomy', 'error taxonomy')}：每条 badcase 标签 + owner + ${term('fix-loop', 'fix loop')} 状态。`, compare: { bad: ['Excel 散落'], good: ['Git 管理 badcase.md + 回流 jsonl'] } },
    ],
    officialLinks: [{ label: 'LangSmith Evaluations', url: 'https://docs.smith.langchain.com/evaluation' }],
    practiceIntro: '用 badcase 模板归因 1 条虚构坏例。',
    practiceSteps: ['打开 demos/practice-04-root-cause-lab/badcase-template.md', '填写 retrieval/generation/prompt 三选一', '写出 fix-loop 下一步 owner', '说明如何回流到 hard_cases.jsonl'],
    demoBox: '目录：<code>demos/practice-04-root-cause-lab/</code> — <strong>验收</strong>：模板含归因 + fix 字段。',
    resources: ['<strong>下一章</strong>：<a href="#ch-practice-05-user-feedback">用户反馈与迭代闭环</a>'],
    next: '下一章 <a href="#ch-practice-05-user-feedback">用户反馈与迭代闭环</a>',
    quizFill: 'recall',
  },
  {
    id: 'practice-05-user-feedback',
    title: '用户反馈与迭代闭环',
    phase: '双栈评测落地',
    minutes: 45,
    goal: '埋点、坏例回流、优先级与双栈发布节奏',
    why: 'NS1 飞轮：线上反馈 → 标注 → 评测回归 → 发版。没有回流就没有持续改进。',
    outcomes: ['设计 feedback event schema', 'thumbs 与 badcase reflow', 'priority queue 排序', 'release train 对齐双栈'],
    remember: ['埋点带 trace_id', '坏例必回流', '优先级看影响面', '双栈同 train'],
    sections: [
      { h: '埋点与标注', body: `${term('user-feedback', 'user feedback')} event：thumbs、comment、${term('feedback-label', 'feedback label')}。`, code: { lang: 'json', body: `{"event":"thumbs_down","trace_id":"t-99","question":"…","labels":["wrong_fact"],"user_segment":"legal"}` } },
      { h: '坏例回流', body: `${term('badcase-reflow', 'badcase reflow')}：T+1 进入 triage，T+3 进 hard case 或 jsonl。`, mermaid: { title: 'NS1 飞轮', body: `flowchart LR\n  FB[feedback] --> TRI[triage]\n  TRI --> DS[dataset vN+1]\n  DS --> CI[regression]\n  CI --> REL[release]` } },
      { h: '优先级排序', body: `${term('priority-queue', 'priority queue')}：影响用户数 × 严重度 × 合规风险。`, list: ['P0：错误政策承诺', 'P1：事实错误高频', 'P2：体验/格式'] },
      { h: '双栈发布节奏', body: `${term('release-train', 'release train')}：Python 索引先 Canary，Spring BFF 跟随；${term('closed-loop', 'closed loop')} Weekly 评审 ${term('ns1-flywheel', 'ns1 flywheel')}。` },
    ],
    officialLinks: [{ label: 'Product Analytics — Feedback loops', url: 'https://amplitude.com/blog/user-feedback-loop' }],
    practiceIntro: '设计 feedback-event.json 并写回流 SLA。',
    practiceSteps: ['阅读 demos/practice-05-user-feedback-lab/feedback-event.json', '写 thumbs_down 到 jsonl 的 3 步', '定义 P0 badcase 响应 SLA', '说明 Python 索引与 Spring 谁先发版'],
    demoBox: '目录：<code>demos/practice-05-user-feedback-lab/</code> — <strong>验收</strong>：event 含 trace_id + labels。',
    resources: ['<strong>下一阶段</strong>：<a href="#ch-advanced-01-regression">回归门禁与发布</a>'],
    next: '进入 advanced：<a href="#ch-advanced-01-regression">回归门禁与发布</a>',
    quizFill: 'trace',
  },
  {
    id: 'advanced-01-regression',
    title: '回归门禁与发布',
    phase: '质量治理',
    minutes: 40,
    goal: 'CI 卡点、版本对比与阻塞策略',
    why: '没有 regression gate，每次 merge 都可能悄悄降低 faithfulness。生产级必须 block。',
    outcomes: ['ci block 策略', 'version diff 报告', 'baseline pin', 'merge queue 集成'],
    remember: ['MR 必跑 eval', '对比 baseline', 'metric regression 定义', 'hold deploy'],
    sections: [
      { h: 'CI 卡点', body: `${term('regression-gate', 'regression gate')} + ${term('ci-block', 'ci block')}：required check 未绿禁止合并。`, code: { lang: 'yaml', body: `required_checks:\n  - ragas-eval\n  - spring-eval-subset` } },
      { h: '版本对比', body: `${term('version-diff', 'version diff')}：新 report vs ${term('baseline-pin', 'baseline pin')}。`, code: { lang: 'json', body: `{"delta":{"faithfulness":-0.03,"context_recall":0.01},"verdict":"BLOCK"}` } },
      { h: '阻塞策略', body: `${term('metric-regression', 'metric regression')} 超 -0.02 或 hard case 失败 → ${term('deploy-hold', 'deploy hold')}。`, compare: { bad: ['warn only'], good: ['block + notify owner'] } },
    ],
    officialLinks: [{ label: 'GitHub — Required status checks', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks' }],
    practiceIntro: '阅读 ci-gate.yaml，写出 BLOCK 条件。',
    practiceSteps: ['打开 demos/advanced-01-regression-lab/ci-gate.yaml', '列出 2 个 required job', '解释 baseline pin 存在哪', '写出 deploy hold 解除条件'],
    demoBox: '目录：<code>demos/advanced-01-regression-lab/</code> — <strong>验收</strong>：yaml 含 block 条件。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-02-governance">质量治理流程</a>'],
    next: '下一章 <a href="#ch-advanced-02-governance">质量治理流程</a>',
    quizFill: 'baseline',
  },
  {
    id: 'advanced-02-governance',
    title: '质量治理流程',
    phase: '质量治理',
    minutes: 35,
    goal: 'Owner、周报、SLA 违约与 ToB 验收节奏',
    why: '评测不是一次性项目。ToB 客户要 weekly report、SLA 与 incident 复盘。',
    outcomes: ['指定 quality owner', 'weekly report 模板', 'sla breach 流程', 'tob acceptance 清单'],
    remember: ['Owner 唯一', '周报看趋势', 'SLA 违约升级', '验收可审计'],
    sections: [
      { h: 'Owner', body: `${term('quality-owner', 'quality owner')}：对 eval OKR 负责，协调算法/后端/产品。` },
      { h: '周报', body: `${term('weekly-report', 'weekly report')}：faithfulness 趋势、top badcase、A/B 状态、${term('governance-rhythm', 'governance rhythm')}。`, code: { lang: 'markdown', body: `## Week 22\n- faithfulness: 0.91 (↑0.01)\n- new hard cases: 8\n- open P0: 1 (wrong approval days)` } },
      { h: 'SLA 违约', body: `${term('sla-breach', 'sla breach')}：P95 连续 3 天超标 → incident + ${term('incident-postmortem', 'incident postmortem')}。` },
      { h: 'ToB 验收', body: `${term('tob-acceptance', 'tob acceptance')}：交付 ${term('eval-okr', 'eval okr')} + 抽样人工报告 + ${term('stakeholder-review', 'stakeholder review')} 签字。` },
    ],
    officialLinks: [{ label: 'Google SRE — Postmortem culture', url: 'https://sre.google/sre-book/postmortem-culture/' }],
    practiceIntro: '填写 weekly-report.md 一节并写 SLA breach 触发条件。',
    practiceSteps: ['编辑 demos/advanced-02-governance-lab/weekly-report.md', '写 P0 open 项格式', '定义 SLA breach 通知链', 'ToB 验收列出 3 份交付物'],
    demoBox: '目录：<code>demos/advanced-02-governance-lab/</code> — <strong>验收</strong>：weekly-report 含趋势 + P0。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-03-deepeval">其他框架与扩展</a>'],
    next: '下一章 <a href="#ch-advanced-03-deepeval">其他框架与扩展</a>',
    quizFill: 'Owner',
  },
  {
    id: 'advanced-03-deepeval',
    title: '其他框架与扩展',
    phase: '质量治理',
    minutes: 35,
    goal: '了解 DeepEval、自定义 metric 与框架选型',
    why: 'RAGAS 不是唯一选择。DeepEval 等在 Agent、多轮、自定义 rubric 上有不同抽象。',
    outcomes: ['跑通 DeepEval 概念', '写 custom metric', 'framework compare', 'eval abstraction 层'],
    remember: ['工具服务于 schema', 'custom metric 要可测', '避免双轨报告', 'vendor neutral'],
    sections: [
      { h: 'DeepEval 简介', body: `${term('deepeval', 'deepeval')}：TestCase + Metrics + assert_test。`, code: { lang: 'python', body: `from deepeval import assert_test\nfrom deepeval.test_case import LLMTestCase\n\ntest_case = LLMTestCase(input="…", actual_output="…", retrieval_context=["…"])\nassert_test(test_case, [faithfulness_metric])` } },
      { h: '自定义 metric', body: `${term('custom-metric', 'custom metric')}：继承 Metric 类，输出 0-1 分。`, code: { lang: 'python', body: `# demos/advanced-03-deepeval-lab/custom_metric_demo.py\n# CitationFormatMetric: answer 含 [doc:uuid]` } },
      { h: '选择建议', body: `${term('framework-compare', 'framework compare')}：RAGAS 擅 RAG 三维；DeepEval 擅 test case 组织；Spring AI Evaluator 擅 Java IT。${term('eval-abstraction', 'eval abstraction')} 内部统一 ${term('vendor-neutral', 'vendor neutral')} schema。`, table: { headers: ['框架', '优势', 'CorpAssist 用法'], rows: [['RAGAS', 'RAG metrics', 'Python 批跑'], ['DeepEval', 'TestCase/CI', 'Agent 自定义'], ['Spring Eval', 'Java 集成', 'BFF parity']] } },
    ],
    officialLinks: [{ label: 'DeepEval Docs', url: 'https://docs.confident-ai.com/' }],
    practiceIntro: '阅读 custom_metric_demo.py，设计 CitationFormatMetric 规则。',
    practiceSteps: ['打开 demos/advanced-03-deepeval-lab/', '写出 custom metric 的 Pass/Fail 规则', '对比 RAGAS vs DeepEval 适用场景各 1 条', '说明 abstraction 层输出字段'],
    demoBox: '目录：<code>demos/advanced-03-deepeval-lab/</code> — <strong>验收</strong>：README 含 metric 说明。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-04-capstone">实战：CorpAssist 质量看板</a>'],
    next: '下一章 <a href="#ch-advanced-04-capstone">实战：CorpAssist 质量看板</a>',
    quizFill: 'DeepEval',
  },
  {
    id: 'advanced-04-capstone',
    title: '实战：CorpAssist 质量看板',
    phase: '质量治理',
    minutes: 60,
    goal: '整合双栈报告、阈值演示与发布建议',
    why: '毕业交付要能「一张图讲清楚质量与能否发版」。看板连接 CI artifact 与业务决策。',
    outcomes: ['dual stack report 合并', 'threshold demo', 'exec summary', 'release recommendation'],
    remember: ['双栈并排', '趋势 > 单点', '阈值可视化', '发布建议可执行'],
    sections: [
      { h: '双栈报告', body: `${term('quality-dashboard', 'quality dashboard')} 读取 Python + Spring ${term('dual-stack-report', 'dual stack report')}。`, code: { lang: 'json', body: `{"python":{"faithfulness":0.92},"spring":{"faithfulness":0.90},"parity_ok":true}` } },
      { h: '阈值', body: `${term('threshold-demo', 'threshold demo')}：绿/黄/红区；hard case 单独卡片。` },
      { h: '演示', body: `${term('exec-summary', 'exec summary')} + ${term('trend-chart', 'trend chart')} + ${term('release-recommendation', 'release recommendation')}：Go / No-Go / Canary。`, mermaid: { title: '质量看板数据流', body: `flowchart TB\n  CI[CI artifacts] --> MERGE[report merger]\n  MERGE --> UI[Dashboard]\n  UI --> GO{Go?}` } },
    ],
    officialLinks: [{ label: 'Grafana — Dashboard best practices', url: 'https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/best-practices/' }],
    practiceIntro: '用 dashboard.sample.json 写 Exec Summary 三段。',
    practiceSteps: ['阅读 demos/advanced-04-capstone-lab/dashboard.sample.json', '写 Go/No-Go 决策 2 条', '对照 delivery-checklist.md 勾选', '准备 3 分钟演示提纲'],
    demoBox: '目录：<code>demos/advanced-04-capstone-lab/</code> — <strong>验收</strong>：checklist 全勾 + sample json 字段完整。',
    resources: ['<strong>下一章</strong>：<a href="#ch-advanced-05-interview">面试：如何证明效果提升</a>'],
    next: '下一章 <a href="#ch-advanced-05-interview">面试：如何证明效果提升</a>',
    quizFill: 'Go',
  },
  {
    id: 'advanced-05-interview',
    title: '面试：如何证明效果提升',
    phase: '质量治理',
    minutes: 40,
    goal: '量化叙事、图表与常见陷阱',
    why: '面试常问「你怎么证明 RAG 变好了」。要能讲清 before/after、A/B、诚实边界。',
    outcomes: ['quant narrative 结构', 'before/after 图表', 'ab evidence', '避开 interview trap'],
    remember: ['先 baseline', '再 diff', 'A/B 证据', '诚实说局限'],
    interview: ['用 2 分钟说明 NS1 飞轮在 S1 的落地', '面试官问「离线很高线上很差」如何答', '如何证明不是偷换评测集'],
    sections: [
      { h: '量化叙事', body: `${term('quant-narrative', 'quant narrative')}：问题 → baseline → 改动 → 离线回归 → A/B → 业务指标。${term('eval-storytelling', 'eval storytelling')} 要有 ${term('ns1-proof', 'ns1 proof')}。` },
      { h: '图表', body: `${term('chart-story', 'chart story')}：${term('before-after', 'before after')} faithfulness + P95 双轴；标注 dataset_version。`, compare: { bad: ['只有一句提升 20%'], good: ['曲线 + 置信区间 + 样本量'] } },
      { h: '陷阱', body: `${term('interview-trap', 'interview trap')}：偷换测试集、Cherry pick、无 ${term('ab-evidence', 'ab evidence')}、忽略 ${term('metric-honesty', 'metric honesty')}。`, list: ['陷阱：「我们感觉更好」→ 答：固定 golden set + CI', '陷阱：「只展示好案例」→ 答：报告分位数 + badcase 列表'] },
    ],
    officialLinks: [{ label: 'Evidence-based ML Product', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' }],
    practiceIntro: '写 interview-answer.md：2 分钟 NS1 叙事。',
    practiceSteps: ['打开 demos/advanced-05-interview-lab/interview-answer.md', '填 before/after 数字（可用示意）', '写 1 个 trap 与反驳', '录音自述 2 分钟（可选）'],
    demoBox: '目录：<code>demos/advanced-05-interview-lab/</code> — <strong>验收</strong>：answer 含 baseline/A/B/局限。',
    resources: ['<strong>课程回顾</strong>：<a href="#ch-basics-01-metrics">指标</a> · <a href="#ch-practice-05-user-feedback">反馈闭环</a>'],
    next: '回顾全课并准备 NS1 答辩',
    quizFill: 'A/B',
  },
];

const chaptersDir = path.join(courseDir, 'chapters');
const quizzes = [];

for (const ch of CHAPTERS) {
  const html = buildChapter(ch);
  fs.writeFileSync(path.join(chaptersDir, `${ch.id}.html`), html + '\n', 'utf8');
  quizzes.push(buildQuiz(ch, `eq-${ch.id.replace(/[^a-z0-9]/gi, '').slice(0, 8)}`));
  console.log(`Wrote ${ch.id}.html (${html.split('\n').length} lines)`);
}

// basics-01 already hand-written if skip
const quizParts = [];
if (!skipB01) {
  // include placeholder - basics-01 quiz built separately
}
quizParts.push(...quizzes);

// Build basics-01 quiz
const b01Quiz = buildQuiz(
  {
    id: 'basics-01-metrics',
    title: '指标：准确、召回、忠实、延迟',
    goal: '定义 RAG/Agent 核心指标并与 SLA 对齐',
    sections: [{ h: 'RAG 指标定义' }, { h: 'Agent 成功率' }, { h: 'SLA' }, { h: '双栈同口径' }],
    quiz: {
      q1: { stem: 'S1 制度问答发版门禁应优先看哪组指标？', answer: 'B', opts: ['A) 仅 BLEU', 'B) faithfulness + context recall + P95', 'C) 仅用户主观分'], hint: '见 RAG 指标对照表' },
      q2: { stem: '双栈评测报告必须包含？', answer: 'A,C,D', hint: 'schema 对齐' },
      q3: { stem: 'faithfulness 高、answer relevance 低，优先排查？', answer: 'B', hint: '检索/偏题' },
      q4: { stem: 'JSON schema 中延迟分位常用字段：p95________', answer: 'latency', hint: 'latency 对象内' },
    },
  },
  'eq-b01'
);

const allQuiz = [b01Quiz, ...quizzes].join('\n\n');
fs.writeFileSync(path.join(courseDir, 'quiz.partial.html'), allQuiz + '\n', 'utf8');
console.log('Wrote quiz.partial.html');

console.log('Done. Run assemble + validate + review-chapter.');
