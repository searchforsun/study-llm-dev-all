/**
 * 为 courses/<slug>/ 补齐 progress.local.json（已存在则跳过）
 * 用法：node scripts/ensure-course-progress-files.mjs [slug...]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ensureCourseProgressFile } from '../.cursor/skills/programming-html-tutorial/scripts/lib/progress-file.mjs';

const coursesRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'courses');
const only = process.argv.slice(2);

function listSlugs() {
  if (only.length) return only;
  return fs
    .readdirSync(coursesRoot, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(coursesRoot, d.name, 'course.json')))
    .map((d) => d.name);
}

let created = 0;
for (const slug of listSlugs()) {
  const dir = path.join(coursesRoot, slug);
  const result = ensureCourseProgressFile(dir, slug);
  if (result.created) {
    created += 1;
    console.log(`Created ${result.path}`);
  }
}
console.log(`Done. ${created} new file(s).`);
