/**
 * 为单课 HTML 中的课程 slug 补充中文名与链接。
 * 用法：node scripts/enrich-course-refs.mjs --dir courses/llm-application-fundamentals
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const coursesRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs() {
  const args = process.argv.slice(2);
  let dir = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dir' && args[i + 1]) dir = args[++i];
  }
  if (!dir) {
    console.error('Usage: node scripts/enrich-course-refs.mjs --dir <course-dir>');
    process.exit(1);
  }
  return path.resolve(dir);
}

function loadCatalog() {
  const catalogPath = path.join(coursesRoot, 'courses.json');
  const data = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const catalog = {};
  const short = {};
  for (const c of data.courses ?? []) {
    catalog[c.slug] = c.title;
    short[c.slug] = deriveShortTitle(c.title, c.slug);
  }
  return { catalog, short, currentSlug: null };
}

function deriveShortTitle(title, slug) {
  const t = title.split(/[：:]/)[0].trim();
  if (t.length <= 14) return t;
  const map = {
    'scenario-enterprise-rag-kb': 'S1·知识库落地',
    'scenario-enterprise-customer-service': 'S2·客服落地',
    'scenario-enterprise-agent-automation': 'S3·Agent落地',
    'scenario-enterprise-code-assistant': 'S4·代码落地',
    'scenario-enterprise-content-studio': 'S5·内容落地',
    'python-engineering-for-llm': 'Python工程化',
    'spring-ai-alibaba-engineering': 'SAA工程',
    'llm-composite-integration-workshop': '双栈集成实战',
    'observability-reliability-ops': '可观测运维',
    'security-compliance-engineering': '安全合规',
    'knowledge-lifecycle-governance': '知识库治理',
    'retrieval-vector-platform': '向量检索平台',
    'production-prompt-engineering': 'Prompt工程',
    'context-memory-engineering': '上下文记忆',
    'agent-orchestration-engineering': 'Agent编排',
    'multimodel-routing-multimodal': '多模态路由',
    'domain-model-adaptation': '领域微调',
    'llm-serving-for-applications': '推理服务',
    'enterprise-llm-solution-delivery': '方案交付',
    'llm-application-fundamentals': '大模型应用基础',
  };
  return map[slug] ?? t.slice(0, 12);
}

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function courseRefHtml(slug, title, { suffix = '', current = false } = {}) {
  const cls = current ? 'course-ref course-ref-current' : 'course-ref';
  return (
    `<a href="../../${slug}/index.html" class="${cls}" target="_blank" rel="noopener">` +
    `<span class="course-ref-zh">${title}</span>` +
    `<code class="course-ref-slug">${slug}</code></a>${suffix}`
  );
}

function splitProtected(html) {
  const parts = [];
  const re = /<(pre|script)\b[\s\S]*?<\/\1>/gi;
  let last = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) parts.push({ type: 'text', content: html.slice(last, m.index) });
    parts.push({ type: 'protected', content: m[0] });
    last = m.index + m[0].length;
  }
  if (last < html.length) parts.push({ type: 'text', content: html.slice(last) });
  return parts;
}

function enrichText(text, catalog, short, currentSlug) {
  if (text.includes('class="course-ref"')) {
    // already partially enriched; still process unmarked codes
  }

  const slugs = Object.keys(catalog).sort((a, b) => b.length - a.length);

  // 已有「中文链接 + （code）」合并为 course-ref
  for (const slug of slugs) {
    const title = catalog[slug].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(
      `<a\\s+href="\\.\\./\\.\\./${escapeReg(slug)}/index\\.html"[^>]*>([^<]+)</a>\\s*（\\s*<code>${escapeReg(slug)}</code>\\s*）`,
      'g'
    );
    text = text.replace(re, () =>
      courseRefHtml(slug, catalog[slug], {
        suffix: '',
        current: slug === currentSlug,
      })
    );
  }

  // 仅 code 的 slug（含「本课」后缀）
  for (const slug of slugs) {
    const benke = slug === currentSlug ? '（本课）' : '';
    const reBenke = new RegExp(
      `<code>${escapeReg(slug)}</code>（本课）`,
      'g'
    );
    if (benke) {
      text = text.replace(reBenke, () =>
        courseRefHtml(slug, catalog[slug], { suffix: '（本课）', current: true })
      );
    }

    const reCode = new RegExp(`<code>${escapeReg(slug)}</code>`, 'g');
    text = text.replace(reCode, (match, offset, str) => {
      if (match.includes('course-ref-slug')) return match;
      const open = str.lastIndexOf('<a ', offset);
      if (open !== -1) {
        const close = str.indexOf('</a>', open);
        if (close === -1 || close > offset) {
          const tag = str.slice(open, open + 120);
          if (tag.includes('class="course-ref')) return match;
        }
      }
      return courseRefHtml(slug, catalog[slug], { current: slug === currentSlug });
    });
  }

  // 通配与别名
  text = text.replace(
    /<code>scenario-enterprise-\*<\/code>/g,
    '<span class="course-ref-wild">场景落地课 <code>scenario-enterprise-*</code></span>'
  );
  text = text.replace(
    /<code>llm-serving-\*<\/code>/g,
    courseRefHtml('llm-serving-for-applications', catalog['llm-serving-for-applications']) +
      ' <span class="course-ref-note">（系列简称）</span>'
  );

  // Mermaid 节点短中文
  text = text.replace(/<pre class="mermaid">([\s\S]*?)<\/pre>/g, (_, body) => {
    let m = body;
    for (const slug of slugs) {
      m = m.replace(new RegExp(`(\\w+)\\[${escapeReg(slug)}\\]`, 'g'), `$1[${short[slug]}]`);
    }
    m = m.replace(/scenario-enterprise-\*/g, '场景落地课');
    return `<pre class="mermaid">${m}</pre>`;
  });

  return text;
}

function enrichHtml(html, catalog, short, currentSlug) {
  return splitProtected(html)
    .map((p) =>
      p.type === 'protected' ? p.content : enrichText(p.content, catalog, short, currentSlug)
    )
    .join('');
}

function patchCourseJson(courseDir, catalog) {
  const p = path.join(courseDir, 'course.json');
  if (!fs.existsSync(p)) return;
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  data.courseCatalog = catalog;
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n');
}

function main() {
  const courseDir = parseArgs();
  const { catalog, short } = loadCatalog();
  const currentSlug = path.basename(courseDir);
  let count = 0;

  const targets = ['welcome.partial.html', 'quiz.partial.html'];
  for (const f of fs.readdirSync(path.join(courseDir, 'chapters'))) {
    if (f.endsWith('.html')) targets.push(path.join('chapters', f));
  }

  for (const rel of targets) {
    const fp = path.join(courseDir, rel);
    if (!fs.existsSync(fp)) continue;
    let raw = fs.readFileSync(fp, 'utf8');
    let next = raw;
    for (let pass = 0; pass < 5; pass++) {
      const round = enrichHtml(next, catalog, short, currentSlug);
      if (round === next) break;
      next = round;
    }
    if (next !== raw) {
      fs.writeFileSync(fp, next);
      count++;
      console.log('updated', rel);
    }
  }

  patchCourseJson(courseDir, catalog);
  console.log(`Done: ${count} file(s), catalog ${Object.keys(catalog).length} courses`);
}

main();
