/**
 * 将章节 HTML 中的课程代号 S1～S5、NS1～NS3 转为可 hover 的行业术语 span。
 * 用法：node scripts/enrich-curriculum-terms.mjs --dir llm-application-fundamentals
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
    console.error('Usage: node scripts/enrich-curriculum-terms.mjs --dir <course-dir>');
    process.exit(1);
  }
  return path.resolve(dir);
}

function loadGlossary() {
  const data = JSON.parse(fs.readFileSync(path.join(coursesRoot, 'courses.json'), 'utf8'));
  return data.curriculumGlossary ?? {};
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function tipHtml(entry) {
  if (!entry) return '';
  const lines = [];
  if (entry.popularTerms?.length) {
    lines.push(`<strong>行业说法</strong>${escapeHtml(entry.popularTerms.join(' · '))}`);
  }
  if (entry.oneLiner) lines.push(escapeHtml(entry.oneLiner));
  return lines.join('<br>');
}

function termSpan(id, glossary, display) {
  const entry = glossary[id];
  const termId = id.toLowerCase();
  const label = display || entry?.label || id;
  const tip = tipHtml(entry);
  const tipBlock = tip
    ? `<span class="glossary-tip" role="tooltip">${tip}</span>`
    : '';
  return (
    `<span class="term glossary-term" data-term-id="${termId}" tabindex="0">` +
    `<span class="term-label">${escapeHtml(label)}</span>` +
    `<span class="term-code">${escapeHtml(id)}</span>` +
    tipBlock +
    `</span>`
  );
}

const REPLACERS = [
  { re: /\bNS1\b/g, id: 'NS1' },
  { re: /\bNS2\b/g, id: 'NS2' },
  { re: /\bNS3\b/g, id: 'NS3' },
  { re: /\bS5\b/g, id: 'S5' },
  { re: /\bS4\b/g, id: 'S4' },
  { re: /\bS3\b/g, id: 'S3' },
  { re: /\bS2\b/g, id: 'S2' },
  { re: /\bS1\b/g, id: 'S1' },
];

function splitProtected(html) {
  const parts = [];
  const re = /<(pre|script|code|a)\b[\s\S]*?<\/\1>/gi;
  let last = 0;
  let m;
  while ((m = re.exec(html))) {
    if (m.index > last) parts.push({ text: html.slice(last, m.index), safe: true });
    parts.push({ text: m[0], safe: false });
    last = m.index + m[0].length;
  }
  if (last < html.length) parts.push({ text: html.slice(last), safe: true });
  return parts;
}

function alreadyWrapped(text, index) {
  const before = text.slice(Math.max(0, index - 80), index);
  return /class="term[^"]*"\s*>[^<]*$/.test(before) || /data-term-id=/.test(before);
}

function enrichText(text, glossary) {
  let out = text;
  for (const { re, id } of REPLACERS) {
    re.lastIndex = 0;
    let result = '';
    let last = 0;
    let m;
    const src = out;
    out = '';
    while ((m = re.exec(src))) {
      const chunk = src.slice(last, m.index);
      result += chunk;
      if (alreadyWrapped(src, m.index) || /course-ref-slug/.test(chunk.slice(-40))) {
        result += m[0];
      } else {
        result += termSpan(id, glossary);
      }
      last = m.index + m[0].length;
    }
    result += src.slice(last);
    out = result;
  }
  return out;
}

function enrichHtml(html, glossary) {
  return splitProtected(html)
    .map((p) => (p.safe ? enrichText(p.text, glossary) : p.text))
    .join('');
}

function main() {
  const courseDir = parseArgs();
  const glossary = loadGlossary();
  const chaptersDir = path.join(courseDir, 'chapters');
  if (!fs.existsSync(chaptersDir)) {
    console.error('No chapters/ in', courseDir);
    process.exit(1);
  }
  let count = 0;
  for (const file of fs.readdirSync(chaptersDir).filter((f) => f.endsWith('.html'))) {
    const fp = path.join(chaptersDir, file);
    const raw = fs.readFileSync(fp, 'utf8');
    const next = enrichHtml(raw, glossary);
    if (next !== raw) {
      fs.writeFileSync(fp, next);
      count += 1;
      console.log('updated', file);
    }
  }
  console.log(`enrich-curriculum-terms: ${count} file(s)`);
}

main();
