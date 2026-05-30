#!/usr/bin/env python3
"""CorpAssist-python 脚手架检查（不联网、不调用 API）。"""
from __future__ import annotations

from pathlib import Path

# 相对 demo 目录的期望骨架（教学用简化版）
EXPECTED = [
    "pyproject.toml",
    "src/corpassist/__init__.py",
]

OPTIONAL = [
    "uv.lock",
    ".python-version",
    "README.md",
]


def check_tree(root: Path) -> tuple[list[str], list[str]]:
    ok: list[str] = []
    missing: list[str] = []
    for rel in EXPECTED:
        if (root / rel).is_file():
            ok.append(rel)
        else:
            missing.append(rel)
    for rel in OPTIONAL:
        if (root / rel).exists():
            ok.append(f"{rel} (optional)")
    return ok, missing


def print_maven_mapping() -> None:
    print("\n=== Maven 对照（纸面练习） ===")
    rows = [
        ("pom.xml", "pyproject.toml", "项目元数据与依赖声明"),
        ("mvnw", "uv / .python-version", "统一工具链与 Python 版本"),
        ("target/", ".venv/", "构建产物 / 虚拟环境（通常不入 Git）"),
        ("dependencyManagement", "uv.lock", "版本锁定"),
        ("corpassist-gateway (Spring)", "环境变量 CORPASSIST_LLM_BASE_URL", "模型网关地址"),
    ]
    for maven, py_side, note in rows:
        print(f"  {maven:28s} -> {py_side:32s}  ({note})")


def main() -> None:
    root = Path(__file__).resolve().parent
    print(f"检查目录: {root}")
    ok, missing = check_tree(root)
    if ok:
        print("\n已存在:")
        for item in ok:
            print(f"  [OK] {item}")
    if missing:
        print("\n缺失（请按 README 创建或 uv init）:")
        for item in missing:
            print(f"  [--] {item}")
    else:
        print("\n必需文件齐全。")
    print_maven_mapping()
    print("\n提示: 真实项目请在仓库根执行 uv init --package && uv sync")


if __name__ == "__main__":
    main()
