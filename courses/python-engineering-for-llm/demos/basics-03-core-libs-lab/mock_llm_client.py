#!/usr/bin/env python3
"""CorpAssist Mock LLM 客户端（不调用真实 API）。"""
from __future__ import annotations

import httpx
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    model: str
    messages: list[dict[str, str]]
    temperature: float = 0.3
    max_tokens: int = Field(default=512, ge=1)


class ChatChoice(BaseModel):
    index: int
    message: dict[str, str]
    finish_reason: str | None = None


class ChatResponse(BaseModel):
    id: str
    choices: list[ChatChoice]
    usage: dict[str, int] | None = None


def mock_transport(request: httpx.Request) -> httpx.Response:
    if not request.url.path.endswith("/chat/completions"):
        return httpx.Response(404, json={"error": "not found"})
    body = {
        "id": "mock-corpassist-1",
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": "（mock）根据《员工手册》第 3.2 节，年假需提前 5 个工作日申请。",
                },
                "finish_reason": "stop",
            }
        ],
        "usage": {"prompt_tokens": 156, "completion_tokens": 42, "total_tokens": 198},
    }
    return httpx.Response(200, json=body)


def chat_completion(client: httpx.Client, base_url: str, api_key: str, req: ChatRequest) -> ChatResponse:
    url = f"{base_url.rstrip('/')}/chat/completions"
    headers = {"Authorization": f"Bearer {api_key}"}
    resp = client.post(url, json=req.model_dump(), headers=headers, timeout=30.0)
    resp.raise_for_status()
    return ChatResponse.model_validate(resp.json())


def main() -> None:
    req = ChatRequest(
        model="qwen-plus",
        messages=[
            {"role": "system", "content": "CorpAssist S1 制度助手"},
            {"role": "user", "content": "年假怎么请？"},
        ],
        temperature=0.1,
    )
    transport = httpx.MockTransport(mock_transport)
    with httpx.Client(transport=transport, base_url="http://mock-gateway/v1") as client:
        result = chat_completion(client, "http://mock-gateway/v1", "demo-key", req)
    print("回复:", result.choices[0].message["content"])
    print("usage:", result.usage)


if __name__ == "__main__":
    main()
