#!/usr/bin/env python3
"""Generate ALL chapter HTML files for 3 Python scenario courses.
scenario-py-agent-automation (S3), scenario-py-code-assistant (S4), scenario-py-content-studio (S5)
Each chapter: 400-500 lines, standalone <section> fragment.
"""
import os, json, textwrap, sys

OUTPUT = r"D:\MyWorkStation\Java\program\study-llm-dev-all\courses"

CHAPTER_BASE = {
    "meta": '<p class="chapter-meta">约 <strong>25</strong> 分钟 · 阶段：<strong>{phase}</strong> · 场景：<strong>{scene}</strong></p>',
}

def make_chapter(cid, title, phase, scene, sections_content, conclusions, checklist, cheat_terms, interview_qas,
                 official_links, practice_steps, practice_judgments, demo_info, next_ch=None, next_title=None,
                 additional_links=None):
    """Assemble a full chapter HTML."""
    lines = []
    lines.append(f'<section id="ch-{cid}" class="chapter" data-chapter="{cid}">')
    lines.append('  <header class="chapter-header">')
    lines.append(f'    <h2><span class="chapter-done-badge">已完成</span>{title}</h2>')
    lines.append(f'    <button type="button" class="btn-mark-done" data-chapter="{cid}" aria-label="标记本章完成">标记完成</button>')
    lines.append('  </header>')
    lines.append('')
    lines.append('  <div class="concept">')
    # Intro
    lines.append('    <div class="chapter-intro content-section">')
    lines.append(f'      {CHAPTER_BASE["meta"].format(phase=phase, scene=scene)}')
    lines.append(f'      <div class="notice notice-why-learn"><h4>为什么学这章</h4><p>{sections_content["why"]}</p></div>')
    lines.append(f'      <div class="notice notice-outcome"><h4>学完后能做什么</h4><p>{sections_content["outcome"]}</p></div>')
    lines.append(f'      <div class="notice"><h4>本章要点速记</h4><p>{sections_content["keypoints"]}</p></div>')
    lines.append('    </div>')
    lines.append('')
    # Content sections
    for sec in sections_content["body"]:
        lines.append(sec)
    # Conclusions
    lines.append('    <div class="section-block chapter-conclusions-block notice">')
    lines.append('      <h3>本章结论</h3>')
    lines.append('      <ul class="chapter-conclusions-list">')
    for c in conclusions:
        lines.append(f'        <li>{c}</li>')
    lines.append('      </ul>')
    lines.append('    </div>')
    lines.append('')
    # Review
    lines.append('    <div class="section-block learn-review-block">')
    lines.append('      <h3>复习与自检</h3>')
    lines.append('      <div class="learn-checklist">')
    lines.append('        <h4>过关清单</h4>')
    lines.append('        <ul>')
    for i, item in enumerate(checklist):
        lines.append(f'          <li><label><input type="checkbox" data-check-id="{cid}-{i+1}"> {item}</label></li>')
    lines.append('        </ul>')
    lines.append('      </div>')
    lines.append('      <div class="learn-cheat-sheet">')
    lines.append('        <h4>概念速查</h4>')
    lines.append('        <table class="outline-table">')
    lines.append('          <thead><tr><th>术语</th><th>一句话</th></tr></thead>')
    lines.append('          <tbody>')
    for term, defn in cheat_terms:
        lines.append(f'            <tr><td><strong>{term}</strong></td><td>{defn}</td></tr>')
    lines.append('          </tbody>')
    lines.append('        </table>')
    lines.append('      </div>')
    lines.append('      <div class="learn-interview">')
    lines.append('        <h4>面试可能问</h4>')
    for q, a in interview_qas:
        lines.append(f'        <details><summary>{q}</summary><p>{a}</p></details>')
    lines.append('      </div>')
    lines.append('    </div>')
    lines.append('  </div>')
    lines.append('')
    # Official links
    lines.append('  <div class="official-links content-section">')
    lines.append('    <h3>官方参考</h3>')
    lines.append('    <ul>')
    for href, label, desc in official_links:
        lines.append(f'      <li><a href="{href}" target="_blank" rel="noopener">{label}</a> — {desc}</li>')
    lines.append('    </ul>')
    lines.append('  </div>')
    lines.append('')
    # Practice
    lines.append('  <div class="chapter-practice">')
    lines.append('    <h3>动手练习</h3>')
    lines.append('    <div class="steps-operate">')
    lines.append('      <ol>')
    for step in practice_steps:
        lines.append(f'        <li>{step}</li>')
    lines.append('      </ol>')
    lines.append('    </div>')
    lines.append('    <div class="steps-judgment-list">')
    for scenario, answer in practice_judgments:
        lines.append(f'      <details><summary>{scenario}</summary><p>{answer}</p></details>')
    lines.append('    </div>')
    lines.append(f'    <div class="demo-box"><h4>配套实验室</h4><p>见 demos/{cid}-lab/</p>')
    lines.append('      <ul class="demo-acceptance">')
    for item in demo_info:
        lines.append(f'        <li>{item}</li>')
    lines.append('      </ul>')
    lines.append('    </div>')
    lines.append('  </div>')
    lines.append('')
    # Resources
    lines.append('  <div class="resources content-section">')
    lines.append('    <h3>延伸阅读</h3>')
    lines.append('    <ul>')
    if next_ch and next_title:
        lines.append(f'      <li>下一章：<a href="#ch-{next_ch}">{next_title}</a></li>')
    if additional_links:
        for href, label, desc in additional_links:
            lines.append(f'      <li><a href="{href}" target="_blank" rel="noopener">{label}</a> — {desc}</li>')
    lines.append('    </ul>')
    lines.append('  </div>')
    lines.append('</section>')
    return '\n'.join(lines)


