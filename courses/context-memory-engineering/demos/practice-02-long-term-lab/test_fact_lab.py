"""长期记忆 lab 离线验收。"""
from __future__ import annotations

import json
from datetime import datetime, timedelta, timezone
from pathlib import Path

from fact_extract import extract_facts_from_dialog
from fact_store import InMemoryFactStore

ROOT = Path(__file__).parent


def _load_json(name: str) -> dict | list:
    return json.loads((ROOT / name).read_text(encoding="utf-8"))


def test_extraction_accuracy_on_eval_set():
    dialog = _load_json("sample_dialog.json")
    expected = _load_json("eval_facts.json")
    extracted = extract_facts_from_dialog(dialog)
    texts = " ".join(f["fact_text"] for f in extracted)
    hit = sum(1 for e in expected if e["match"] in texts)
    accuracy = hit / len(expected)
    assert accuracy >= 0.8, f"accuracy {accuracy:.0%} < 80%"


def test_recall_scoped_by_user():
    store = InMemoryFactStore()
    store.upsert(
        {"tenant_id": "acme_corp", "user_id": "user_a", "fact_text": "偏好邮箱", "fact_type": "preference"}
    )
    store.upsert(
        {"tenant_id": "acme_corp", "user_id": "user_b", "fact_text": "偏好邮箱", "fact_type": "preference"}
    )
    assert store.recall("acme_corp", "user_a", "邮箱") == ["偏好邮箱"]
    assert store.recall("acme_corp", "user_b", "邮箱") == ["偏好邮箱"]
    assert store.recall("acme_corp", "user_c", "邮箱") == []


def test_gdpr_delete_removes_all_user_facts():
    store = InMemoryFactStore()
    for i in range(3):
        store.upsert(
            {
                "tenant_id": "acme_corp",
                "user_id": "user_9527",
                "fact_text": f"fact-{i}",
                "fact_type": "preference",
            }
        )
    removed = store.gdpr_delete("acme_corp", "user_9527")
    assert removed == 3
    assert store.recall("acme_corp", "user_9527", "fact") == []


def test_ttl_expiry_purges_facts():
    store = InMemoryFactStore()
    store.upsert(
        {
            "tenant_id": "acme_corp",
            "user_id": "user_9527",
            "fact_text": "临时偏好",
            "fact_type": "preference",
        },
        ttl=timedelta(seconds=1),
    )
    # force expiry
    store._facts[0].expires_at = datetime.now(timezone.utc) - timedelta(seconds=1)
    purged = store.purge_expired()
    assert purged == 1
    assert store.recall("acme_corp", "user_9527", "临时") == []
