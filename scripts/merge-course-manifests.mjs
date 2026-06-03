/**
 * 合并各阶段 manifest-*.json 与 quiz-partial/*.html 到课程根目录
 * 用法：node scripts/merge-course-manifests.mjs <slug>
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const coursesRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'courses');
const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node scripts/merge-course-manifests.mjs <slug>');
  process.exit(1);
}

const courseDir = path.join(coursesRoot, slug);
const coursePath = path.join(courseDir, 'course.json');
const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));

const phases = ['basics', 'practice', 'advanced'];
for (const phase of phases) {
  const manifestPath = path.join(courseDir, `manifest-${phase}.json`);
  if (!fs.existsSync(manifestPath)) {
    console.warn(`skip missing ${manifestPath}`);
    continue;
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const [id, mt] of Object.entries(manifest.terms ?? {})) {
    const prev = course.terms[id] ?? {};
    course.terms[id] = {
      ...prev,
      ...mt,
      prompt: mt.prompt?.trim() ? mt.prompt : prev.prompt,
    };
  }
  Object.assign(course.quizzes, manifest.quizzes ?? {});
}

fs.writeFileSync(coursePath, JSON.stringify(course, null, 2) + '\n', 'utf8');

const quizParts = phases
  .map((p) => path.join(courseDir, 'quiz-partial', `${p}.html`))
  .filter((f) => fs.existsSync(f))
  .map((f) => fs.readFileSync(f, 'utf8').trim());

fs.writeFileSync(
  path.join(courseDir, 'quiz.partial.html'),
  quizParts.join('\n\n') + (quizParts.length ? '\n' : ''),
  'utf8'
);

console.log(
  `Merged: ${Object.keys(course.terms).length} terms, ${Object.keys(course.quizzes).length} quizzes, ${quizParts.length} quiz partials`
);
