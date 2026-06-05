"""成本延迟 lab 离线验收。"""
from __future__ import annotations

from cost_latency import LatencyMonitor, LazyMemoryLoader, SessionFactCache


def test_read_write_amplification_detected():
    mon = LatencyMonitor()
    mon.record("chat", 100)
    for _ in range(4):
        mon.record("mem_recall", 40)
    assert mon.read_write_amplification() == 4.0


def test_cache_hit_rate_above_sixty_percent():
    cache = SessionFactCache(ttl_seconds=300)
    key = "user:9527:prefs"

    def recall():
        return ["偏好邮箱"]

    for _ in range(5):
        cache.get_or_recall(key, recall)
    assert cache.hit_rate >= 0.6


def test_lazy_loader_skips_greeting():
    loader = LazyMemoryLoader()
    assert not loader.should_recall_long_term("你好")
    assert loader.should_recall_long_term("查上次订单")


def test_p95_drops_with_cache():
    mon_cold = LatencyMonitor()
    mon_warm = LatencyMonitor()
    cache = SessionFactCache()

    def slow_recall():
        return ["fact"]

    for _ in range(20):
        mon_cold.record("mem_recall", 120.0)
    for i in range(20):
        cache.get_or_recall("k", slow_recall)
        mon_warm.record("mem_recall", 30.0 if i > 0 else 120.0)

    assert mon_warm.p95_ms("mem_recall") <= mon_cold.p95_ms("mem_recall") * 0.5
