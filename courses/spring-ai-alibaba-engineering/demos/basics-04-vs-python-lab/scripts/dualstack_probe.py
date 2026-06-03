#!/usr/bin/env python3
"""对照 Java workbench 的 /api/dualstack/config，打印 Python 侧应对齐的环境变量。"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request

JAVA_URL = os.environ.get("CORPASSIST_JAVA_CONFIG_URL", "http://localhost:8080/api/dualstack/config")


def main() -> int:
    try:
        with urllib.request.urlopen(JAVA_URL, timeout=5) as resp:
            java_cfg = json.loads(resp.read().decode())
    except urllib.error.URLError as e:
        print(f"[warn] 无法访问 Java 配置端点 {JAVA_URL}: {e}", file=sys.stderr)
        java_cfg = {}

    python_cfg = {
        "stack": "dashscope-sdk",
        "model": os.environ.get("CORPASSIST_AGENT_MODEL", "qwen-plus"),
        "api_key_env": "AI_DASHSCOPE_API_KEY",
        "api_key_set": bool(os.environ.get("AI_DASHSCOPE_API_KEY")),
    }
    print("=== Java (Spring AI Alibaba) ===")
    print(json.dumps(java_cfg, ensure_ascii=False, indent=2))
    print("\n=== Python (dashscope-sdk) ===")
    print(json.dumps(python_cfg, ensure_ascii=False, indent=2))
    if java_cfg and python_cfg.get("model") != java_cfg.get("javaModel"):
        print("\n[check] 模型名不一致，请对齐 CORPASSIST_AGENT_MODEL", file=sys.stderr)
        return 1
    print("\n[ok] 双栈配置探测完成")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
