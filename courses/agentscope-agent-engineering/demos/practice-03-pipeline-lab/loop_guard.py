"""LoopGuard — 重复 tool+args 检测."""
from __future__ import annotations

import json
from collections import deque


class LoopGuard:
    def __init__(self, window: int = 3) -> None:
        self.recent: deque = deque(maxlen=window)

    def check(self, tool_name: str, args: dict) -> bool:
        sig = (tool_name, json.dumps(args, sort_keys=True))
        self.recent.append(sig)
        if len(self.recent) == self.recent.maxlen and len(set(self.recent)) == 1:
            return True
        return False


if __name__ == "__main__":
    guard = LoopGuard(window=3)
    args = {"ticket": "TK-001"}
    for _ in range(3):
        if guard.check("create_ticket", args):
            print("LOOP_DETECTED")
            break
