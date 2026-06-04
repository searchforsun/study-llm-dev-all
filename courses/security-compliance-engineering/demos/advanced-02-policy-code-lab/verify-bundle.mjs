import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(dir, "bundle/manifest.yaml"), "utf8");
if (!/bundle_id:\s*\S+/.test(raw) || !/signature:\s*\S+/.test(raw)) {
  console.error("FAIL: missing bundle_id or signature");
  process.exit(1);
}
console.log("bundle signature ok");