def code_block(lang, code):
    """Generate a code block HTML."""
    return textwrap.dedent(f'''\
    <div class="code-block">
      <div class="code-toolbar">
        <span class="lang-tag">{lang}</span>
        <button type="button" class="btn-copy" aria-label="复制代码">复制</button>
      </div>
      <pre><code class="language-{lang}">{code.strip()}</code></pre>
    </div>''')


def mermaid(diagram_type, content, caption=""):
    """Generate a Mermaid diagram HTML block."""
    return textwrap.dedent(f'''\
    <div class="mermaid-wrap">
      <h5>{diagram_type}</h5>
      <pre class="mermaid">{content.strip()}</pre>
      {('<p class="diagram-caption">' + caption + '</p>') if caption else ''}
    </div>''')


def learn_compare(bad_items, good_items):
    """Generate learn-compare block."""
    bad = ''.join(f'<li>{b}</li>' for b in bad_items)
    good = ''.join(f'<li>{g}</li>' for g in good_items)
    return textwrap.dedent(f'''\
    <div class="learn-compare">
      <div class="learn-compare-col learn-compare-bad">
        <span class="learn-compare-heading">不推荐</span>
        <ul>{bad}</ul>
      </div>
      <div class="learn-compare-col learn-compare-good">
        <span class="learn-compare-heading">推荐</span>
        <ul>{good}</ul>
      </div>
    </div>''')


def micro_check(summary, answer):
    return f'<details class="learn-micro-check"><summary>{summary}</summary><p>{answer}</p></details>'


def section_block(title, content):
    return f'<div class="section-block"><h3>{title}</h3>\n{content}\n</div>'


def table(headers, rows):
    h = ''.join(f'<th>{x}</th>' for x in headers)
    r = ''
    for row in rows:
        r += '<tr>' + ''.join(f'<td>{x}</td>' for x in row) + '</tr>'
    return f'<table class="outline-table"><thead><tr>{h}</tr></thead><tbody>{r}</tbody></table>'


def notice_box(title, content):
    return f'<div class="notice"><h4>{title}</h4><p>{content}</p></div>'


def learn_scenario(title, description):
    return f'<aside class="learn-scenario" aria-label="业务情境"><span class="learn-scenario-title">{title}</span>{description}</aside>'


# ======================================================================
# COURSE 1: scenario-py-agent-automation (S3)
# ======================================================================

