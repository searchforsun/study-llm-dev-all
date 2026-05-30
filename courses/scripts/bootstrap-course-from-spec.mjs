/**
 * 从 outline-specs.json 初始化单门课程目录（course.json + theme + welcome + quiz 骨架）
 * 用法：node scripts/bootstrap-course-from-spec.mjs <slug>
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/bootstrap-course-from-spec.mjs <slug>');
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(path.join(root, 'outline-specs.json'), 'utf8'));
const entry = spec.courses?.[slug];
if (!entry) {
  console.error(`outline-specs.courses 中未找到: ${slug}`);
  process.exit(1);
}

const courseDir = path.join(root, slug);
fs.mkdirSync(path.join(courseDir, 'chapters'), { recursive: true });
fs.mkdirSync(path.join(courseDir, 'demos'), { recursive: true });

const outline = entry.outline.map((p) => ({
  phaseId: p.phaseId,
  phaseTitle: p.phaseTitle,
  phaseGoal: entry.phaseGoals?.[p.phaseId] ?? '',
  chapters: p.chapters.map((c) => ({
    id: c.id,
    title: c.title,
    sections: c.sections ?? [],
  })),
}));

const chapterCount = outline.reduce((n, p) => n + p.chapters.length, 0);

const courseJson = {
  meta: {
    title: entry.title,
    slug,
    domain: '大模型应用开发',
    themePreset: slug,
    version: 'Python 3.12 · FastAPI · uv 2026',
    generatedAt: new Date().toISOString().slice(0, 10),
    officialDocs: 'https://docs.python.org/3/',
    outlineSpecVersion: String(spec.version ?? '2'),
    domainType: entry.domainType ?? 'A',
    selectionPromptTemplate:
      '我在学习{domain}（CorpAssist Python 服务），请解释一下「{selection}」，并结合 FastAPI/双栈协作说明。',
    hljsLanguages: ['python', 'bash', 'json', 'yaml', 'http'],
    portalHref: '../index.html',
    learningNotes: {
      assumptions: [
        '已完成《大模型应用基础》共用轨或具备等价的 LLM 应用认知',
        '熟悉 Java/Spring Boot 与 Maven 多模块工程经验',
        '本课构建 CorpAssist Python 侧工程基座：检索、RAG API、异步任务',
      ],
      phaseGoals: entry.phaseGoals ?? {},
    },
  },
  outline,
  terms: {},
  quizzes: {},
  chapters: Object.fromEntries(
    outline.flatMap((p) =>
      p.chapters.map((c) => [
        c.id,
        { title: c.title, summary: c.sections.join(' · ') },
      ])
    )
  ),
};

fs.writeFileSync(
  path.join(courseDir, 'course.json'),
  JSON.stringify(courseJson, null, 2) + '\n',
  'utf8'
);

const accent = { light: '#2e7d32', dark: '#81c784' };
fs.writeFileSync(
  path.join(courseDir, 'theme.css'),
  `/* ${entry.title} — Python 轨绿色系（仅 accent） */
[data-theme-preset="${slug}"][data-theme="light"] {
  --accent: ${accent.light};
  --accent-hover: #1b5e20;
  --accent-soft: #e8f5e9;
  --accent-glow: rgba(46, 125, 50, 0.28);
  --accent-alt: #43a047;
}
[data-theme-preset="${slug}"][data-theme="dark"] {
  --accent: ${accent.dark};
  --accent-hover: #a5d6a7;
  --accent-soft: #1b2e1f;
  --accent-glow: rgba(129, 199, 132, 0.15);
  --accent-alt: #66bb6a;
}
`,
  'utf8'
);

const phaseCards = outline
  .map(
    (p) => `    <article class="role-card" data-phase="${p.phaseId}">
      <h3>${p.phaseTitle}</h3>
      <p>${entry.phaseGoals?.[p.phaseId] ?? ''}</p>
    </article>`
  )
  .join('\n');

fs.writeFileSync(
  path.join(courseDir, 'welcome.partial.html'),
  `<section class="welcome-panel">
  <header class="welcome-header">
    <h2>${entry.title}</h2>
    <p class="welcome-lead">
      Python 轨基座课：从 uv/poetry 项目结构、类型与 httpx/pydantic，到 FastAPI 异步服务、测试与 Docker compose，最终交付可与 Spring 对齐的 CorpAssist Python API。
    </p>
  </header>

  <div class="meta-cards">
    <div class="meta-card"><strong>当前版本</strong>Python 3.12 · FastAPI · uv 2026</div>
    <div class="meta-card"><strong>大纲规模</strong>${chapterCount} 章 · 3 阶段</div>
    <div class="meta-card"><strong>前置要求</strong>《大模型应用基础》· Java 工程经验</div>
  </div>

  <div class="meta-cards">
    <div class="meta-card"><strong>官方文档</strong><a href="https://docs.python.org/3/" target="_blank" rel="noopener">Python 3 文档</a> · <a href="https://fastapi.tiangolo.com/" target="_blank" rel="noopener">FastAPI</a></div>
    <div class="meta-card"><strong>领域类型</strong>${entry.domainType ?? 'A'} — Python 工程轨</div>
    <div class="meta-card"><strong>学习路径</strong>工程基座 → FastAPI 服务 → 生产级 Python AI 服务</div>
  </div>

  <div class="notice welcome-notice">
    <strong>说明：</strong>完成 <a href="../llm-application-fundamentals/index.html" class="course-ref" target="_blank" rel="noopener"><span class="course-ref-zh">大模型应用基础</span><code class="course-ref-slug">llm-application-fundamentals</code></a> 后进入本课；与 <a href="../spring-ai-engineering/index.html" class="course-ref" target="_blank" rel="noopener"><span class="course-ref-zh">Spring AI 工程化开发</span><code class="course-ref-slug">spring-ai-engineering</code></a> 并行推进双栈。
  </div>

  <h3>三阶段大纲摘要</h3>
  <div class="outline-table-wrap">
    <table class="outline-table">
      <thead>
        <tr><th scope="col">阶段</th><th scope="col">章节</th><th scope="col">小节概要</th></tr>
      </thead>
      <tbody id="outline-summary-body"></tbody>
    </table>
  </div>

  <div class="role-cards welcome-phases">
${phaseCards}
  </div>
</section>
`,
  'utf8'
);

if (!fs.existsSync(path.join(courseDir, 'quiz.partial.html'))) {
  fs.writeFileSync(path.join(courseDir, 'quiz.partial.html'), '<!-- quizzes appended per chapter -->\n', 'utf8');
}

fs.writeFileSync(
  path.join(courseDir, 'demos', 'README.md'),
  `# 课程 Demo 索引\n\n${entry.title} · CorpAssist Python 服务配套练习。\n\n| 章 | 目录 |\n|----|------|\n${outline
    .flatMap((p) => p.chapters)
    .map((c) => `| ${c.id} | [${c.id}-lab](./${c.id}-lab/) |`)
    .join('\n')}\n`,
  'utf8'
);

fs.writeFileSync(
  path.join(courseDir, 'README.md'),
  `# ${entry.title}\n\n\`\`\`bash\ncd courses\nnpx serve .\n# 打开 http://localhost:3000/${slug}/\n\`\`\`\n\n源文件：\`chapters/*.html\` → assemble → \`index.html\`\n`,
  'utf8'
);

console.log(`Bootstrapped ${courseDir} (${chapterCount} chapters)`);
