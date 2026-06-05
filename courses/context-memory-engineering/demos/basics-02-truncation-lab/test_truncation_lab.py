"""截断 lab 离线验收。"""
from __future__ import annotations

import json
from pathlib import Path

from truncation import (
    FifoTruncation,
    SlidingWindow,
    assemble_context,
    detect_constraint_loss,
    turns_token_count,
)

ROOT = Path(__file__).parent


def _load_dialog() -> dict:
    return json.loads((ROOT / "conversation-10turn.json").read_text(encoding="utf-8"))


def test_fifo_respects_token_budget():
    data = _load_dialog()
    turns = data["turns"]
    budget = turns_token_count(turns) // 2
    result = FifoTruncation(max_tokens=budget).trim(turns)
    assert result.token_count <= budget
    assert len(result.kept_turns) < len(turns)
    assert len(result.removed_turns) > 0


def test_sliding_window_keeps_recent_five_turns():
    data = _load_dialog()
    turns = data["turns"]
    result = SlidingWindow(window_turns=5).trim(turns)
    assert len(result.kept_turns) == 5
    assert result.summary is not None
    assert "20240501" in result.summary or "订单" in result.summary


def test_constraints_pinned_in_assembled_context():
    data = _load_dialog()
    constraints = data["constraints"]
    result = SlidingWindow(window_turns=5).trim(data["turns"])
    ctx = assemble_context(constraints, result)
    for c in constraints:
        assert c in ctx


def test_constraint_loss_detection_flags_removed_only_keywords():
    constraints = ["请始终使用中文回复", "会员等级：金牌"]
    removed = [{"role": "user", "content": "我的会员等级是金牌客户。"}]
    lost = detect_constraint_loss(constraints, removed)
    assert "会员等级：金牌" in lost
