"""跨课集成 lab 离线验收。"""
from __future__ import annotations

from pathlib import Path

from capstone_integration import CapstoneIntegrationSuite, validate_openapi_paths

ROOT = Path(__file__).parent


def test_openapi_covers_required_paths():
    spec = (ROOT / "openapi.yaml").read_text(encoding="utf-8")
    missing = validate_openapi_paths(spec)
    assert missing == []


def test_rag_session_continuity():
    assert CapstoneIntegrationSuite().test_session_continuity_for_rag()


def test_gdpr_delete_flow():
    assert CapstoneIntegrationSuite().test_gdpr_delete_clears_session()


def test_recall_latency_budget():
    assert CapstoneIntegrationSuite().test_recall_latency_under_budget_ms(200.0)


def test_consistency_meets_ninety_five_percent():
    score = CapstoneIntegrationSuite().eval_consistency_gate()
    assert score >= 0.95


def test_handoff_doc_exists():
    text = (ROOT / "handoff.md").read_text(encoding="utf-8")
    assert "Redis" in text
    assert "/v1/session" in text
