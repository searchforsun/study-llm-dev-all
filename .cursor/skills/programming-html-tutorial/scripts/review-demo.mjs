#!/usr/bin/env node
/**
 * Gate 2b: demo / lab quality (README, acceptance, runnable projects)
 * Usage:
 *   node scripts/review-demo.mjs --dir courses/<slug>
 *   node scripts/review-demo.mjs --dir courses/<slug> --strict
 *   node scripts/review-demo.mjs --dir courses/<slug> --json-summary
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadQualityConfig } from './lib/chapter-quality.mjs';
import { reviewCourseDemos } from './lib/demo-quality.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.join(__dirname, '..');

function parseArgs(argv) {
  const opts = { dir: null, strict: false, jsonSummary: false };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--dir') opts.dir = path.resolve(argv[++i]);
    else if (argv[i] === '--strict') opts.strict = true;
    else if (argv[i] === '--profile') {
      console.warn('Warning: --profile is removed in v3; see chapter-quality.json');
      i++;
    } else if (argv[i] === '--json-summary') opts.jsonSummary = true;
  }
  if (!opts.dir) {
    console.error(
      'Usage: node review-demo.mjs --dir <tutorial-dir> [--strict] [--json-summary]'
    );
    process.exit(1);
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv);
  const coursePath = path.join(opts.dir, 'course.json');
  if (!fs.existsSync(coursePath)) {
    console.error('Missing course.json');
    process.exit(1);
  }
  const course = JSON.parse(fs.readFileSync(coursePath, 'utf8'));
  const config = loadQualityConfig(SKILL_ROOT, {
    strict: opts.strict,
    course,
  });
  const report = reviewCourseDemos({
    courseDir: opts.dir,
    course,
    config,
  });

  console.log(`Review demos: ${opts.dir}${opts.strict ? ' (strict)' : ''}\n`);

  for (const lab of report.labs) {
    const status = lab.passed ? '✓' : '✗';
    const runTag = lab.runnable ? 'runnable' : 'doc';
    console.log(`  ${status} ${lab.labSlug} (${lab.chapterId}, ${runTag})`);
    for (const e of lab.errors) console.log(`      ✗ ${e}`);
    for (const w of lab.warnings) console.log(`      ⚠ ${w}`);
  }

  if (!report.labs.length && !report.errors.length && !report.warnings.length) {
    console.log('  (no demos/ directory or no lab references in chapters)');
  }

  const errN = report.errors.length;
  const warnN = report.warnings.length;
  console.log(`\nSummary: ${errN} error(s), ${warnN} warning(s)`);

  const summary = {
    passed: errN === 0 && !(opts.strict && warnN > 0),
    strict: opts.strict,
    errors: report.errors,
    warnings: report.warnings,
    labs: report.labs,
  };

  if (opts.jsonSummary) {
    console.log(`__GATE2B_JSON__${JSON.stringify(summary)}`);
  }

  if (errN > 0 || (opts.strict && warnN > 0)) {
    process.exit(1);
  }
}

main();
