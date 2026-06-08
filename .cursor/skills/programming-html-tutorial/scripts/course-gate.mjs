#!/usr/bin/env node
/**
 * Gate 1 + 2 + 2b unified runner (skill-generic).
 * Usage:
 *   node scripts/course-gate.mjs --dir <workspace>/courses/<slug>
 *   node scripts/course-gate.mjs --dir ... --strict
 *   node scripts/course-gate.mjs --dir ... --gate-report [path]
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadQualityConfig } from './lib/chapter-quality.mjs';
import { buildGateReport, resolveGateReportPath, writeGateReport } from './lib/gate-report.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.join(__dirname, '..');

function parseArgs(argv) {
  const opts = {
    dir: null,
    strict: false,
    gateReport: null,
    workspace: null,
  };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--dir') opts.dir = path.resolve(argv[++i]);
    else if (argv[i] === '--profile') {
      console.warn('Warning: --profile is removed in v3; quality policy is unified in chapter-quality.json');
      i++;
    } else if (argv[i] === '--strict') opts.strict = true;
    else if (argv[i] === '--gate-report') {
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        opts.gateReport = path.resolve(argv[++i]);
      } else {
        opts.gateReport = true;
      }
    } else if (argv[i] === '--workspace') opts.workspace = path.resolve(argv[++i]);
  }
  if (!opts.dir) {
    console.error(
      'Usage: node course-gate.mjs --dir <course-dir> [--strict] [--gate-report [path]]'
    );
    process.exit(1);
  }
  if (!opts.workspace) {
    let d = opts.dir;
    while (d && path.basename(d) !== 'courses') {
      const parent = path.dirname(d);
      if (parent === d) break;
      d = parent;
    }
    opts.workspace = d && path.basename(d) === 'courses' ? path.dirname(d) : process.cwd();
  }
  return opts;
}

function runNode(script, args) {
  const r = spawnSync(process.execPath, [path.join(SKILL_ROOT, 'scripts', script), ...args], {
    encoding: 'utf8',
  });
  return {
    ok: r.status === 0,
    status: r.status ?? 1,
    stdout: (r.stdout || '').toString(),
    stderr: (r.stderr || '').toString(),
  };
}

function parseMarker(stdout, marker) {
  const line = stdout.split(/\r?\n/).find((l) => l.startsWith(marker));
  if (!line) return null;
  try {
    return JSON.parse(line.slice(marker.length));
  } catch {
    return null;
  }
}

function summaryToGate2(parsed) {
  if (!parsed) {
    return { passed: true, chapters: [], errors: [], warnings: [] };
  }
  return {
    passed: parsed.passed !== false,
    strict: parsed.strict,
    chapters: parsed.chapters || [],
    errors: parsed.errors || [],
    warnings: parsed.warnings || [],
  };
}

function main() {
  const opts = parseArgs(process.argv);
  const rawConfig = loadQualityConfig(SKILL_ROOT);
  const coursePath = path.join(opts.dir, 'course.json');
  const course = fs.existsSync(coursePath)
    ? JSON.parse(fs.readFileSync(coursePath, 'utf8'))
    : {};
  const slug = course.meta?.slug || path.basename(opts.dir);

  const sharedArgs = ['--dir', opts.dir];
  if (opts.strict) sharedArgs.push('--strict');

  console.log(`Course gate: ${opts.dir}${opts.strict ? ' (strict)' : ''}\n`);

  const gate1 = { passed: true, steps: [], errors: [], warnings: [] };
  let gate2 = { passed: true, chapters: [], errors: [], warnings: [] };
  let gate2b = { passed: true, labs: [], errors: [], warnings: [] };

  const steps = [
    { gate: 'gate1', name: 'assemble', script: 'assemble-index.mjs', args: ['--dir', opts.dir] },
    {
      gate: 'gate1',
      name: 'validate',
      script: 'validate-tutorial.mjs',
      args: [...sharedArgs],
    },
    {
      gate: 'gate2',
      name: 'chapters',
      script: 'review-chapter.mjs',
      args: [...sharedArgs, '--json-summary'],
      marker: '__GATE2_JSON__',
    },
    {
      gate: 'gate2b',
      name: 'demos',
      script: 'review-demo.mjs',
      args: [...sharedArgs, '--json-summary'],
      marker: '__GATE2B_JSON__',
    },
  ];

  let overallFailed = false;

  for (const step of steps) {
    const r = runNode(step.script, step.args);
    const entry = { step: step.name, ok: r.ok, status: r.status };

    if (step.gate === 'gate1') {
      gate1.steps.push(entry);
      if (!r.ok) {
        gate1.passed = false;
        gate1.errors.push(`${step.name} failed (exit ${r.status})`);
        overallFailed = true;
        console.log(`[FAIL] gate1/${step.name}`);
        if (r.stdout) console.log(r.stdout);
        if (r.stderr) console.error(r.stderr);
        break;
      }
      console.log(`[OK] gate1/${step.name}`);
      continue;
    }

    let parsed = null;
    if (step.marker) {
      parsed = parseMarker(r.stdout, step.marker);
    }

    if (step.gate === 'gate2') {
      gate2 = summaryToGate2(parsed);
      if (!r.ok) {
        gate2.passed = false;
        overallFailed = true;
        console.log(`[FAIL] gate2/${step.name}`);
        if (r.stdout) console.log(r.stdout);
        if (r.stderr) console.error(r.stderr);
        break;
      }
      console.log(`[OK] gate2/${step.name}`);
      continue;
    }

    if (step.gate === 'gate2b') {
      gate2b = summaryToGate2(parsed);
      gate2b.labs = parsed?.labs || gate2b.labs;
      if (!r.ok) {
        gate2b.passed = false;
        overallFailed = true;
        console.log(`[FAIL] gate2b/${step.name}`);
        if (r.stdout) console.log(r.stdout);
        if (r.stderr) console.error(r.stderr);
        break;
      }
      console.log(`[OK] gate2b/${step.name}`);
    }
  }

  const report = buildGateReport({
    slug,
    strict: opts.strict,
    gate1,
    gate2,
    gate2b,
  });

  if (opts.gateReport) {
    const reportPath = resolveGateReportPath(
      opts.workspace,
      opts.dir,
      rawConfig,
      typeof opts.gateReport === 'string' ? opts.gateReport : null
    );
    writeGateReport(reportPath, report);
    console.log(`\nGate report: ${reportPath}`);
  }

  if (overallFailed || !report.passed) {
    console.log('\nGate failed. Fix blocking items before /course-review.');
    process.exit(1);
  }
  console.log('\nGate passed (L1–L2b). Proceed with /course-review for Gate 3.');
}

main();
