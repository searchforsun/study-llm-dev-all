import fs from 'fs';
import path from 'path';
import { checkReferencedPaths } from './quality-policy.mjs';

const RUNNABLE_MARKERS = [
  { file: 'pom.xml', hints: [/mvn\b/i, /mvnw/i] },
  { file: 'package.json', hints: [/npm\b/i, /pnpm\b/i, /yarn\b/i, /npx\b/i] },
  { file: 'pyproject.toml', hints: [/pytest\b/i, /python\b/i, /uv\b/i, /poetry\b/i] },
  { file: 'requirements.txt', hints: [/python\b/i, /pytest\b/i, /pip\b/i] },
  { file: 'go.mod', hints: [/go\s+(run|test|build)/i] },
  { file: 'Cargo.toml', hints: [/cargo\b/i] },
  { file: 'docker-compose.yml', hints: [/docker\s+compose/i, /docker-compose/i] },
  { file: 'docker-compose.yaml', hints: [/docker\s+compose/i, /docker-compose/i] },
];

const ACCEPTANCE_RE = /验收|acceptance|验收命令|验收标准/i;
const RUN_CMD_RE =
  /```[\s\S]*?(mvn|npm|pnpm|yarn|npx|python|pytest|go\s+run|cargo|docker|curl|bash|sh\s)/i;

function walkForRunnableFiles(dir, maxDepth = 4, depth = 0) {
  const found = [];
  if (!fs.existsSync(dir) || depth > maxDepth) return found;
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (name.name.startsWith('.') || name.name === 'node_modules' || name.name === 'target')
      continue;
    const full = path.join(dir, name.name);
    if (name.isFile()) {
      for (const marker of RUNNABLE_MARKERS) {
        if (name.name === marker.file) found.push(marker);
      }
    } else if (name.isDirectory()) {
      found.push(...walkForRunnableFiles(full, maxDepth, depth + 1));
    }
  }
  return found;
}

export function extractDemoLabPaths(html) {
  const paths = new Set();
  const re = /demos\/([a-z0-9-]+-lab)\b/gi;
  let m;
  while ((m = re.exec(html))) paths.add(m[1]);
  return [...paths];
}

export function inferLabDirFromChapterId(chapterId) {
  const m = chapterId.match(/^(basics|practice|advanced)-\d{2}-/);
  if (!m) return null;
  return `${chapterId}-lab`;
}

export function reviewDemoLab({ courseDir, labSlug, chapterId, config = {} }) {
  const errors = [];
  const warnings = [];
  const labDir = path.join(courseDir, 'demos', labSlug);
  const readmePath = path.join(labDir, 'README.md');

  if (!fs.existsSync(labDir)) {
    errors.push(`缺少 demos/${labSlug}/ 目录（章 ${chapterId} 引用）`);
    return { labSlug, chapterId, passed: false, errors, warnings, runnable: false };
  }
  if (!fs.existsSync(readmePath)) {
    errors.push(`demos/${labSlug}/ 缺少 README.md`);
    return { labSlug, chapterId, passed: false, errors, warnings, runnable: false };
  }

  const readme = fs.readFileSync(readmePath, 'utf8');
  const minReadmeLines = config.minReadmeLines ?? 12;
  const readmeLines = readme.split(/\r?\n/).length;
  if (readmeLines < minReadmeLines) {
    warnings.push(
      `demos/${labSlug}/README.md 仅 ${readmeLines} 行（建议 ≥${minReadmeLines}，含目标/步骤/验收）`
    );
  }
  if (!ACCEPTANCE_RE.test(readme)) {
    errors.push(`demos/${labSlug}/README.md 须含「验收」或「验收命令/验收标准」小节`);
  }

  const markers = walkForRunnableFiles(labDir);
  const runnable = markers.length > 0;
  const hasRunCmdInReadme = RUN_CMD_RE.test(readme) || /验收命令/i.test(readme);

  if (runnable) {
    const hintsOk = markers.some((m) => m.hints.some((h) => h.test(readme)));
    if (!hasRunCmdInReadme) {
      errors.push(
        `demos/${labSlug}/ 含可运行工程（${markers.map((m) => m.file).join('、')}），README 须含可复制的验收/运行命令（代码块或「验收命令」）`
      );
    } else if (!hintsOk) {
      warnings.push(
        `demos/${labSlug}/ README 有命令块，建议与工程类型一致（如 ${markers[0].file} → mvn/npm/python 等）`
      );
    }
  } else if (config.requireDocLabAcceptanceCommand !== false) {
    if (!hasRunCmdInReadme && !/[-*]\s*\[[ x]\]/i.test(readme)) {
      warnings.push(
        `demos/${labSlug}/ 为文档型 lab，README 建议含验收命令示例或 checklist（- [ ]）`
      );
    }
  }

  if (config.requireReferencedFiles) {
    const missing = checkReferencedPaths(courseDir, labSlug, readme, path, fs);
    for (const ref of missing) {
      errors.push(`demos/${labSlug}/ README 引用文件不存在：${ref}`);
    }
  }

  return {
    labSlug,
    chapterId,
    passed: errors.length === 0,
    errors,
    warnings,
    runnable,
  };
}

export function reviewCourseDemos({ courseDir, course, config = {} }) {
  const demosCfg = config.demos || {};
  if (demosCfg.enabled === false) {
    return { passed: true, errors: [], warnings: [], labs: [] };
  }

  const errors = [];
  const warnings = [];
  const labs = [];
  const seen = new Set();

  for (const phase of course.outline || []) {
    for (const ch of phase.chapters || []) {
      const chFile = path.join(courseDir, 'chapters', `${ch.id}.html`);
      if (!fs.existsSync(chFile)) continue;
      const html = fs.readFileSync(chFile, 'utf8');
      const labSlugs = new Set(extractDemoLabPaths(html));
      const inferred = inferLabDirFromChapterId(ch.id);
      if (inferred) labSlugs.add(inferred);

      if (demosCfg.requireDemoBoxReference !== false && !/class="demo-box"/.test(html)) {
        warnings.push(`chapters/${ch.id}.html 缺少 .demo-box（建议每章配套 lab）`);
      }

      for (const slug of labSlugs) {
        const key = `${ch.id}:${slug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const report = reviewDemoLab({
          courseDir,
          labSlug: slug,
          chapterId: ch.id,
          config: demosCfg,
        });
        labs.push(report);
        errors.push(...report.errors.map((e) => `[${ch.id}] ${e}`));
        warnings.push(...report.warnings.map((w) => `[${ch.id}] ${w}`));
      }
    }
  }

  const demosRoot = path.join(courseDir, 'demos');
  if (fs.existsSync(demosRoot) && demosCfg.warnOrphanLabs !== false) {
    for (const name of fs.readdirSync(demosRoot, { withFileTypes: true })) {
      if (!name.isDirectory() || !name.name.endsWith('-lab')) continue;
      const referenced = labs.some((l) => l.labSlug === name.name);
      if (!referenced) {
        warnings.push(`demos/${name.name}/ 未被任何章节 demo-box 引用`);
      }
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    labs,
  };
}
