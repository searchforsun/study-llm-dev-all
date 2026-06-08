#!/usr/bin/env node
/**
 * 为 course.json 术语补充/规范化 prompt（须含 Gate 2「误区」等语义片段）
 *
 * Usage:
 *   node scripts/enrich-term-prompts.mjs --dir <course-dir> [--force]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIN_CHARS = 80;
const MISCONCEPTION_SUFFIX = '。最后列出 2 个常见误区或排查项（结合本课示例业务场景）。';

function parseArgs(argv) {
  const opts = { dir: null, force: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--dir') opts.dir = path.resolve(argv[++i]);
    else if (argv[i] === '--force') opts.force = true;
  }
  if (!opts.dir) {
    console.error('Usage: node enrich-term-prompts.mjs --dir <course-dir> [--force]');
    process.exit(1);
  }
  return opts;
}

function ensureMisconceptionClause(prompt) {
  if (prompt.includes('误区')) return prompt;
  const trimmed = prompt.replace(/[。.\s]+$/, '');
  return trimmed + MISCONCEPTION_SUFFIX;
}

function buildFromTemplate(course, label) {
  const tpl =
    course.meta?.selectionPromptTemplate ??
    '我在学习{domain}，请解释一下「{selection}」，并结合本课示例给出说明与常见误区。';
  const domain = course.meta?.domain ?? course.meta?.title ?? '本课程';
  return tpl.replace(/\{domain\}/g, domain).replace(/\{selection\}/g, label);
}

function enrichTermEntry(termId, term, course, force) {
  if (!term || typeof term !== 'object') return false;
  const label = term.label ?? termId;
  let prompt = (term.prompt ?? '').trim();

  if (!prompt || force) {
    prompt = buildFromTemplate(course, label);
  }
  prompt = ensureMisconceptionClause(prompt);

  if (prompt.length < MIN_CHARS) {
    const tip = (term.tip ?? '').replace(/\s+/g, ' ').trim();
    const tipClause = tip ? `简要背景：${tip}。` : '';
    const title = course.meta?.title ?? '本课程';
    prompt = `我在学习《${title}》。请用通俗中文解释「${label}」：它解决什么问题、在工程里通常怎么用。${tipClause}${prompt}`;
    prompt = ensureMisconceptionClause(prompt);
  }

  if (prompt === (term.prompt ?? '').trim()) return false;
  term.prompt = prompt;
  return true;
}

const { dir, force } = parseArgs(process.argv);
const coursePath = path.join(dir, 'course.json');
if (!fs.existsSync(coursePath)) {
  console.error(`not found: ${coursePath}`);
  process.exit(1);
}

const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));
let updated = 0;
let skipped = 0;

for (const [id, term] of Object.entries(course.terms ?? {})) {
  if (enrichTermEntry(id, term, course, force)) updated++;
  else skipped++;
}

fs.writeFileSync(coursePath, JSON.stringify(course, null, 2) + '\n', 'utf8');
console.log(`${path.basename(dir)}: updated ${updated} term prompts, skipped ${skipped} (min ${MIN_CHARS} chars)`);
