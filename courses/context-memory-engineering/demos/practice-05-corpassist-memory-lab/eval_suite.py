"""CorpAssist 记忆评测套件（离线示意）。"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from mem_api import CorpAssistMemoryAPI

ROOT = Path(__file__).parent


class MemoryEvalSuite:
    def __init__(self, api: CorpAssistMemoryAPI) -> None:
        self.api = api

    def eval_consistency(self, scenario: dict[str, Any]) -> dict[str, Any]:
        tenant = scenario["tenant"]
        user_id = scenario["user_id"]
        inconsistencies: list[dict[str, Any]] = []
        checks = 0

        for i, turn in enumerate(scenario["turns"]):
            self.api.post_session_messages(
                tenant, user_id, turn["user"], turn["assistant"]
            )
            ctx = self.api.build_chat_context(tenant, user_id, turn["user"])
            for required in turn.get("must_remember", []):
                checks += 1
                if required not in ctx:
                    inconsistencies.append(
                        {"turn": i, "required": required, "missing": True}
                    )

        consistency = 1 - len(inconsistencies) / max(checks, 1)
        return {
            "consistency": consistency,
            "checks": checks,
            "inconsistencies": inconsistencies,
        }

    def run_all(self) -> dict[str, Any]:
        scenarios = json.loads((ROOT / "eval_scenarios.json").read_text(encoding="utf-8"))
        results = []
        for sc in scenarios["scenarios"]:
            api = CorpAssistMemoryAPI()
            result = self.eval_consistency(sc)
            result["scenario_id"] = sc["id"]
            results.append(result)
        avg = sum(r["consistency"] for r in results) / len(results)
        return {"results": results, "avg_consistency": avg}
