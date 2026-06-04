import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const files = ["scripts/injection-five-step.md", "scripts/pii-star.md"];
let ok = 0;
for (const f of files) {
  const p = join(dir, f);
  if (!existsSync(p)) {
    console.error(`FAIL: missing ${f}`);
    continue;
  }
  const text = readFileSync(p, "utf8");
  if (text.length < 400) {
    console.error(`FAIL: ${f} too short (${text.length})`);
    continue;
  }
  ok += 1;
}
if (ok !== 2) process.exit(1);
console.log("PASS: 2 scripts ready");