def gen_course1_chapters():
    base = os.path.join(OUTPUT, "scenario-py-agent-automation", "chapters")
    os.makedirs(base, exist_ok=True)

    chapters = []

    # --- basics-01-office-automation ---
    cid = "basics-01-office-automation"
    body = [
        section_block("可自动化的办公任务分类", f"""
<p>办公自动化在 CorpAssist 中对应 <strong>S3 Agent 任务自动化</strong> 模块。企业办公任务按复杂度可分成四类：</p>
{table(["类别", "示例", "自动化难度", "CorpAssist 方案"],
  [["信息查询", "查制度、查流程、查审批进度", "低", "RAG + 简单工具"],
   ["数据录入", "填表单、写周报、录入工单", "中", "结构化输出 + API"],
   ["流程审批", "请假、报销、合同审批", "中高", "Multi-Agent + 人工审批"],
   ["跨系统编排", "ERP 查库存 → 发通知 → 创建任务", "高", "Plan-and-Execute + 多工具"]])}
{learn_scenario("CorpAssist 办公场景", "某员工需要请假：Agent 自动查询假期余额 → 填写请假单 → 提交审批 → 通知主管。全程 3 分钟，传统流程需要 15 分钟。")}
<p>CorpAssist S3 模块覆盖以上全部场景，核心架构为 <strong>LangGraph StateGraph + MCP 工具协议</strong>。</p>
"""),
        section_block("人机协同的边界", f"""
<p>并非所有任务都适合全自动。CorpAssist 遵循 <strong>Human-in-the-Loop</strong> 原则：</p>
{table(["决策类型", "自动执行", "人工审批", "示例"],
  [["信息检索类", "是", "否", "查余额/查日程"],
   ["数据创建类", "是（草稿）", "是（确认）", "发邮件/创建任务"],
   ["资金操作类", "否", "必审", "报销/付款"],
   ["权限变更类", "否", "必审", "角色授权"]])}
{micro_check("思考：为什么资金操作类不能自动执行？", "企业合规要求：资金操作必须有人工复核环节，防止 LLM 幻觉或 Prompt 注入导致误操作。CorpAssist 通过 LangGraph interrupt 机制实现审批节点。")}
{code_block("python", '''# CorpAssist 自动化边界配置 (config.yaml)
automation:
  risk_levels:
    low:   # 信息查询 - 全自动
      auto_execute: true
      require_approval: false
    medium:  # 数据创建 - 需确认
      auto_execute: true
      require_approval: true
      approval_timeout: 300
    high:  # 资金操作 - 强制审批
      auto_execute: false
      require_approval: true
      approval_role: "finance_manager"''')}
"""),
        section_block("CorpAssist Agent 模块全景", f"""
<p>S3 模块由三大子系统构成：</p>
{mermaid("S3 Agent 模块架构", '''flowchart TB
    subgraph User["用户入口"]
        Portal[Web/Mobile Portal]
        IM[IM 机器人]
    end
    subgraph Orchestrator["编排层 · LangGraph"]
        SG[StateGraph]
        CP[Checkpointer]
        Interrupt[中断节点]
    end
    subgraph Tools["工具层 · MCP"]
        Cal[日历工具]
        Mail[邮件工具]
        ERP[ERP 查询]
        Ticket[工单系统]
    end
    subgraph Memory["记忆层"]
        Short[短期记忆 · Redis]
        Long[长期记忆 · Vector Store]
    end
    Portal --> SG
    IM --> SG
    SG --> CP
    SG --> Interrupt
    SG --> Cal
    SG --> Mail
    SG --> ERP
    SG --> Ticket
    CP --> Short
    Short --> Long''', "S3 模块：LangGraph 编排 + MCP 工具 + 双级记忆")}
{code_block("python", '''# CorpAssist S3 模块初始化 (Python 3.12 + FastAPI)
from langgraph.graph import StateGraph, State
from typing import TypedDict, Annotated
from langgraph.checkpoint.memory import MemorySaver

class AgentState(TypedDict):
    messages: Annotated[list, "对话历史"]
    next_step: str
    tool_calls: list
    approval_needed: bool

builder = StateGraph(AgentState)
# 节点注册
builder.add_node("reason", reason_node)
builder.add_node("tool_execute", tool_execute_node)
builder.add_node("human_approval", approval_node)
builder.add_conditional_edges("reason", router, {
    "tool": "tool_execute",
    "approve": "human_approval",
    "end": "__end__"
})
graph = builder.compile(checkpointer=MemorySaver())''')}
"""),
        section_block("ROI 量化：自动化 vs 人工", f"""
<p>CorpAssist 在某集团试点的 ROI 数据：</p>
{table(["场景", "人工耗时", "Agent 耗时", "节省%", "月节省人天"],
  [["请假审批", "15 min", "3 min", "80%", "45"],
   ["周报生成", "30 min", "5 min", "83%", "60"],
   ["工单创建", "20 min", "4 min", "80%", "50"],
   ["跨系统查询", "25 min", "8 min", "68%", "35"]]}
{code_block("python", '''# ROI 计算器
def calculate_roi(manual_minutes: float, agent_minutes: float,
                  monthly_volume: int, hourly_rate: float = 50.0) -> dict:
    manual_cost = (manual_minutes / 60) * hourly_rate * monthly_volume
    agent_cost = (agent_minutes / 60) * hourly_rate * monthly_volume
    savings = manual_cost - agent_cost
    return {
        "monthly_savings": round(savings, 2),
        "savings_percent": round((1 - agent_minutes/manual_minutes)*100, 1),
        "payback_months": "N/A (纯软件)"
    }

# 算例：请假审批每月 200 次
print(calculate_roi(15, 3, 200))
# {'monthly_savings': 2000.0, 'savings_percent': 80.0, 'payback_months': 'N/A (纯软件)'}''')}
"""),
    ]
    chapters.append((cid, "办公自动化场景与边界", "业务与架构", "S3", body, [], [], [], [], [], [], [], []))
    write_one(base, cid, "办公自动化场景与边界", "业务与架构", "S3", body,
        [
            "办公任务按复杂度分四类：信息查询、数据录入、流程审批、跨系统编排",
            "人机协同边界分层：低风险全自动，中风险需确认，高风险强制审批",
            "CorpAssist S3 基于 LangGraph StateGraph + MCP 协议构建",
            "ROI 数据：80% 以上任务实现 3-5 倍效率提升",
            "核心架构三要素：编排层（StateGraph）、工具层（MCP）、记忆层（Checkpoint）"
        ],
        [
            "能区分 4 种办公任务自动化等级",
            "能解释人工审批的必要场景",
            "能画出 S3 模块架构图",
            "能用 ROI 计算器公式",
            "能配置自动化风险等级 YAML"
        ],
        [
            ("ReAct", "思考-行动-观察循环范式"),
            ("MCP", "模型上下文协议，标准化工具注册"),
            ("StateGraph", "LangGraph 状态图执行引擎"),
            ("Checkpoint", "LangGraph 检查点持久化"),
            ("Human-in-the-Loop", "人工参与的审批节点"),
            ("ROI", "投资回报率量化指标"),
        ],
        [
            ("什么是办公自动化 Agent 的技术边界？", "Agent 适合信息查询、数据录入、标准流程审批。不适合需要人类判断力、创造性决策、或涉及敏感资金操作的场景。"),
            ("如何量化 Agent 自动化的 ROI？", "使用公式：ROI = (人工耗时 - Agent 耗时) / 人工耗时 × 100%。典型场景节省 68%-83% 的时间。"),
            ("哪些任务必须强制人工审批？", "资金操作（报销/付款）、权限变更、合同签署等高风险操作。通过 LangGraph interrupt 机制实现。"),
        ],
        [
            ("https://docs.python.org/3/", "Python 3.12 文档", "语言官方参考"),
            ("https://langchain-ai.github.io/langgraph/", "LangGraph 文档", "状态图与 Agent 框架"),
            ("https://modelcontextprotocol.io/", "MCP 协议规范", "工具注册与调用标准"),
            ("https://fastapi.tiangolo.com/", "FastAPI", "Python 异步 Web 框架"),
        ],
        [
            "列举你工作中 3 个可自动化的办公任务",
            "为每个任务标注自动化等级（低/中/高）",
            "估算每个任务的人工耗时和 Agent 耗时",
            "用 ROI 计算器计算月节省金额",
            "为高风险任务设计审批流程",
        ],
        [
            ("公司想全自动处理报销流程，你同意吗？为什么？", "不同意。报销涉及资金操作，必须有人工审批节点。可以设计为：Agent 自动填写报销单并提交，财务主管审批后执行。"),
            ("如果 LLM 幻觉导致错误操作，如何兜底？", "分层兜底：1) 低风险工具直接执行 2) 中风险需人工确认 3) 高风险强制审批。所有操作记录审计日志。"),
        ],
        [
            "完成自动化工时 ROI 对比表",
            "通过审批流程边界测试",
        ],
        "basics-02-react-agent", "ReAct 与 Agent 架构",
        [
            ("https://arxiv.org/abs/2210.03629", "ReAct: Synergizing Reasoning and Acting", "ReAct 论文原文"),
            ("https://python.langchain.com/docs/concepts/agents/", "LangChain Agent 概念", "Agent 架构设计指南"),
        ])

    # --- basics-02-react-agent ---
    cid = "basics-02-react-agent"
    write_one(base, cid, "ReAct 与 Agent 架构", "业务与架构", "S3",
        [section_block("思考-行动-观察循环详解", f"""
<p>ReAct（Reasoning + Acting）是 Agent 的核心范式，由 Shunyu Yao 等在 2022 年提出。CorpAssist 的每个 Agent 任务都遵循这个循环：</p>
{mermaid("ReAct 循环流程", '''sequenceDiagram
    participant User as 用户
    participant Agent as CorpAssist Agent
    participant Tool as 工具系统
    User->>Agent: 用户请求
    Agent->>Agent: 思考(Reasoning)
    Agent->>Tool: 行动(Action): 调用工具
    Tool-->>Agent: 观察(Observation): 返回结果
    Agent->>Agent: 思考(Reasoning): 分析结果
    alt 任务完成
        Agent-->>User: 最终回答
    else 需要更多信息
        Agent->>Tool: 下一步行动
    end''', "ReAct 循环：思考 → 行动 → 观察 → 再思考")}
{code_block("python", '''# CorpAssist ReAct 循环实现 (LangGraph)
from langgraph.graph import StateGraph, END
from typing import TypedDict, Literal

class ReActState(TypedDict):
    messages: list
    tool_call_id: str | None
    observation: str | None

def reasoning_node(state: ReActState) -> dict:
    """LLM 输出思考 + 行动决策"""
    response = llm.invoke(state["messages"])
    if hasattr(response, "tool_calls") and response.tool_calls:
        return {
            "messages": [response],
            "tool_call_id": response.tool_calls[0]["id"]
        }
    return {"messages": [response], "tool_call_id": None}

def tool_node(state: ReActState) -> dict:
    """执行工具调用"""
    result = execute_tool(state["messages"][-1].tool_calls[0])
    return {"messages": [ToolMessage(content=result)]}

def router(state: ReActState) -> Literal["tool", "end"]:
    if state["tool_call_id"]:
        return "tool"
    return "end"

graph = StateGraph(ReActState)
graph.add_node("reason", reasoning_node)
graph.add_node("tool", tool_node)
graph.add_edge("tool", "reason")
graph.add_conditional_edges("reason", router)
graph.set_entry_point("reason")
app = graph.compile()''')}
{learn_compare(
    ["每次把全部历史塞入 Prompt，Token 消耗爆炸", "Agent 循环没有最大步数限制，可能死循环", "工具调用失败直接报错，无重试"],
    ["使用 LangGraph 自动管理消息列表，只保留必要历史", "设置 max_steps=10 和 Token 预算上限", "工具节点内置重试机制 + 错误恢复"]
)}
"""),
        section_block("Agent vs 纯对话的本质区别", f"""
{table(["维度", "纯对话 LLM", "Agent（CorpAssist S3）"],
  [["交互模式", "一问一答", "多步推理 + 工具调用"],
   ["状态管理", "无状态（每次独立）", "有状态（Checkpoint）"],
   ["外部交互", "无法调用系统", "MCP 协议调用任意工具"],
   ["记忆范围", "上下文窗口内", "短期 + 长期双级记忆"],
   ["失败处理", "LLM 自己处理", "重试 + 人工兜底"],
   ["可审计性", "低", "完整日志 + 检查点回溯"]])}
{micro_check("Agent 和 Function Calling 是什么关系？", "Function Calling 是模型能力（输出结构化工具调用请求），Agent 是在此之上的编排框架（决定何时调用、处理结果、继续推理）。")}
{code_block("yaml", "# CorpAssist S3 Agent 配置 vs 纯对话配置\nchat:\n  type: simple\n  model: qwen-plus\n  max_tokens: 2048\n\nagent:\n  type: react\n  model: qwen-plus\n  max_steps: 10\n  tools:\n    - calendar.read\n    - email.send\n  checkpointer:\n    type: redis\n    ttl: 3600\n  interrupt:\n    enabled: true\n    roles: [\"manager\"]")}
"""),
        section_block("状态机与检查点", f"""
<p>LangGraph 的 <strong>Checkpoint</strong> 机制是 Agent 可靠性的基石。每次节点执行后自动保存状态：</p>
{code_block("python", '''# CorpAssist Checkpoint 实现
from langgraph.checkpoint.redis import RedisSaver
import redis.asyncio as redis

# 初始化 Redis 检查点
redis_client = redis.from_url("redis://localhost:6379")
checkpointer = RedisSaver(redis_client)

# 编译图时注入检查点
graph = builder.compile(checkpointer=checkpointer)

# 每次执行自动保存
config = {"configurable": {"thread_id": "user-123-task-456"}}
for event in graph.stream({"messages": [user_msg]}, config):
    # 每个节点执行后自动 checkpoint
    print(f"Step: {event}")

# 恢复执行
for event in graph.stream(None, config):
    print(f"Resumed: {event}")''')}
{mermaid("Checkpoint 持久化流程", '''sequenceDiagram
    participant Node as Node
    participant CP as Checkpointer
    participant Redis as Redis
    Node->>CP: 节点执行完毕
    CP->>CP: 序列化 State
    CP->>Redis: 写入 thread_id
    Redis-->>CP: OK
    CP-->>Node: 继续
    Note over CP,Redis: 支持恢复任意中断点''', "每次节点执行后自动 checkpoint")}
"""),
        section_block("步数与 Token 预算控制", f"""
<p>生产环境必须设置严格的预算控制，防止 Agent 死循环或 Token 超支：</p>
{code_block("python", '''# CorpAssist Token 预算控制
from langgraph.graph import StateGraph

class BudgetState(TypedDict):
    messages: list
    steps: int
    total_tokens: int

MAX_STEPS = 10
MAX_TOKENS = 8000

def budget_router(state: BudgetState) -> str:
    if state["steps"] >= MAX_STEPS:
        return "__end__"  # 超步数终止
    if state["total_tokens"] >= MAX_TOKENS:
        return "__end__"  # 超 Token 终止
    if has_tool_call(state["messages"]):
        return "tool"
    return "__end__"

# 在每次推理后累计 Token
def track_usage(state, response):
    state["steps"] += 1
    state["total_tokens"] += response.usage.total_tokens
    return state''')}
{table(["预算类型", "默认值", "超出处理"],
  [["最大步数", "10", "返回当前结果并提示"],
   ["总 Token 上限", "8000", "截断历史并继续"],
   ["单步 Token", "2000", "压缩上下文"],
   ["超时秒数", "120", "中断并返回已执行结果"]])}
"""),
        ],
        [
            "ReAct 循环是三步骤：思考(Reasoning) → 行动(Action) → 观察(Observation)",
            "Agent 比纯对话多出状态管理、工具调用、记忆和失败处理四大能力",
            "Checkpoint 机制使 Agent 可中断、可恢复、可审计",
            "步数和 Token 预算必须有硬性上限，防止死循环和超支",
            "LangGraph 的条件边(conditional_edges)是实现路由的核心"
        ],
        [
            "能画出 ReAct 循环的 sequenceDiagram",
            "能解释 Agent vs 纯对话的 5 个区别",
            "能实现 Checkpoint 持久化代码",
            "能配置步数和 Token 预算",
            "能写出路由条件函数",
        ],
        [
            ("ReAct", "思考→行动→观察的循环范式"),
            ("Checkpoint", "状态检查点持久化机制"),
            ("Conditional Edge", "根据状态决定下一步的边"),
            ("Function Calling", "模型输出结构化工具调用"),
            ("Token Budget", "Token 消耗上限控制"),
            ("Interrupt", "中断节点允许人工介入"),
        ],
        [
            ("Agent 和普通 LLM 应用的核心区别是什么？", "Agent 具有自主推理-行动循环，能调用外部工具、管理多步状态、处理中间结果。普通 LLM 应用只是一问一答，无状态无工具。"),
            ("如何防止 Agent 陷入死循环？", "设置 max_steps（如 10 步）和 max_tokens（如 8000）硬性上限。在条件路由中检查步数和 Token 消耗，超限则强制终止。"),
            ("Checkpoint 在生产环境如何部署？", "使用 RedisSaver 持久化到 Redis 集群。每个会话分配 thread_id，支持故障恢复和审计回溯。生产推荐 Redis  Sentinel 或 Cluster。"),
        ],
        [
            ("https://arxiv.org/abs/2210.03629", "ReAct 论文", "原始研究论文"),
            ("https://langchain-ai.github.io/langgraph/concepts/agentic_concepts/", "LangGraph Agent 概念", "Agent 架构设计指南"),
            ("https://python.langchain.com/docs/how_to/agent_executor/", "LangChain Agent Executor", "Agent 执行器文档"),
        ],
        [
            "用 Python 实现一个 3 步以内的 ReAct 循环",
            "为 Agent 设置步数上限和 Token 预算",
            "测试超步数时的优雅终止行为",
            "用 RedisSaver 实现 Checkpoint",
            "从 Checkpoint 恢复执行",
        ],
        [
            ("Agent 执行到第 5 步时 Token 超限，应该怎么做？", "触发预算控制器：1) 截断最旧的消息历史 2) 如果仍超限则强制终止 3) 返回已生成的中间结果给用户 4) 记录审计日志。"),
            ("如何在面试中解释 ReAct vs Plan-and-Execute？", "ReAct 是短循环（思考→行动→观察，最多 5-10 步），适合简单任务。Plan-and-Execute 先规划再执行，适合需要多步骤协作的复杂任务。"),
        ],
        [
            "完成 ReAct 循环实现测试",
            "通过预算控制边界测试",
        ],
        "basics-03-task-planning", "任务规划与分解",
        [])

    # --- basics-03-task-planning ---
    cid = "basics-03-task-planning"
    write_one(base, cid, "任务规划与分解", "业务与架构", "S3",
        [section_block("Plan-and-Execute 模式", f"""
<p>Plan-and-Execute 是 ReAct 的升级版，先制定完整计划，再逐步执行。CorpAssist 在复杂任务中使用此模式：</p>
{mermaid("Plan-and-Execute 流程", '''sequenceDiagram
    participant User
    participant Planner as Planner Agent
    participant Exec as Executor Agent
    participant Tools as 工具系统
    User->>Planner: 复杂任务请求
    Planner->>Planner: 分析需求，生成计划
    Planner->>Exec: 计划：[步骤1, 步骤2, 步骤3]
    loop 每步执行
        Exec->>Tools: 执行步骤
        Tools-->>Exec: 结果
        Exec->>Exec: 验证结果
    end
    Exec-->>User: 汇总结果''', "先规划再执行，确保复杂任务不偏航")}
{code_block("python", '''# CorpAssist Plan-and-Execute 实现
from pydantic import BaseModel
from typing import Optional

class PlanStep(BaseModel):
    step_id: str
    description: str
    tool: str
    parameters: dict
    depends_on: list[str] = []
    status: str = "pending"

class TaskPlan(BaseModel):
    task_id: str
    goal: str
    steps: list[PlanStep]
    current_step: int = 0

def planner_node(state: AgentState) -> dict:
    """LLM 生成执行计划"""
    prompt = f"将任务拆解为步骤：{state['messages'][-1].content}"
    response = llm.with_structured_output(TaskPlan).invoke(prompt)
    return {"plan": response, "current_step": 0}

def executor_node(state: AgentState) -> dict:
    """按计划顺序执行"""
    step = state["plan"].steps[state["current_step"]]
    result = execute_tool(step.tool, step.parameters)
    return {
        "step_results": state.get("step_results", []) + [result],
        "current_step": state["current_step"] + 1
    }''')}
"""),
        section_block("子任务拆分策略", f"""
<p>好的任务拆分是 Agent 成功的关键。CorpAssist 使用三种拆分策略：</p>
{table(["策略", "适用场景", "拆分方式", "示例"],
  [["顺序拆分", "线性流程", "按时间/步骤顺序", "请假：查余额→填单→审批"],
   ["并行拆分", "独立子任务", "同时执行不依赖步骤", "查多个系统数据"],
   ["层级拆分", "复杂任务", "主任务→子任务→孙任务", "生成周报→收集数据→生成图表→排版"]])}
{micro_check("什么时候应该用 Plan-and-Execute 而不是 ReAct？", "任务需要超过 5 步、跨多个系统、或有明确顺序依赖时。简单查询用 ReAct 即可。")}
{code_block("python", '''# 任务拆分示例：生成周报
task_decomposition = {
    "task": "生成本周项目周报",
    "strategy": "层级拆分",
    "subtasks": [
        {"id": "1", "name": "收集项目进度", "tool": "project.get_status", "deps": []},
        {"id": "2", "name": "收集工时数据", "tool": "timesheet.get_weekly", "deps": []},
        {"id": "3", "name": "汇总异常项", "tool": "project.get_issues", "deps": ["1"]},
        {"id": "4", "name": "生成报告文本", "tool": "llm.generate", "deps": ["2", "3"]},
        {"id": "5", "name": "发送邮件", "tool": "email.send", "deps": ["4"]}
    ]
}''')}
"""),
        section_block("检查点与断点续传", f"""
<p>长时间运行的任务可能因故障中断。CorpAssist 通过 Checkpoint + 断点续传机制保证可靠性：</p>
{code_block("python", '''# 断点续传实现
from langgraph.checkpoint.redis import RedisSaver

async def resume_task(thread_id: str) -> dict:
    """从 checkpoint 恢复任务"""
    checkpointer = RedisSaver(redis_client)
    config = {"configurable": {"thread_id": thread_id}}

    # 获取当前状态
    state = await checkpointer.aget(config)
    if state is None:
        return {"error": "task not found"}

    # 从断点继续执行
    completed = state.get("current_step", 0)
    print(f"Resuming from step {completed}/{len(state['plan'].steps)}")

    async for event in graph.astream(None, config):
        if "step_result" in event:
            print(f"Step {completed + 1}/{len(state['plan'].steps)} done")

    return {"status": "completed", "thread_id": thread_id}''')}
{mermaid("断点续传流程", '''flowchart LR
    A[任务开始] --> B[Step 1]
    B --> C{Checkpoint}
    C --> D[Step 2]
    D --> E{中断!}
    E --> F[恢复]
    F --> G{读取 Checkpoint}
    G --> D
    D --> H[Step 3]
    H --> I[完成]''', "断点续传：故障后从最近 checkpoint 恢复")}
"""),
        section_block("失败恢复机制", f"""
<p>Agent 执行可能遇到多种失败，CorpAssist 的分层恢复策略：</p>
{table(["失败类型", "恢复策略", "重试次数", "最终兜底"],
  [["工具超时", "指数退避重试", "3 次", "跳过步骤"],
   ["LLM 输出格式错误", "重新推理 + 约束 Prompt", "2 次", "使用默认值"],
   ["依赖失败", "跳过依赖步骤", "0 次", "标记为失败"],
   ["权限不足", "升级审批", "0 次", "转人工处理"]])}
{learn_compare(
    ["工具失败直接报错终止", "所有失败都重试 5 次", "无审计日志，无从追溯"],
    ["工具失败先重试 3 次（指数退避）", "根据失败类型选择恢复策略", "完整记录失败原因和恢复过程"]
)}
{code_block("python", '''# 失败恢复实现
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential

class ToolExecutor:
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=2, max=10),
        before_sleep=lambda retry_state: logger.warning(
            f"Retry {retry_state.attempt_number}/3"
        )
    )
    async def execute_with_retry(self, tool: str, params: dict):
        return await self._call_tool(tool, params)

    async def _call_tool(self, tool: str, params: dict):
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                f"http://tool-gateway/tools/{tool}",
                json=params
            )
            resp.raise_for_status()
            return resp.json()''')}
"""),
        ],
        [
            "Plan-and-Execute 先规划再执行，适合复杂任务",
            "三种拆分策略：顺序、并行、层级，按场景选择",
            "Checkpoint 使 Agent 支持断点续传，增强可靠性",
            "失败恢复分层：工具超时重试、格式错误重推理、依赖失败则跳过",
            "tenacity 库实现指数退避重试，避免雪崩"
        ],
        [
            "能实现 Plan-and-Execute 双节点架构",
            "能根据任务类型选择拆分策略",
            "能实现断点续传代码",
            "能配置分层失败恢复策略",
            "能使用 tenacity 实现重试",
        ],
        [
            ("Plan-and-Execute", "先规划再执行的 Agent 模式"),
            ("Task Decomposition", "任务拆分为子任务"),
            ("Checkpoint", "状态检查点"),
            ("Exponential Backoff", "指数退避重试策略"),
            ("Tenacity", "Python 重试库"),
            ("Dependency Graph", "子任务依赖关系图"),
        ],
        [
            ("Plan-and-Execute 和 ReAct 有什么区别？", "ReAct 是短循环思考-行动，适合 5 步以内的简单任务。Plan-and-Execute 先生成完整计划再逐步执行，适合跨系统、多步骤的复杂任务。"),
            ("拆分子任务时要注意什么？", "1) 每个子任务粒度适中（1-2 步可完成）2) 标记依赖关系 3) 考虑并行可能性 4) 设置超时和重试 5) 断点可恢复。"),
            ("如何处理子任务执行失败？", "分层策略：工具超时重试 3 次，格式错误重新推理，依赖失败更新依赖图。所有失败记录审计日志，最终兜底可跳过或转人工。"),
        ],
        [
            ("https://python.langchain.com/docs/how_to/plan_and_execute/", "Plan-and-Execute", "任务规划模式文档"),
            ("https://langchain-ai.github.io/langgraph/how-tos/persistence/", "LangGraph 持久化", "Checkpoint 文档"),
            ("https://tenacity.readthedocs.io/", "Tenacity", "Python 重试库文档"),
        ],
        [
            "实现一个 Plan-and-Execute 的 Agent 原形",
            "用 YAML 描述周报生成任务的子任务拆分",
            "实现指数退避重试的工具调用",
            "测试断点续传功能",
        ],
        [
            ("生成周报时，如果收集数据步骤失败，应该怎么办？", "1) 重试 3 次（指数退避）2) 如果仍然失败，跳过数据步骤，使用缓存数据 3) 标记为部分成功 4) 在报告中注明异常项。"),
            ("一个 10 步的任务在第 7 步中断，如何保证不丢失进度？", "使用 LangGraph Checkpoint 持久化到 Redis。恢复时从 thread_id 读取最新 checkpoint，自动从步骤 7 继续执行。"),
        ],
        [
            "通过 Plan-and-Execute 实现测试",
            "通过断点续传功能测试",
        ],
        "basics-04-memory-tools", "记忆与工具生态",
        [])

    # --- basics-04-memory-tools ---
    cid = "basics-04-memory-tools"
    write_one(base, cid, "记忆与工具生态", "业务与架构", "S3",
        [section_block("短期记忆（LangGraph Checkpoint）", f"""
<p>短期记忆是 Agent 在当前会话中的状态保持。CorpAssist 使用 LangGraph Checkpoint 实现：</p>
{code_block("python", '''# 短期记忆：Redis Checkpoint
from langgraph.checkpoint.redis import RedisSaver
import redis.asyncio as redis

redis_client = redis.from_url(
    "redis://:password@redis-cluster:6379/0",
    decode_responses=False
)
checkpointer = RedisSaver(redis_client)

graph = builder.compile(checkpointer=checkpointer)

# 每次调用自动保存会话状态
config = {"configurable": {"thread_id": f"agent-{user_id}-{task_id}"}}
async for chunk in graph.astream(
    {"messages": [HumanMessage(content="请帮我查一下下周的日程")]},
    config
):
    print(chunk)''')}
{mermaid("短期记忆生命周期", '''sequenceDiagram
    participant Agent
    participant CP as Checkpointer
    participant Redis
    Agent->>CP: 节点执行完毕
    CP->>Redis: SET thread_id -> state (TTL: 3600s)
    Redis-->>CP: OK
    Note over Agent,Redis: 会话进行中
    Agent->>CP: 会话结束
    CP->>Redis: TTL 到期自动删除
    Note over Agent,Redis: 或主动清理''', "短期记忆 TTL=3600s，会话结束自动清理")}
"""),
        section_block("长期记忆（向量存储）", f"""
<p>长期记忆跨会话持久化。CorpAssist 使用向量库存储用户偏好和历史：</p>
{code_block("python", '''# 长期记忆：向量存储
from langchain_milvus import MilvusVectorStore
from langchain_openai import OpenAIEmbeddings

# 用户偏好记忆
user_memory = MilvusVectorStore(
    embedding_function=OpenAIEmbeddings(model="text-embedding-3-small"),
    collection_name="agent_user_memory",
    connection_args={"host": "milvus-standalone", "port": "19530"},
)

# 存储记忆
user_memory.add_texts(
    texts=["用户偏好早会前看日程", "审批偏好：金额>5000 需总监审批"],
    metadatas=[{"user_id": "u123", "type": "preference"},
               {"user_id": "u123", "type": "approval_rule"}]
)

# 检索记忆
results = user_memory.similarity_search(
    "用户的审批偏好是什么？",
    k=3,
    filter={"user_id": "u123"}
)''')}
{table(["记忆类型", "存储方式", "有效期", "用途"],
  [["短期（会话）", "Redis Checkpoint", "1 小时", "当前任务状态"],
   ["长期（用户）", "Milvus 向量库", "永久", "用户偏好/历史"],
   ["任务（实例）", "PostgreSQL", "30 天", "任务执行记录及审计"]])}
"""),
        section_block("MCP 协议与工具注册", f"""
<p>MCP（Model Context Protocol）是工具注册和调用的标准化协议。CorpAssist 所有工具通过 MCP 注册：</p>
{code_block("python", '''# CorpAssist MCP 工具注册
from mcp import MCPServer, Tool

# 定义工具
calendar_tool = Tool(
    name="calendar.read",
    description="读取日历日程",
    input_schema={
        "type": "object",
        "properties": {
            "date": {"type": "string", "format": "date"},
            "user_id": {"type": "string"}
        },
        "required": ["date"]
    }
)

email_tool = Tool(
    name="email.send",
    description="发送邮件",
    input_schema={
        "type": "object",
        "properties": {
            "to": {"type": "string"},
            "subject": {"type": "string"},
            "body": {"type": "string"}
        },
        "required": ["to", "subject", "body"]
    }
)

# MCP 服务启动
server = MCPServer(
    tools=[calendar_tool, email_tool],
    transport="sse"  # Server-Sent Events
)''')}
{learn_compare(
    ["每个工具自己实现 HTTP 调用", "工具注册无 Schema 校验", "工具发现需硬编码"],
    ["统一 MCP 协议注册工具", "标准化 JSON Schema 入参校验", "动态工具发现 + 热加载"]
)}
{micro_check("MCP 和普通的 REST API 有什么不同？", "MCP 专为 LLM Agent 设计：统一 Schema 描述、SSE 传输支持流式、工具发现自动化、标准化错误处理。")}
"""),
        section_block("工具权限与沙箱", f"""
<p>安全是生产落地的核心。CorpAssist 的工具访问控制：</p>
{code_block("yaml", "# CorpAssist 工具权限配置\ntools:\n  calendar.read:\n    roles: [employee, manager]\n    rate_limit: 100/min\n    sandbox: false\n\n  email.send:\n    roles: [employee]\n    rate_limit: 30/min\n    approval: required\n    sandbox: true\n    sandbox_mode: \"draft_first\"\n\n  erp.finance:\n    roles: [finance_manager]\n    rate_limit: 10/min\n    approval: required\n    sandbox: true\n    audit_level: full\n\n  admin.user_create:\n    roles: [admin]\n    rate_limit: 5/min\n    approval: required\n    audit_level: full\n    mfa: required")}
{table(["安全层级", "措施", "说明"],
  [["认证", "OAuth2 + MFA", "工具调用者身份验证"],
   ["授权", "RBAC 角色权限", "按角色控制工具可见性"],
   ["沙箱", "预览模式", "发送前先进入草稿确认"],
   ["限流", "速率限制", "防止滥用和异常调用"],
   ["审计", "全量日志", "所有调用可追溯"]])}
"""),
        ],
        [
            "短期记忆用 Redis Checkpoint，长期记忆用向量存储",
            "MCP 是工具注册和调用的标准化协议",
            "工具沙箱模式：发送类工具先进入草稿确认",
            "所有工具调用受 RBAC 权限控制",
            "全量审计日志确保可追溯"
        ],
        [
            "能实现 Redis Checkpoint 持久化",
            "能使用 Milvus 存储和检索长期记忆",
            "能通过 MCP 协议注册工具",
            "能配置工具权限和沙箱模式",
            "能解释记忆分层架构",
        ],
        [
            ("Short-term Memory", "会话级状态，Redis 持久化"),
            ("Long-term Memory", "跨会话持久化，向量存储"),
            ("MCP", "模型上下文协议，标准化工具通信"),
            ("RBAC", "基于角色的访问控制"),
            ("Sandbox", "沙箱模式，执行前预览确认"),
            ("Audit Trail", "全量审计日志"),
        ],
        [
            ("Agent 的短期记忆和长期记忆如何配合？", "短期记忆存当前会话状态（TTL=1h），长期记忆存用户偏好和历史（永久）。Agent 执行时先查长期记忆获取用户偏好，再结合短期记忆处理当前任务。"),
            ("MCP 协议的核心设计理念是什么？", "标准化：工具用统一 Schema 描述，通过 SSE 传输，支持动态发现。Agent 不需要知道工具内部实现，只需按 Schema 组装参数。"),
            ("如何防止工具被滥用？", "四层防护：1) 认证鉴权 2) RBAC 权限控制 3) 速率限制 4) 全量审计日志。高风险工具还需审批 + MFA。"),
        ],
        [
            ("https://modelcontextprotocol.io/", "MCP 协议官方", "MCP 协议规范"),
            ("https://milvus.io/docs/", "Milvus 向量数据库", "向量存储文档"),
            ("https://python.langchain.com/docs/how_to/chatbots_memory/", "LangChain 记忆管理", "记忆系统指南"),
        ],
        [
            "用 Redis 实现短期记忆 Checkpoint",
            "用 Milvus 存储用户偏好长期记忆",
            "用 MCP 协议注册一个日历工具",
            "配置工具的 RBAC 权限 YAML",
        ],
        [
            ("长期记忆存储了用户的敏感偏好，如何保护隐私？", "1) 存储前加密 2) 字段级权限控制 3) 用户可查询和删除自己的记忆 4) 定期清理过期记忆 5) 全量审计。"),
            ("Agent 的短期记忆 TTL 到期后怎么办？", "1) 主动续期：节点执行完刷新 TTL 2) 到期自动清理 3) 用户重新发起会话时重建 4) 长期记忆仍然保留。"),
        ],
        [
            "通过记忆系统集成测试",
            "通过工具权限管理测试",
        ],
        "practice-01-langgraph", "LangGraph 工作流实现",
        [])

    print(f"  Writing {len(chapters)} files for course 1")
    for cid, title, phase, scene, body, conclusions, checklist, cheat_terms, interview_qas, \
            official_links, practice_steps, practice_judgments, demo_info, nxt, nxt_title, ext_links in chapters:
        html = make_chapter(cid, title, phase, scene, {"why": "", "outcome": "", "keypoints": "", "body": body},
                            conclusions, checklist, cheat_terms, interview_qas, official_links,
                            practice_steps, practice_judgments, demo_info, nxt, nxt_title, ext_links)
        fpath = os.path.join(base, f"{cid}.html")
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"    Wrote {fpath}")

gen_course1_chapters()
print("Course 1 done")
