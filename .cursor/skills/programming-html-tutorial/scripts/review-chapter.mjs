#!/usr/bin/env node
/**
 * Gate 2: chapter quality review
 * Usage:
 *   node scripts/review-chapter.mjs --dir courses/my-course
 *   node scripts/review-chapter.mjs --dir courses/my-course --chapter basics-01-foo
 *   node scripts/review-chapter.mjs --dir courses/my-course --strict
 *   node scripts/review-chapter.mjs --dir courses/my-course --json-summary
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  loadQualityConfig,
  getChapterOutlineEntry,
  reviewChapter,
} from './lib/chapter-quality.mjs';

function getChapterPhaseId(course, chapterId) {
  for (const phase of course.outline || []) {
    for (const ch of phase.chapters || []) {
      if (ch.id === chapterId) return phase.phaseId;
    }
  }
  return null;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.join(__dirname, '..');

function parseArgs(argv) {
  const opts = {
    dir: null,
    chapter: null,
    strict: false,
    writeJson: false,
    jsonSummary: false,
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--dir') opts.dir = path.resolve(argv[++i]);
    else if (argv[i] === '--chapter') opts.chapter = argv[++i];
    else if (argv[i] === '--strict') opts.strict = true;
    else if (argv[i] === '--profile') {
      console.warn('Warning: --profile is removed in v3; see chapter-quality.json');
      i++;
    } else if (argv[i] === '--write-json') opts.writeJson = true;
    else if (argv[i] === '--json-summary') opts.jsonSummary = true;
  }
  if (!opts.dir) {
    console.error(
      'Usage: node review-chapter.mjs --dir <tutorial-dir> [--chapter <id>] [--strict] [--write-json] [--json-summary]'
    );
    process.exit(1);
  }
  return opts;
}

function cleanupReviewsDir(reviewsDir, keep) {
  if (keep || !fs.existsSync(reviewsDir)) return;
  for (const name of fs.readdirSync(reviewsDir)) {
    fs.unlinkSync(path.join(reviewsDir, name));
  }
  fs.rmdirSync(reviewsDir);
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

  const quizHtml = fs.existsSync(path.join(opts.dir, 'quiz.partial.html'))
    ? fs.readFileSync(path.join(opts.dir, 'quiz.partial.html'), 'utf8')
    : '';
  const welcomeHtml = fs.existsSync(path.join(opts.dir, 'welcome.partial.html'))
    ? fs.readFileSync(path.join(opts.dir, 'welcome.partial.html'), 'utf8')
    : '';
  const quizAndWelcome = quizHtml + welcomeHtml;

  const chapterIds = [];
  if (opts.chapter) {
    chapterIds.push(opts.chapter);
  } else {
    const chaptersDir = path.join(opts.dir, 'chapters');
    if (fs.existsSync(chaptersDir)) {
      fs.readdirSync(chaptersDir)
        .filter((f) => f.endsWith('.html'))
        .forEach((f) => chapterIds.push(f.replace(/\.html$/, '')));
    }
  }

  if (!chapterIds.length) {
    console.log('No chapters to review.');
    process.exit(0);
  }

  const reviewsDir = path.join(opts.dir, 'reviews');
  if (opts.writeJson) fs.mkdirSync(reviewsDir, { recursive: true });

  let errorCount = 0;
  let warnCount = 0;
  const chapterReports = [];

  console.log(`Review chapters: ${opts.dir}${opts.strict ? ' (strict)' : ''}\n`);

  for (const chapterId of chapterIds.sort()) {
    const chFile = path.join(opts.dir, 'chapters', `${chapterId}.html`);
    if (!fs.existsSync(chFile)) {
      console.log(`  ✗ ${chapterId}: missing chapters/${chapterId}.html`);
      errorCount++;
      chapterReports.push({ chapterId, passed: false, errors: ['missing chapter file'], warnings: [] });
      continue;
    }
    const html = fs.readFileSync(chFile, 'utf8');
    const outlineChapter = getChapterOutlineEntry(course, chapterId);
    const report = reviewChapter({
      html,
      chapterId,
      outlineChapter,
      quizHtml: quizAndWelcome,
      quizzes: course.quizzes,
      config,
      terms: course.terms || {},
      phaseId: getChapterPhaseId(course, chapterId),
      chapterFilePath: chFile,
      course,
    });

    chapterReports.push(report);

    if (opts.writeJson) {
      fs.writeFileSync(
        path.join(reviewsDir, `${chapterId}.json`),
        JSON.stringify(report, null, 2),
        'utf8'
      );
    }

    const status = report.passed ? 'OK' : 'FAIL';
    console.log(`[${status}] ${chapterId}`);
    report.errors.forEach((e) => {
      console.log(`  ✗ ${e}`);
      errorCount++;
    });
    report.warnings.forEach((w) => {
      console.log(`  ⚠ ${w}`);
      warnCount++;
      if (opts.strict) errorCount++;
    });
    report.suggestions.forEach((s) => console.log(`  · ${s}`));
    if (report.errors.length || report.warnings.length || report.suggestions.length) {
      console.log('');
    }
  }

  cleanupReviewsDir(reviewsDir, opts.writeJson);

  const summary = {
    passed: errorCount === 0 && !(opts.strict && warnCount > 0),
    strict: opts.strict,
    errors: chapterReports.flatMap((r) => r.errors.map((e) => `[${r.chapterId}] ${e}`)),
    warnings: chapterReports.flatMap((r) => r.warnings.map((w) => `[${r.chapterId}] ${w}`)),
    chapters: chapterReports,
  };

  if (opts.jsonSummary) {
    console.log(`__GATE2_JSON__${JSON.stringify(summary)}`);
  }

  if (errorCount > 0) {
    console.log(
      `\nReview failed (${errorCount} issue(s)${opts.strict && warnCount ? ', strict mode' : ''})`
    );
    process.exit(1);
  }
  console.log(`\nReview OK (${chapterIds.length} chapter(s)${warnCount ? `, ${warnCount} warning(s)` : ''})`);
}

main();
