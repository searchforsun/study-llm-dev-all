"""记忆成本与延迟：缓存、懒加载、读写放大统计（离线示意）。"""
from __future__ import annotations

import re
import time
from dataclasses import dataclass, field
from typing import Callable


@dataclass
class LatencySample:
    operation: str
    latency_ms: float


class LatencyMonitor:
    def __init__(self) -> None:
        self.samples: list[LatencySample] = []

    def record(self, operation: str, latency_ms: float) -> None:
        self.samples.append(LatencySample(operation, latency_ms))

    def read_write_amplification(self) -> float:
        """一次 chat 请求触发的后端操作倍数。"""
        ops = [s for s in self.samples if s.operation.startswith("mem_")]
        chats = [s for s in self.samples if s.operation == "chat"]
        if not chats:
            return float(len(ops) or 1)
        return len(ops) / len(chats)

    def p95_ms(self, operation: str | None = None) -> float:
        latencies = [
            s.latency_ms
            for s in self.samples
            if operation is None or s.operation == operation
        ]
        if not latencies:
            return 0.0
        latencies.sort()
        idx = max(0, int(len(latencies) * 0.95) - 1)
        return latencies[idx]


class SessionFactCache:
    def __init__(self, ttl_seconds: float = 300.0) -> None:
        self._store: dict[str, tuple[float, list[str]]] = {}
        self.ttl = ttl_seconds
        self.hits = 0
        self.misses = 0

    def get_or_recall(self, key: str, recall_fn: Callable[[], list[str]]) -> list[str]:
        now = time.time()
        if key in self._store:
            ts, facts = self._store[key]
            if now - ts <= self.ttl:
                self.hits += 1
                return facts
        self.misses += 1
        facts = recall_fn()
        self._store[key] = (now, facts)
        return facts

    @property
    def hit_rate(self) -> float:
        total = self.hits + self.misses
        return self.hits / total if total else 0.0


_GREETING = re.compile(r"^(你好|hi|hello|嗨)\b", re.IGNORECASE)


class LazyMemoryLoader:
    def should_recall_long_term(self, query: str) -> bool:
        return not bool(_GREETING.match(query.strip()))
