"""爆窗排障 lab 离线验收。"""
from __future__ import annotations

import json
from pathlib import Path

from overflow_diagnoser import (
    TokenDistribution,
    WindowOverflowDiagnoser,
    apply_sliding_window_fix,
)

ROOT = Path(__file__).parent


def _load_case() -> dict:
    return json.loads((ROOT / "overflow_case.json").read_text(encoding="utf-8"))


def test_diagnoser_finds_overflow_root_causes():
    case = _load_case()
    dist = TokenDistribution(**case["overflow_turn20"])
    report = WindowOverflowDiagnoser().diagnose(dist, case["window_limit"])
    assert "history_spike" in report.issues
    assert "system_prompt_squeeze" in report.issues
    assert report.root_cause is not None


def test_healthy_distribution_has_fewer_issues():
    case = _load_case()
    healthy = TokenDistribution(**case["healthy_turn5"])
    overflow = TokenDistribution(**case["overflow_turn20"])
    d = WindowOverflowDiagnoser()
    assert len(d.diagnose(healthy, case["window_limit"]).issues) < len(
        d.diagnose(overflow, case["window_limit"]).issues
    )


def test_fix_restores_history_ratio():
    case = _load_case()
    before = TokenDistribution(**case["overflow_turn20"])
    after = apply_sliding_window_fix(before)
    assert after.ratio("history") < before.ratio("history")
    assert after.ratio("system") >= before.ratio("system")


def test_alert_rules_file_exists():
    rules = (ROOT / "alert_rules.yaml").read_text(encoding="utf-8")
    assert "history_spike" in rules
    assert "window_overflow" in rules
