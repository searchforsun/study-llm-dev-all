"""注入检测器：基于 injection-cases.json 中的正则模式。"""
from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass(frozen=True)
class DetectionResult:
    detected: bool
    pattern_id: str | None
    severity: str
    action: str
    sanitized_text: str


class InjectionDetector:
    def __init__(self, case_defs: list[dict]) -> None:
        self._rules = [
            (item["id"], re.compile(item["pattern"], re.IGNORECASE), item) for item in case_defs
        ]

    def scan(self, text: str) -> DetectionResult:
        for pattern_id, regex, meta in self._rules:
            if regex.search(text):
                action = meta["expectedAction"]
                sanitized = self._apply_action(text, action)
                return DetectionResult(
                    detected=True,
                    pattern_id=pattern_id,
                    severity=meta["severity"],
                    action=action,
                    sanitized_text=sanitized,
                )
        return DetectionResult(
            detected=False,
            pattern_id=None,
            severity="low",
            action="allow",
            sanitized_text=text,
        )

    @staticmethod
    def _apply_action(text: str, action: str) -> str:
        if action == "sanitize":
            clipped = text.strip()[:240]
            return f"[SANITIZED]\n{clipped}\n[/SANITIZED]"
        return "[BLOCKED_INJECTION]"
