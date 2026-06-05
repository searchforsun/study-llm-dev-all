#!/usr/bin/env python3
"""双栈会话 lab CLI：Python 写入，可用同一 key 由 Java 侧读取验证。"""
from __future__ import annotations

import argparse
import os
import sys

import redis

from session_store import SessionStore, session_key

DEFAULT_TENANT = "acme_corp"
DEFAULT_USER = "user_9527"


def _client() -> redis.Redis:
    url = os.environ.get("CORPASSIST_REDIS_URL", "redis://localhost:6379/0")
    return redis.Redis.from_url(url, decode_responses=False)


def cmd_write(tenant: str, user_id: str) -> int:
    store = SessionStore(_client())
    dialogs = [
        ("user", "你好，我想查订单 20240501"),
        ("assistant", "好的，订单 20240501 当前已发货。"),
        ("user", "能改收货地址吗？"),
    ]
    for role, content in dialogs:
        store.append_turn(tenant, user_id, role, content)
    print(f"OK: wrote {len(dialogs)} turns to {session_key(tenant, user_id)}")
    return 0


def cmd_read(tenant: str, user_id: str) -> int:
    store = SessionStore(_client())
    turns = store.load_turns(tenant, user_id)
    if not turns:
        print(f"EMPTY: no session at {session_key(tenant, user_id)}", file=sys.stderr)
        return 1
    for i, t in enumerate(turns, 1):
        print(f"{i}. [{t['role']}] {t['content']}")
    if any("20240501" in t["content"] for t in turns):
        print("OK: dual-stack read contains order context")
        return 0
    print("WARN: expected order 20240501 in history", file=sys.stderr)
    return 1


def main() -> int:
    parser = argparse.ArgumentParser(description="CorpAssist dual-stack session lab")
    parser.add_argument("action", choices=["write", "read"])
    parser.add_argument("--tenant", default=DEFAULT_TENANT)
    parser.add_argument("--user", default=DEFAULT_USER)
    args = parser.parse_args()
    if args.action == "write":
        return cmd_write(args.tenant, args.user)
    return cmd_read(args.tenant, args.user)


if __name__ == "__main__":
    raise SystemExit(main())
