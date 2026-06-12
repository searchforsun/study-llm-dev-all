/**
 * 组装 GitHub Pages 静态产物（无 Vite/打包步骤）。
 * - 只复制浏览所需文件（去掉 demos/chapters 等源码目录）
 * - 压缩 HTML、优化运行时（按章高亮，而非全页）
 * 输出：_site/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const coursesSrc = path.join(repoRoot, 'courses');
const outRoot = path.join(repoRoot, '_site');
const coursesOut = path.join(outRoot, 'courses');

/** 仅静态站点不需要的目录（源码/碎片，体积大且不参与浏览） */
const SKIP_DIRS = new Set(['chapters', 'demos', 'node_modules', '.git']);

/** 单课 index.html 已内嵌 course.json，无需再部署 */
const SKIP_FILES = new Set([
  'welcome.partial.html',
  'quiz.partial.html',
  'progress.local.json',
  'course.json',
]);

function resetDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function shouldSkipFile(name) {
  if (SKIP_FILES.has(name)) return true;
  if (name.endsWith('.partial.html')) return true;
  return false;
}

function copyCoursesFiltered(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const from = path.join(src, name);
    const to = path.join(dest, name);
    const st = fs.statSync(from);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      copyCoursesFiltered(from, to);
      continue;
    }
    if (shouldSkipFile(name)) continue;
    fs.copyFileSync(from, to);
  }
}

/** 保护 script/style/pre（Mermaid + 代码块），仅压缩标签间空白 */
function minifyHtml(html) {
  const preserved = [];
  function stash(block) {
    preserved.push(block);
    return `\x00P${preserved.length - 1}\x00`;
  }
  html = html.replace(/<(script|style)(\s[^>]*)?>[\s\S]*?<\/\1>/gi, stash);
  html = html.replace(/<pre(\s[^>]*)?>[\s\S]*?<\/pre>/gi, stash);
  html = html
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .trim();
  return html.replace(/\x00P(\d+)\x00/g, (_, index) => preserved[Number(index)]);
}

/** Pages 专用：避免启动时对全部隐藏章节做 highlight.js（主要卡顿来源） */
function optimizeCourseRuntime(html) {
  if (!html.includes('highlightIn(document);')) return html;

  html = html.replace('highlightIn(document);', '/* pages: highlight per chapter */');

  const marker = /renderMermaidIn\(section\);\r?\n\s*syncQuizVisibility\(id\);/;
  const patched =
    'renderMermaidIn(section);\n    highlightIn(section);\n    syncQuizVisibility(id);';
  if (marker.test(html)) {
    html = html.replace(marker, patched);
  }

  if (!html.includes('pages-cv-hidden')) {
    html = html.replace(
      '</style>',
      'section[data-chapter]:not(.active){content-visibility:auto;contain-intrinsic-size:auto 600px;}\n/* pages-cv-hidden */\n</style>'
    );
  }

  return html;
}

function optimizeHtmlFile(filePath) {
  if (!filePath.endsWith('.html')) return 0;
  const before = fs.readFileSync(filePath, 'utf8');
  let html = optimizeCourseRuntime(before);
  html = minifyHtml(html);
  fs.writeFileSync(filePath, html, 'utf8');
  return before.length - html.length;
}

function dirBytes(dir) {
  let total = 0;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    total += name.isDirectory() ? dirBytes(p) : fs.statSync(p).size;
  }
  return total;
}

resetDir(outRoot);
copyCoursesFiltered(coursesSrc, coursesOut);

const rootIndex = path.join(repoRoot, 'index.html');
const rootNoJekyll = path.join(repoRoot, '.nojekyll');
if (!fs.existsSync(rootIndex)) {
  throw new Error('Missing repo root index.html (portal redirect)');
}
fs.writeFileSync(
  path.join(outRoot, 'index.html'),
  minifyHtml(fs.readFileSync(rootIndex, 'utf8')),
  'utf8'
);
if (fs.existsSync(rootNoJekyll)) {
  fs.copyFileSync(rootNoJekyll, path.join(outRoot, '.nojekyll'));
} else {
  fs.writeFileSync(path.join(outRoot, '.nojekyll'), '');
}

let saved = 0;
let htmlCount = 0;
function walkOptimize(dir) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      walkOptimize(p);
      continue;
    }
    if (p.endsWith('.html')) {
      saved += optimizeHtmlFile(p);
      htmlCount += 1;
    }
  }
}
walkOptimize(outRoot);

const total = dirBytes(outRoot);
console.log('Pages artifact ready:', outRoot);
console.log(`  HTML files optimized: ${htmlCount}`);
console.log(`  HTML bytes saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);
console.log(`  Artifact size: ${(total / 1024 / 1024).toFixed(2)} MB`);
