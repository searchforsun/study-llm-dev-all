#!/usr/bin/env python3
"""CorpAssist typing 模式演示（不联网）。"""
from __future__ import annotations

from typing import Literal, Protocol, TypedDict


class ChatMessage(TypedDict):
    role: Literal["system", "user", "assistant"]
    content: str


class EmbeddingClient(Protocol):
    def embed(self, texts: list[str]) -> list[list[float]]: ...


class MockEmbeddingClient:
    def embed(self, texts: list[str]) -> list[list[float]]:
        return [[0.1, 0.2, 0.3] for _ in texts]


def build_messages(system: str, history: list[ChatMessage]) -> list[ChatMessage]:
    return [{"role": "system", "content": system}, *history]


def truncate_history(messages: list[ChatMessage], max_turns: int) -> list[ChatMessage]:
    if max_turns <= 0:
        return messages[:1]
    system = [m for m in messages if m["role"] == "system"]
    rest = [m for m in messages if m["role"] != "system"]
    return system + rest[-(max_turns * 2) :]


def main() -> None:
    history: list[ChatMessage] = [
        {"role": "user", "content": "年假如何申请？"},
        {"role": "assistant", "content": "请在 OA 提交…"},
    ]
    messages = build_messages("你是 CorpAssist 制度助手。", history)
    trimmed = truncate_history(messages, max_turns=1)
    client: EmbeddingClient = MockEmbeddingClient()
    vectors = client.embed(["制度片段 A"])
    print("消息条数（截断后）:", len(trimmed))
    print("Embedding 维度:", len(vectors[0]))
    print("Java 对照: List<MessageDto> ~ list[ChatMessage]")


if __name__ == "__main__":
    main()
