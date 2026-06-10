#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

node <<'NODE'
const fs = require("fs");
const golden = JSON.parse(fs.readFileSync("golden_set.json", "utf8"));
const total = golden.length;
let passed = 0;
let stepsSum = 0;
for (const c of golden) {
  const mockSteps = Math.min(c.max_steps, 3.2);
  stepsSum += mockSteps;
  passed++;
}
const successRate = Math.round((passed / total) * 100) / 100;
const avgSteps = Math.round((stepsSum / total) * 10) / 10;
const status = successRate >= 0.9 && avgSteps <= 4.0 ? "PASS" : "FAIL";
const metrics = {
  evaluated_at: new Date().toISOString(),
  golden_set_version: "1.0",
  total_cases: total,
  passed,
  success_rate: successRate,
  avg_steps: avgSteps,
  p95_latency_ms: 12400,
  gates: { success_rate_min: 0.9, avg_steps_max: 4.0, p95_max_ms: 15000 },
  status,
  note: "mock eval — replace with live Agent run in production Capstone",
};
fs.writeFileSync("metrics.json", JSON.stringify(metrics, null, 2));
console.log(`Eval capstone golden set: pass rate ${Math.round(successRate * 100)}%, avg steps ${avgSteps} -> metrics.json (${status})`);
if (status !== "PASS") process.exit(1);
NODE
