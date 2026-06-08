import fs from 'fs';
import path from 'path';

export function resolveGateReportPath(workspaceRoot, courseDir, config, explicitPath) {
  if (explicitPath) return path.resolve(explicitPath);
  const rel = config?.gateReport?.defaultRelativeDir || 'agent-workspace/course-quality';
  const slug = path.basename(courseDir);
  return path.join(workspaceRoot, rel, slug, 'gate-report.json');
}

export function buildGateReport({
  slug,
  strict,
  gate1 = {},
  gate2 = {},
  gate2b = {},
}) {
  const gate1Ok = gate1.passed !== false;
  const gate2Ok = gate2.passed !== false;
  const gate2bOk = gate2b.passed !== false;
  const errorCount =
    (gate1.errors?.length || 0) + (gate2.errors?.length || 0) + (gate2b.errors?.length || 0);
  const warningCount =
    (gate1.warnings?.length || 0) + (gate2.warnings?.length || 0) + (gate2b.warnings?.length || 0);

  return {
    schemaVersion: '2',
    qualityPolicy: 'chapter-quality.json@v3',
    slug,
    generatedAt: new Date().toISOString(),
    strict,
    passed: gate1Ok && gate2Ok && gate2bOk && errorCount === 0 && !(strict && warningCount > 0),
    summary: {
      errors: errorCount,
      warnings: warningCount,
      chapters: gate2.chapters?.length || 0,
      labs: gate2b.labs?.length || 0,
    },
    gate1,
    gate2,
    gate2b,
  };
}

export function writeGateReport(reportPath, report) {
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  return reportPath;
}
