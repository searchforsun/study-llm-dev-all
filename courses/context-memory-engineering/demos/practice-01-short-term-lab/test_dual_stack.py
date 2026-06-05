"""离线验收：fakeredis 模拟双栈读写与 TTL。"""
from __future__ import annotations

import json

import fakeredis

from session_store import (
    SCHEMA_VERSION,
    TTL_SECONDS,
    SessionStore,
    deserialize_payload,
    session_key,
)


def test_python_write_read_roundtrip():
    r = fakeredis.FakeRedis()
    store = SessionStore(r)
    store.append_turn("acme_corp", "user_9527", "user", "查订单 20240501")
    store.append_turn("acme_corp", "user_9527", "assistant", "已发货")
    turns = store.load_turns("acme_corp", "user_9527")
    assert len(turns) == 2
    assert turns[0]["content"] == "查订单 20240501"


def test_java_compatible_json_schema():
    r = fakeredis.FakeRedis()
    store = SessionStore(r)
    store.append_turn("acme_corp", "user_9527", "user", "hello")
    raw = r.get(session_key("acme_corp", "user_9527"))
    data = json.loads(raw)
    assert data["schema"] == SCHEMA_VERSION
    assert isinstance(data["turns"], list)


def test_ttl_set_on_save():
    r = fakeredis.FakeRedis()
    store = SessionStore(r)
    store.append_turn("t1", "u1", "user", "x")
    ttl = r.ttl(session_key("t1", "u1"))
    assert ttl > 0
    assert ttl <= TTL_SECONDS


def test_window_trims_to_max_turns():
    r = fakeredis.FakeRedis()
    store = SessionStore(r)
    for i in range(12):
        store.append_turn("t", "u", "user", f"msg-{i}")
    turns = store.load_turns("t", "u")
    assert len(turns) == 8
    assert turns[-1]["content"] == "msg-11"


def test_deserialize_rejects_bad_schema():
    try:
        deserialize_payload('{"schema":"v0","turns":[]}')
        assert False, "expected ValueError"
    except ValueError:
        pass
