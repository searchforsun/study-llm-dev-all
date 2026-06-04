#!/usr/bin/env python3
"""Vendor subprocessor gap check for CorpAssist procurement."""
import json
from pathlib import Path

REQUIRED = {"region", "purpose", "data_categories", "dpa_covered"}
ROOT = Path(__file__).resolve().parent


def score_vendor(name: str, subprocessors: list[dict]) -> dict:
    gaps = []
    for sp in subprocessors:
        missing = REQUIRED - set(sp.keys())
        if missing:
            gaps.append({"sub": sp.get("name", "?"), "missing": sorted(missing)})
    return {
        "vendor": name,
        "score": max(0, 100 - 15 * len(gaps)),
        "gaps": gaps,
        "pass": len(gaps) == 0,
    }


def main() -> None:
    data = json.loads((ROOT / "cloud-a-subs.json").read_text(encoding="utf-8"))
    report = score_vendor("cloud-a", data)
    out = ROOT / "assessment-report.json"
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if not report["pass"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
