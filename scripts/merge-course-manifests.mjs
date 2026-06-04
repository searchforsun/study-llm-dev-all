/**
 * 合并各阶段 manifest-*.json 到 course.json（terms、quizzes）
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

console.log(
  `Merged: ${Object.keys(course.terms).length} terms, ${Object.keys(course.quizzes).length} quizzes`
);
