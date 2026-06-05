"""爆窗诊断器与修复建议（离线示意）。"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class TokenDistribution:
    system: int
    history: int
    retrieval: int
    tool: int

    @property
    def total(self) -> int:
        return self.system + self.history + self.retrieval + self.tool

    def ratio(self, layer: str) -> float:
        total = self.total or 1
        return getattr(self, layer) / total


@dataclass
class DiagnosisReport:
    issues: list[str]
    recommendations: list[str]

    @property
    def root_cause(self) -> str | None:
        return self.issues[0] if self.issues else None


class WindowOverflowDiagnoser:
    HISTORY_SPIKE = 0.35
    SYSTEM_MIN = 0.10

    def diagnose(self, dist: TokenDistribution, window_limit: int) -> DiagnosisReport:
        issues: list[str] = []
        recs: list[str] = []

        if dist.total > window_limit:
            issues.append("window_overflow")
            recs.append("启用滑动窗口或压缩 History 层")

        if dist.ratio("history") > self.HISTORY_SPIKE:
            issues.append("history_spike")
            recs.append("配置滑动窗口 6 轮 + 摘要链")

        if dist.ratio("system") < self.SYSTEM_MIN:
            issues.append("system_prompt_squeeze")
            recs.append("保护 System 预算 ≥10%，禁止 History 挤占")

        if dist.ratio("retrieval") > 0.45:
            issues.append("retrieval_bloat")
            recs.append("检索结果缓存，避免每轮重复注入")

        return DiagnosisReport(issues=issues, recommendations=recs)


def apply_sliding_window_fix(dist: TokenDistribution, keep_ratio: float = 0.4) -> TokenDistribution:
    """示意修复：History 截断至原 40%，System 恢复保护配额。"""
    new_history = int(dist.history * keep_ratio)
    freed = dist.history - new_history
    new_system = dist.system + int(freed * 0.3)
    return TokenDistribution(
        system=new_system,
        history=new_history,
        retrieval=dist.retrieval,
        tool=dist.tool,
    )
