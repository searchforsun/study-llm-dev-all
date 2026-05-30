#!/usr/bin/env python3
"""CorpAssist 异常与 structlog JSON 演示（stdout，不联网）。"""
from __future__ import annotations

import json
import sys
import uuid

import structlog


class AppError(Exception):
    code: str = "INTERNAL_ERROR"
    http_status: int = 500

    def __init__(self, message: str, *, details: dict | None = None) -> None:
        super().__init__(message)
        self.details = details or {}


class LlmUpstreamError(AppError):
    code = "LLM_UPSTREAM"
    http_status = 502


def configure_logging(*, json_output: bool = True) -> None:
    processors: list[structlog.types.Processor] = [
        structlog.contextvars.merge_contextvars,
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
    ]
    if json_output:
        processors.append(structlog.processors.JSONRenderer())
    else:
        processors.append(structlog.dev.ConsoleRenderer())
    structlog.configure(processors=processors)


def simulate_chat(*, request_id: str, fail: bool = False) -> None:
    log = structlog.get_logger("corpassist.llm")
    if fail:
        err = LlmUpstreamError("gateway timeout", details={"latency_ms": 30001})
        log.error(
            "llm.chat.failed",
            request_id=request_id,
            code=err.code,
            service="corpassist-python",
            message=str(err),
            latency_ms=30001,
        )
        raise err
    log.info(
        "llm.chat.completed",
        request_id=request_id,
        model="qwen-plus",
        prompt_tokens=120,
        completion_tokens=40,
        latency_ms=842.5,
        service="corpassist-python",
    )


def main() -> None:
    configure_logging(json_output=True)
    request_id = str(uuid.uuid4())
    structlog.contextvars.bind_contextvars(request_id=request_id)
    print("=== 成功路径 ===", file=sys.stderr)
    simulate_chat(request_id=request_id, fail=False)
    print("=== 失败路径 ===", file=sys.stderr)
    try:
        simulate_chat(request_id=request_id, fail=True)
    except LlmUpstreamError:
        print("（已捕获 LlmUpstreamError，practice 章将映射为 HTTP 502）", file=sys.stderr)
    print("\nKibana 示例查询:", file=sys.stderr)
    print(f'  service:corpassist-python AND request_id:"{request_id}"', file=sys.stderr)


if __name__ == "__main__":
    main()
