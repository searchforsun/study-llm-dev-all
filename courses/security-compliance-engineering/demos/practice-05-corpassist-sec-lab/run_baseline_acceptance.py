import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
LABS = {
    "SEC-01": ROOT.parent / "basics-02-content-safety-lab" / "moderation_check.py",
    "SEC-03": ROOT.parent / "basics-03-injection-lab" / "injection_guard_check.py",
    "SEC-04": ROOT.parent / "basics-04-privacy-lab" / "pii_redact_check.py",
    "SEC-05": ROOT.parent / "practice-01-tool-authz-lab" / "verify_tool_authz.py",
    "SEC-06": ROOT.parent / "practice-02-alignment-guard-lab" / "verify_refusal.py",
    "SEC-07": ROOT.parent / "practice-03-audit-lab" / "verify_audit.py",
    "SEC-08": ROOT.parent / "practice-04-red-team-lab" / "run_red_team.py",
}


def run_check(key: str, script: Path, extra=None) -> bool:
    if not script.exists():
        return False
    cmd = [sys.executable, str(script)] + (extra or [])
    return subprocess.run(cmd, cwd=script.parent, capture_output=True).returncode == 0


results = {}
for sec_id, script in LABS.items():
    extra = ["--suite", "cases/l1-smoke.json"] if sec_id == "SEC-08" else None
    results[sec_id] = run_check(sec_id, script, extra)

report = {"all_pass": all(results.values()), "results": results}
(ROOT / "acceptance-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
if report["all_pass"]:
    print("PASS: baseline accepted")
else:
    print("FAIL:", report)
    raise SystemExit(1)
