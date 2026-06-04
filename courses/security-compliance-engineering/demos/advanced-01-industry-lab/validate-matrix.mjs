import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const rows = JSON.parse(readFileSync(join(dir, "matrix/fin-gov-controls.json"), "utf8"));
const required = ["id", "industry", "control", "evidence"];
const gaps = rows.filter((r) => required.some((k) => !r[k] || String(r[k]).trim() === ""));
if (rows.length !== 12 || gaps.length) {
  console.error(`FAIL: expected 12 mapped controls, gaps=${gaps.length}`);
  process.exit(1);
}
console.log("PASS: 12 controls mapped");
