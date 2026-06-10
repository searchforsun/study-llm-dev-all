import json
import pytest
from pathlib import Path
from capstone_agent import run_capstone

GOLDEN = json.loads(Path("golden_set.json").read_text(encoding="utf-8"))


def judge_success(expected: dict, actual: dict) -> bool:
    if expected.get("must_call_tools"):
        called = set(actual["tools_called"])
        if not set(expected["must_call_tools"]).issubset(called):
            return False
    if "must_contain" in expected:
        return all(k in actual["content"] for k in expected["must_contain"])
    return True


@pytest.mark.parametrize("case", GOLDEN)
def test_capstone_case(case):
    result = run_capstone(case["input"])
    assert judge_success(case["expected"], result)
    assert result["steps"] <= 5


def test_aggregate_metrics():
    results = [run_capstone(c["input"]) for c in GOLDEN]
    success_rate = sum(
        1 for r, c in zip(results, GOLDEN) if judge_success(c["expected"], r)
    ) / len(GOLDEN)
    avg_steps = sum(r["steps"] for r in results) / len(results)
    metrics = {"success_rate": success_rate, "avg_steps": avg_steps}
    Path("metrics.json").write_text(json.dumps(metrics, indent=2), encoding="utf-8")
    assert success_rate >= 0.9, f"success_rate={success_rate}"
    assert avg_steps <= 4.0, f"avg_steps={avg_steps}"
