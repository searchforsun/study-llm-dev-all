/**
 * 组装 GitHub Pages 静态产物（无 Vite/打包步骤）。
 * 输出目录：_site/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const coursesSrc = path.join(repoRoot, 'courses');
const outRoot = path.join(repoRoot, '_site');
const coursesOut = path.join(outRoot, 'courses');

function resetDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

resetDir(outRoot);
fs.cpSync(coursesSrc, coursesOut, { recursive: true });

// 禁用 Jekyll，避免 Actions 扫描仓库内 .md 时 UTF-8 报错
fs.writeFileSync(path.join(outRoot, '.nojekyll'), '');

// 项目 Pages 入口：/ → /courses/
fs.writeFileSync(
  path.join(outRoot, 'index.html'),
  `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=courses/index.html" />
  <title>大模型应用开发 · 课程中心</title>
  <script>location.replace('courses/index.html');</script>
</head>
<body>
  <p>正在进入课程中心… <a href="courses/index.html">点此前往</a></p>
</body>
</html>
`,
  'utf8'
);

console.log('Pages artifact ready:', outRoot);
