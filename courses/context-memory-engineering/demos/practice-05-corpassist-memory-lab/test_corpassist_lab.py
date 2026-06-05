"""CorpAssist 记忆子系统 lab 离线验收。"""
from __future__ import annotations

import json
from pathlib import Path

from eval_suite import MemoryEvalSuite
from mem_api import CorpAssistMemoryAPI

ROOT = Path(__file__).parent
TENANT = "acme_corp"
USER = "user_9527"


def test_session_api_roundtrip():
    api = CorpAssistMemoryAPI()
    empty = api.get_session_messages(TENANT, USER)
    assert empty.data["count"] == 0

    api.post_session_messages(TENANT, USER, "查订单", "好的")
    loaded = api.get_session_messages(TENANT, USER)
    assert loaded.ok
    assert loaded.data["count"] == 2


def test_memory_recall_includes_order_fact():
    api = CorpAssistMemoryAPI()
    api.post_session_messages(
        TENANT, USER, "查订单 20240501", "订单 20240501 已发货"
    )
    recall = api.post_memory_recall(TENANT, USER, "20240501")
    joined = " ".join(recall.data["items"])
    assert "20240501" in joined


def test_eval_consistency_meets_ninety_five_percent():
    scenarios = json.loads((ROOT / "eval_scenarios.json").read_text(encoding="utf-8"))
    api = CorpAssistMemoryAPI()
    suite = MemoryEvalSuite(api)
    result = suite.eval_consistency(scenarios["scenarios"][0])
    assert result["consistency"] >= 0.95


def test_eval_suite_run_all():
    report = MemoryEvalSuite(CorpAssistMemoryAPI()).run_all()
    assert report["avg_consistency"] >= 0.95
    assert len(report["results"]) >= 2


def test_coreference_scenario():
    import json
    from pathlib import Path

    scenarios = json.loads(
        (Path(__file__).parent / "eval_scenarios.json").read_text(encoding="utf-8")
    )
    coref = next(s for s in scenarios["scenarios"] if s["id"] == "coreference-it")
    api = CorpAssistMemoryAPI()
    result = MemoryEvalSuite(api).eval_consistency(coref)
    assert result["consistency"] >= 0.95
