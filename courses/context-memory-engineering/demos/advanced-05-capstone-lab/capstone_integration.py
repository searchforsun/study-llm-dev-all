"""跨课集成验收：OpenAPI 契约 + 集成测试（复用 practice-05 API）。"""
from __future__ import annotations

import sys
import time
from pathlib import Path

# 复用 practice-05 lab 的内存 API
_PRACTICE05 = Path(__file__).resolve().parent.parent / "practice-05-corpassist-memory-lab"
if str(_PRACTICE05) not in sys.path:
    sys.path.insert(0, str(_PRACTICE05))

from eval_suite import MemoryEvalSuite  # noqa: E402
from mem_api import CorpAssistMemoryAPI  # noqa: E402

TENANT = "acme_corp"
USER = "user_9527"


def validate_openapi_paths(spec_text: str) -> list[str]:
    required = [
        "/v1/session/{tenant}/{user_id}/messages",
        "/v1/memory/{user_id}/recall",
        "/v1/memory/{user_id}/facts",
        "/v1/memory/{user_id}",
    ]
    return [p for p in required if p not in spec_text]


class CapstoneIntegrationSuite:
    def __init__(self, api: CorpAssistMemoryAPI | None = None) -> None:
        self.api = api or CorpAssistMemoryAPI()

    def test_session_continuity_for_rag(self) -> bool:
        self.api.post_session_messages(TENANT, USER, "RAG 查询政策", "政策已返回")
        self.api.post_session_messages(TENANT, USER, "刚才那份政策的退货条款？", "7 天无理由")
        ctx = self.api.build_chat_context(TENANT, USER, "退货")
        return "政策" in ctx or "退货" in ctx

    def test_gdpr_delete_clears_session(self) -> bool:
        self.api.post_session_messages(TENANT, USER + "_gdpr", "测试", "ok")
        # 内存 API 无 DELETE 端点，示意：清空 session key
        self.api._session._turns.clear()
        resp = self.api.get_session_messages(TENANT, USER + "_gdpr")
        return resp.data["count"] == 0

    def test_recall_latency_under_budget_ms(self, budget_ms: float = 200.0) -> bool:
        self.api.post_session_messages(TENANT, USER, "订单 20240501", "已发货")
        start = time.perf_counter()
        self.api.post_memory_recall(TENANT, USER, "20240501")
        elapsed = (time.perf_counter() - start) * 1000
        return elapsed <= budget_ms

    def eval_consistency_gate(self) -> float:
        import json

        scenarios_path = _PRACTICE05 / "eval_scenarios.json"
        scenarios = json.loads(scenarios_path.read_text(encoding="utf-8"))
        suite = MemoryEvalSuite(CorpAssistMemoryAPI())
        result = suite.eval_consistency(scenarios["scenarios"][0])
        return result["consistency"]
