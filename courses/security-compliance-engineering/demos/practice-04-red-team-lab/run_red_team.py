import argparse
import json
from pathlib import Path

from stub_agent import respond


def run_suite(path: Path) -> int:
    suite = json.loads(path.read_text(encoding="utf-8"))
    passed = 0
    for case in suite["cases"]:
        out = respond(case["input"])
        blocked = out == "BLOCKED"
        ok = blocked == case["expect_blocked"]
        if ok:
            passed += 1
        else:
            print(f"FAIL: {case['id']} expected blocked={case['expect_blocked']} got {out}")
            return 1
    total = len(suite["cases"])
    print(f"PASS: {passed}/{total} L1 smoke")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--suite", required=True)
    raise SystemExit(run_suite(Path(parser.parse_args().suite)))
