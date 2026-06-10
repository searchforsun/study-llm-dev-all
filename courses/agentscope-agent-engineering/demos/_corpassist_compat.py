"""AgentScope 2.0 兼容层 — demo 共用（Credential / Agent / Toolkit / Pipeline shim）。"""
from __future__ import annotations

import asyncio
import os
from contextlib import asynccontextmanager
from typing import Any, Callable, Iterable

from agentscope.agent import Agent, ReActConfig
from agentscope.credential import DashScopeCredential
from agentscope.message import Msg, SystemMsg, UserMsg
from agentscope.model import DashScopeChatModel
from agentscope.tool import FunctionTool, Toolkit, ToolResponse


def is_mock() -> bool:
    return os.environ.get("CORPASSIST_MOCK", "").lower() in ("1", "true", "yes")


class _MockMsg:
    def __init__(self, text: str) -> None:
        self._text = text

    def get_text_content(self) -> str:
        return self._text


def mock_msg(text: str) -> _MockMsg:
    return _MockMsg(text)


class MsgHub:
    """2.0 暂无 agentscope.pipeline — 教学用最小 MsgHub shim。"""

    def __init__(
        self,
        participants: Iterable[Agent],
        announcement: Msg | UserMsg | None = None,
        enable_auto_broadcast: bool = True,
    ) -> None:
        self.participants = list(participants)
        self.announcement = announcement
        self.enable_auto_broadcast = enable_auto_broadcast

    async def __aenter__(self) -> MsgHub:
        if self.announcement:
            for agent in self.participants:
                await agent.observe(self.announcement)
        return self

    async def __aexit__(self, *args: object) -> None:
        return None

    def add(self, agent: Agent) -> None:
        self.participants.append(agent)

    async def broadcast(self, msg: Msg | UserMsg) -> None:
        for agent in self.participants:
            await agent.observe(msg)


async def sequential_pipeline(*, agents: list[Agent], msg: Msg | UserMsg) -> Msg:
    current: Msg | UserMsg = msg
    for agent in agents:
        current = await agent.reply(current)
    return current


async def fanout_pipeline(
    *,
    agents: list[Agent],
    msg: Msg | UserMsg,
    enable_gather: bool = True,
) -> list[Msg]:
    if enable_gather:
        return list(await asyncio.gather(*[agent.reply(msg) for agent in agents]))
    results: list[Msg] = []
    for agent in agents:
        results.append(await agent.reply(msg))
    return results


def dashscope_model(model: str = "qwen-plus", *, stream: bool = False) -> DashScopeChatModel:
    api_key = os.environ.get("DASHSCOPE_API_KEY", "sk-demo")
    cred = DashScopeCredential(api_key=api_key)
    return DashScopeChatModel(credential=cred, model=model, stream=stream)


def build_toolkit(*fns: Callable[..., Any]) -> Toolkit:
    return Toolkit(tools=[FunctionTool(fn) for fn in fns])


def build_agent(
    name: str,
    system_prompt: str,
    *,
    model: DashScopeChatModel | None = None,
    toolkit: Toolkit | None = None,
    max_iters: int = 8,
) -> Agent:
    return Agent(
        name=name,
        system_prompt=system_prompt,
        model=model or dashscope_model(),
        toolkit=toolkit,
        react_config=ReActConfig(max_iters=max_iters),
    )


def user_msg(text: str, name: str = "user") -> UserMsg:
    return UserMsg(name, text)


def system_msg(text: str, name: str = "system") -> SystemMsg:
    return SystemMsg(name, text)
