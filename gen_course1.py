#!/usr/bin/env python3
"""Generate 12 chapters for scenario-py-agent-automation"""
import os, html, textwrap

BASE = r"D:\MyWorkStation\Java\program\study-llm-dev-all\courses\scenario-py-agent-automation\chapters"

def h(t): return html.escape(t)

def make_scenario(title, text):
    return f'<aside class="learn-scenario"><h4>{h(title)}</h4><p>{h(text)}</p></aside>'

def make_compare(bad_title, bad_text, good_title, good_text):
    return f'<div class="learn-compare"><div class="learn-compare-col learn-compare-bad"><h4>{h(bad_title)}</h4><p>{h(bad_text)}</p></div><div class="learn-compare-col learn-compare-good"><h4>{h(good_title)}</h4><p>{h(good_text)}</p></div></div>'

def make_table(headers, rows):
    out = '<table class="outline-table"><thead><tr>'
    for hh in headers: out += f'<th>{h(hh)}</th>'
    out += '</tr></thead><tbody>'
    for row in rows:
        out += '<tr>'
        for cell in row: out += f'<td>{h(cell)}</td>'
        out += '</tr>'
    out += '</tbody></table>'
    return out

def make_code(code_text):
    return f'<div class="code-block"><div class="code-toolbar"><span class="lang-tag">python</span><button type="button" class="btn-copy" aria-label="复制代码">复制</button></div><pre><code class="language-python">{code_text}</code></pre></div>'

def make_mermaid(mmd):
    return f'<div class="mermaid-wrap"><pre class="mermaid">{mmd}</pre></div>'

def write_chapter(filename, title, meta, why, outcome, points, sections, conclusions, checklists, cheats, interviews, practice_steps, judgments, demo_path, acceptances, links, next_ch):
    lines = []
    cid = filename
    lines.append(f'<section id="ch-{cid}" class="chapter" data-chapter="{cid}">')
    lines.append(f'<header class="chapter-header"><h2><span class="chapter-done-badge">已完成</span>{h(title)}</h2><button type="button" class="btn-mark-done" data-chapter="{cid}">标记完成</button></header>')
    lines.append('<div class="concept"><div class="chapter-intro content-section">')
    lines.append(f'<p class="chapter-meta">{h(meta)}</p>')
    lines.append(f'<div class="notice notice-why-learn"><h4>为什么学这章</h4><p>{h(why)}</p></div>')
    lines.append(f'<div class="notice notice-outcome"><h4>学完后能做什么</h4><p>{h(outcome)}</p></div>')
    lines.append(f'<div class="notice"><h4>本章要点速记</h4><p>{h(points)}</p></div>')
    lines.append('</div>')
    for sec in sections:
        lines.append(f'<div class="section-block"><h3>{h(sec["h3"])}</h3>')
        for p in sec.get("paras", []):
            lines.append(f'<p>{h(p)}</p>')
        if "rich" in sec:
            lines.append(sec["rich"])
        lines.append('</div>')
    # conclusions
    lines.append('<div class="section-block chapter-conclusions-block notice"><h3>本章结论</h3><ul class="chapter-conclusions-list">')
    for c in conclusions: lines.append(f'<li>{h(c)}</li>')
    lines.append('</ul></div>')
    # review
    lines.append('<div class="section-block learn-review-block"><h3>复习与自检</h3>')
    lines.append('<div class="learn-checklist"><h4>过关清单</h4><ul>')
    for i, item in enumerate(checklists):
        lines.append(f'<li><label><input type="checkbox" data-check-id="{cid}-{i+1}"> {h(item)}</label></li>')
    lines.append('</ul></div>')
    lines.append('<div class="learn-cheat-sheet"><h4>概念速查</h4><table class="outline-table"><thead><tr><th>术语/概念</th><th>速记</th></tr></thead><tbody>')
    for term, defn in cheats: lines.append(f'<tr><td><strong>{h(term)}</strong></td><td>{h(defn)}</td></tr>')
    lines.append('</tbody></table></div>')
    lines.append('<div class="learn-interview"><h4>面试可能问</h4>')
    for q, a in interviews:
        lines.append(f'<details><summary>{h(q)}</summary><p>{h(a)}</p></details>')
    lines.append('</div></div>')
    # official links
    lines.append('<div class="official-links content-section"><h3>官方参考</h3><ul>')
    for name, url in links:
        lines.append(f'<li><a href="{h(url)}" target="_blank" rel="noopener">{h(name)}</a></li>')
    lines.append('</ul></div>')
    # practice
    lines.append('<div class="chapter-practice"><h3>动手练习</h3><div class="steps-operate"><h4>操作步骤</h4><ol>')
    for s in practice_steps: lines.append(f'<li>{h(s)}</li>')
    lines.append('</ol></div>')
    lines.append('<div class="steps-judgment-list"><h4>判断练习</h4>')
    for q, a in judgments:
        lines.append(f'<details><summary>{h(q)}</summary><p>{h(a)}</p></details>')
    lines.append('</div>')
    lines.append(f'<div class="demo-box"><h4>实验室</h4><p>{h(demo_path)}</p><ul class="demo-acceptance">')
    for ac in acceptances: lines.append(f'<li>{h(ac)}</li>')
    lines.append('</ul></div></div>')
    lines.append('<div class="resources content-section"><h3>延伸阅读</h3><ul>')
    for name, url in links:
        lines.append(f'<li><a href="{h(url)}" target="_blank" rel="noopener">{h(name)}</a></li>')
    lines.append(f'<li>下一章：<strong>{h(next_ch)}</strong></li>')
    lines.append('</ul></div>')
    lines.append('</div></section>')
    text = "\n".join(lines)
    os.makedirs(BASE, exist_ok=True)
    fp = os.path.join(BASE, filename + ".html")
    with open(fp, "w", encoding="utf-8") as f: f.write(text)
    print(f"  {filename}.html: {len(text.splitlines())} lines")

# ===== CHAPTER 1: basics-01-office-automation =====
write_chapter("basics-01-office-automation",
    "办公自动化场景与边界",
    "约 28 分钟 · 阶段：业务认知 · 场景：S1",
    "办公自动化是 LLM Agent 最直接的应用场景。理解哪些任务可以自动化和 ROI 如何计算决定了项目是否值得推进。CorpAssist 作为企业内部 Agent 平台第一关就是正确识别自动化边界避免资源浪费。",
    "能独立评估一个办公任务的自动化可行性计算出 ROI 并画出人机协同边界图为 CorpAssist 设计自动化优先级矩阵。",
    "自动化七大类与 ROI 量化 | 人机协同边界判据 | CorpAssist Agent 模块全景 | 自动化 ROI 模型 | 低价值高风险任务识别",
    [
        {"h3": "可自动化的办公任务七大类",
         "paras": [
            "企业办公场景中 LLM Agent 能够覆盖的任务可分为七大类每类都有明确的自动化收益度量方式。日程管理类涉及会议安排日历同步和忙闲查询 CorpAssist 内日均处理 1200 次每次节省约 8 分钟。邮件处理类包括摘要生成自动回复分类和附件整理单次节省 5-12 分钟员工日处理邮件平均耗时 47 分钟自动化后可降至 8 分钟。文档处理类涵盖周报生成合同条款提取和提案初稿每份文档节省 2-4 小时其中周报生成是 CorpAssist 采纳率最高的模块达到 73%。",
            "数据操作类是自动化价值最高的领域包括 Excel 报表生成数据库查询转自然语言和跨系统数据同步平均每任务节省 45 分钟。审批流转类涉及请假审批报销审核和采购申请通过 Agent 前置校验可减少 60% 的人工流转环节。通知推送类涉及批量消息发送定时提醒和公告分发自动化后接近零人工成本。报表生成类涵盖周报月报和季报是入门级场景 CorpAssist 中该模块日调用量约 800 次。",
            "自动化可行性取决于三个维度：输入结构化程度（越高越易自动化占 40% 权重）决策复杂度（越低越易自动化占 35% 权重）异常率（越低越易自动化占 25% 权重）。CorpAssist 使用 0-100 分的评分卡总分 >70 推荐全自动 40-70 推荐人机协同 <40 保持人工。上季度评估的 87 个办公流程中 32 个得分 >70（36.8%）45 个得分 40-70（51.7%）10 个得分 <40（11.5%）。"
         ],
         "rich": make_table(["任务类别","日均频次","单次节省","结构化度","自动化建议"],
            [["日程管理","1200次","8分钟","0.85","全自动"],["邮件处理","400封","8分钟","0.90","全自动"],
             ["文档处理","50份","2-4小时","0.75","人机协同"],["数据操作","200次","45分钟","0.80","全自动"],
             ["审批流转","300次","60%流转","0.60","人机协同"],["通知推送","500次","<1分钟","0.95","全自动"],
             ["报表生成","30份","1小时","0.70","全自动"]])
        },
        {"h3": "人机协同边界：LLM 做规划人类做决策",
         "paras": [
            "人机协同不是简单地把人踢出流程而是在每个任务节点上判断谁更适合。LLM Agent 在规划能力方面表现突出可以从自然语言描述中提取意图拆分步骤选择工具。但 LLM 在三个领域有根本局限：需要承担法律或财务责任的决策（如批准付款）涉及企业价值观判断的例外处理（如特殊折扣）以及需要长期战略视角的策略决策（如是否进入新市场）。",
            "CorpAssist 的边界设计原则是 LLM 起草人类确认。对于日程安排 Agent 查找所有人的空闲时段并生成提案用户一键确认。对于邮件回复 Agent 生成 3 个版本供用户选择用户选择平均耗时 22 秒远低于自行撰写的 4.5 分钟。对于报销审批 Agent 检查发票合规性和预算余额仅标记异常项供人工审核审批人处理时间从 6 分钟降至 1.2 分钟。",
            "边界划定的另一维度是可解释性阈值：当 Agent 的决策逻辑无法在 5 句自然语言内解释清楚时就应加入人工环节。CorpAssist 在此原则下部署了 23 个 Agent 流程其中 8 个全自动（日均处理 3400 次成功率 91.2%）15 个人机协同（日均处理 2100 次成功率 96.8%）。人机协同的成功率高出 5.6 个百分点说明人工兜底不是降低效率而是提升可靠性。"
         ],
         "rich": make_mermaid("flowchart TB\n    A[办公任务]-->B{可行性评分}\n    B-->|>70|C[全自动: 8个流程]\n    B-->|40-70|D[人机协同: 15个流程]\n    B-->|<40|E[保持人工]\n    C-->F[LLM 规划+执行]\n    D-->G[LLM 规划草稿]\n    D-->H[人类审批决策]\n    G-->H\n    H-->I[Agent 执行]\n    F-->J{结果检查}\n    I-->J\n    J-->|通过|K[完成 ✓]\n    J-->|不通过|L[人工介入]")
        },
        {"h3": "CorpAssist Agent 模块全景",
         "paras": [
            "CorpAssist 的办公自动化能力通过四个核心 Agent 模块对外暴露。日历助手（Calendar Agent）负责会议安排日程冲突检测和忙闲查询通过 Google Calendar API 和 Exchange Web Services 双通道接入日均调用约 2800 次。邮件摘要（Mail Agent）对接 Gmail 和 Outlook 支持邮件分类（重要待办广告通知）批量摘要和自动回复建议摘要精度达到 94.2%。",
            "工单自动化（Ticket Agent）连接 Jira 飞书和钉钉实现工单创建状态查询指派和备注的语音或文本指令化平均处理时间从 4 分钟降至 0.3 分钟效率提升 13.3 倍。周报生成（Report Agent）从 Calendar Jira 和 Mail 中自动收集用户本周活动按项目分类后生成结构化周报支持 Markdown Confluence 和 PDF 三种输出格式企业内采用率 73%。",
            "四个模块共享底层 Agent 运行时：LangGraph 状态图用于工作流编排工具注册中心通过 MCP 协议管理所有工具记忆管理层使用 Redis 做短期缓存 Milvus 做长期向量检索权限控制层实现 RBAC 模型。模块间通过 Redis Pub/Sub 异步流转例如 Report Agent 在处理周报时会向 Calendar Agent 和 Ticket Agent 请求本周事件数据模块间数据交换平均延迟 <15ms。"
         ],
         "rich": make_mermaid("flowchart LR\n    subgraph User[用户入口]\n        CHAT[聊天界面]\n        SLACK[Slack 机器人]\n        API[REST API]\n    end\n    subgraph Agents[CorpAssist Agent 模块]\n        CA[Calendar Agent\\n日均2800次]\n        MA[Mail Agent\\n精度94.2%]\n        TA[Ticket Agent\\n效率13.3倍]\n        RA[Report Agent\\n采纳率73%]\n    end\n    subgraph Bus[消息总线]\n        PUB[Redis Pub/Sub]\n    end\n    subgraph Base[共享基础设施]\n        LG[LangGraph 状态图]\n        MCP[MCP 工具注册中心]\n        RM[Redis + Milvus 记忆]\n        RBAC[RBAC 权限控制]\n    end\n    User-->Agents\n    CA-->PUB\n    MA-->PUB\n    TA-->PUB\n    RA-->PUB\n    PUB-->Base")
        },
        {"h3": "自动化 ROI 模型与决策框架",
         "paras": [
            "自动化项目立项需要清晰的 ROI 计算。CorpAssist 的模型将收益分为直接人力节省和间接效率提升两部分。直接人力节省：每自动化一个 FTE 的工作量按一线城市均值计算可节省约 ¥120K 每年（含社保和管理成本）。系统成本包括 LLM API 调用费用 ¥12K-¥18K 每年基础设施 ¥8K-¥12K 每年维护人力 ¥10K 每年合计约 ¥30K 每年。单流程净节省约 ¥90K 每年。",
            "三因子决策矩阵帮助筛选高价值流程：频率（日均执行次数）乘以单次耗时（分钟）乘以结构化程度（0-1）。得分 >50 推荐自动化 20-50 推荐半自动化 <20 保持人工。以邮件摘要为例：日均 400 封乘以 3 分钟乘以 0.9 等于 1080 分优先级最高。处理客户投诉为例：日均 5 次乘以 15 分钟乘以 0.3 等于 22.5 分建议人工优先。",
            "部署后 ROI 验证同样重要。CorpAssist 在每个流程上线后跟踪 30 天的实际节省数据。Q1 上线的 12 个流程中 11 个达到或超过预期 ROI。最佳案例是周报生成预期节省 ¥86K 每年实际达到 ¥112K 每年超额 30%。唯一未达预期的是合同条款提取预期 ¥65K 每年实际 ¥41K 每年原因是法律文本的语义复杂度超出初步评估。"
         ],
         "rich": make_table(["流程","日均频次","单次耗时","结构化度","ROI得分","推荐模式","年节省"],
            [["邮件摘要","400","3min","0.90","1080","全自动","¥180K"],["周报生成","1/周","120min","0.70","84","全自动","¥112K"],
             ["报销审批","50","6min","0.60","180","人机协同","¥72K"],["合同审查","5","45min","0.40","90","人机协同","¥41K"],
             ["客户投诉","5","15min","0.30","22.5","人工","-"]])
        },
    ],
    conclusions = [
        "办公自动化七大类中数据操作和报表生成的 ROI 最高单流程净节省约 ¥90K 每年",
        "人机协同的核心原则是 LLM 起草人类确认 CorpAssist 的 23 个流程中 15 个采用此模式",
        "自动化可行性评估三因子模型（频率乘以耗时乘以结构化度）正确率达 84%",
        "四个核心 Agent 模块日均处理超 5500 次请求共享 LangGraph MCP Redis 底座",
        "部署后 ROI 验证是闭环关键 Q1 的 12 个流程中 11 个达到或超额完成预期"
    ],
    checklists = [
        "能列举办公自动化的七大类场景并说出各自的 ROI 特征",
        "能画出 CorpAssist 四个核心 Agent 模块的架构关系图",
        "能用三因子矩阵评估任意办公任务的自动化可行性",
        "能计算并解释单个流程自动化的 ROI 模型参数",
        "能区分适合全自动人机协同和保持人工的三类边界条件"
    ],
    cheats = [
        ("七类场景","日程 邮件 文档 数据 审批 通知 报表"),
        ("ROI 公式","净节省 = 人力成本 ¥120K - 系统成本 ¥30K = ¥90K/年/FTE"),
        ("可行性评分","结构化 40% + 决策复杂度 35% + 异常率 25%"),
        ("CorpAssist 4 模块","Calendar / Mail / Ticket / Report Agent"),
        ("全自动阈值","可行性评分 >70 且可解释性在 5 句内"),
        ("采纳率参考","Report Agent 73% · Mail Agent 94.2%"),
        ("SLA 基准","单步 <3s · MTTR <5min · 成功率 >90%"),
        ("Q1 上线","12 个流程 11 个达预期 最佳超额 30%")
    ],
    interviews = [
        ("如何判断一个办公流程是否适合自动化？",
         "使用三因子决策矩阵：频率（日均执行次数）乘以单次耗时（分钟）乘以结构化程度（0-1）。得分 >50 推荐全自动 20-50 推荐人机协同 <20 保持人工。以 CorpAssist 的邮件摘要为例日均 400 封乘以 3 分钟乘以 0.9 等于 1080 分毫不犹豫推进自动化。三个因子的权重可以根据行业调整对于金融行业结构化程度的权重需要提高到 50% 因为合规要求更高。此外还要考虑异常率如果流程异常率超过 15% 即使得分高也不建议全自动。"),
        ("人机协同中的人具体做什么？",
         "三个核心角色：审批人负责最终决策如付款批准和合同确认。例外处理人负责 Agent 无法处理的边缘案例如特殊折扣和非标请求。策略决策人负责长期优化如调整自动化边界和更新工具配置。CorpAssist 的实践数据表明引入人机协同后流程成功率从 91.2% 提升至 96.8% 说明人工兜底不是降低效率而是提升可靠性。人机协同的关键是让人类做人类擅长的事让 Agent 做 Agent 擅长的事。"),
        ("自动化 ROI 模型怎么建才可信？",
         "必须包含四个部分：基准线下的人力全成本（薪资加社保加管理分摊）自动化后的系统成本（API 加基础设施加维护）部署成本（一次性开发加测试加上线）效率衰减因子（流程变更导致的自动化率下降）。CorpAssist 的经验是预留 20% 的缓冲因为实际 API 调用量通常超出预估 15-30%。此外要做三种场景测算（乐观基准悲观）悲观场景下 ROI 回正时间超过 12 个月则不建议立项。")
    ],
    practice_steps = [
        "使用三因子矩阵评估你工作中任意 3 个办公流程的自动化可行性并打分",
        "画出 CorpAssist Calendar Agent 的架构时序图包含日历查询冲突检测和会议创建",
        "计算一个邮件摘要流程的 ROI：日均 400 封乘以 3 分钟每封人力成本 ¥15K 每月系统成本 ¥2.5K 每月"
    ],
    judgments = [
        ("所有办公流程最终都应该全自动化？",
         "不是。根据 CorpAssist 数据仅 36.8% 的流程适合全自动。涉及法律或财务责任企业价值观判断长期策略决策的任务必须保留人工环节。全自动化的边界不是技术能力问题而是责任归属问题。"),
        ("ROI 应该只看人力节省？",
         "不够全面。间接收益包括响应速度提升带来的客户满意度提高员工从重复劳动中释放后从事更高价值工作标准化带来的错误率下降。CorpAssist 的综合 ROI 模型包含直接人力节省 60% 和间接收益 40% 两部分。")
    ],
    "demos/basics-01-office-automation-lab/",
    ["能向非技术团队清晰解释自动化边界判定逻辑",
     "三因子评估矩阵至少覆盖 5 个实际工作流程",
     "ROI 模型包含直接节省和间接收益两部分"],
    [("LangGraph 文档","https://langchain-ai.github.io/langgraph/"),("MCP 协议","https://modelcontextprotocol.io/"),("FastAPI 官方","https://fastapi.tiangolo.com/")],
    "ReAct 与 Agent 架构"
)

# ===== CHAPTER 2 =====
write_chapter("basics-02-react-agent",
    "ReAct 与 Agent 架构",
    "约 32 分钟 · 阶段：架构认知 · 场景：S1",
    "ReAct（Reasoning + Acting）是 LLM Agent 的核心推理模式。不掌握 ReAct 循环就无法理解 Agent 为什么能自主思考。CorpAssist 的所有 Agent 模块都基于 ReAct 范式构建它是后续所有实践章节的基础。",
    "能用 Python 实现 ReAct 循环的核心逻辑理解 Agent 与纯对话的本质区别掌握 LangGraph Checkpoint 和 Token 预算控制技术。",
    "ReAct 循环 Python 实现 | Agent vs 纯对话本质区别 | LangGraph Checkpoint 机制 | 步数与 Token 预算控制 | 状态机与工具调用模式",
    [
        {"h3": "ReAct 循环的 Python 实现",
         "paras": [
            "ReAct 循环的核心是四个阶段的持续迭代：Think（LLM 分析当前状态和下一步计划）Act（LLM 选择工具和参数）Observe（解析工具返回的结果）Loop（检查是否满足停止条件）。每一轮迭代产生一个思考行动观察三元组这些三元组累积成为 Agent 的推理轨迹。CorpAssist 实现中每个三元组在 Redis 中存储为 react 会话 ID 步骤编号的结构便于后续审计和调试。",
            "停止条件有四种：目标完成（LLM 输出 final_answer 标记）步数超限（max_steps=8）Token 超限（max_tokens=4000）人工中断（通过 interrupt_before 机制）。优先满足第一种后三种属于异常退出需要触发降级流程。生产数据显示 CorpAssist 的 Agent 任务平均在 3.7 步内完成最长任务不超过 6 步 max_steps=8 的设定有 53% 的余量既防止无限循环又不会过早切断正常流程。",
            "在 Python 实现中每个 Tool 调用通过 LangGraph 的 ToolNode 执行。ToolNode 接收 LLM 输出的 tool_calls 列表并发执行所有独立工具调用（通过 asyncio.gather）再将结果写回状态。关键在于工具返回的格式所有工具返回 ToolMessage 对象其 content 字段最大支持 2000 tokens 超长返回会被自动摘要。"
         ],
         "rich": make_mermaid("flowchart TB\n    IN[用户输入]-->THINK[Think: LLM 分析状态]\n    THINK-->DECISION{需要工具?}\n    DECISION-->|是|ACT[Act: 选择工具+参数]\n    ACT-->OBS[Observe: 解析结果]\n    OBS-->CK[Checkpoint: 保存状态]\n    CK-->THINK\n    DECISION-->|否|ANS[生成最终答案]\n    ANS-->STOP{停止检查}\n    STOP-->|步骤<8 且 Token<4000|END[返回结果]\n    STOP-->|超限|DEG[触发降级策略]")
        },
        {"h3": "Agent 与纯对话的本质区别",
         "paras": [
            "纯对话系统的架构是一条直线：用户输入到 LLM 到文本输出。它没有状态管理没有工具调用没有多步推理没有错误恢复。Agent 系统则包含四个根本不同：状态机架构 Agent 运行在 StateGraph 上每个节点都读取和写入共享状态。工具调用 LLM 可以输出结构化 tool_calls 而非纯文本系统会执行对应工具并返回结果。多步推理 Agent 不会一次给出答案而是通过多轮 Think-Act-Observe 逐步逼近目标。错误恢复当工具调用失败时 Agent 可以重试降级或请求人工介入。",
            "从工程实现看最核心的区别在于输出格式。纯对话的 LLM 输出 content 字符串而 Agent 的 LLM 输出 content 加 tool_calls 列表。这要求 LLM 的 API 调用必须设置 tool_choice 为 auto 并且在系统提示中明确说明工具的用途和参数。CorpAssist 使用了一个 2000 tokens 的系统提示包含所有工具的完整 JSON Schema 确保 LLM 能正确生成 tool_calls。",
            "另一个关键区别是对话历史的管理方式。纯对话系统将所有历史塞进 messages 数组当超过上下文窗口时简单截断。Agent 系统有自己的记忆管理层：短期记忆（LangGraph Checkpoint）保存当前会话的状态轨迹长期记忆（向量存储）跨会话保留用户偏好和历史任务信息。两种记忆通过 Agent 的 System Prompt 中的上下文注入来协作。"
         ],
         "rich": make_compare("纯对话系统","无状态每次请求独立无法维护多轮上下文。不能调用工具无多步推理能力遇到错误直接返回失败。典型任务成功率仅 41.3%。",
            "Agent 系统","有状态通过 Checkpoint 持久化维护完整上下文。原生工具调用支持 ToolNode。ReAct 循环多步推理。三层错误恢复机制。全链路审计追踪。典型任务成功率 98.3%。")
        },
        {"h3": "LangGraph Checkpoint 状态检查点持久化",
         "paras": [
            "LangGraph 的 Checkpoint 机制是 Agent 可靠性的基石。每当 Agent 完成一步状态转换后系统自动将当前状态（包括消息历史已完成步骤中间变量等）保存到持久化存储中。CorpAssist 默认使用 RedisSaver 每个 Checkpoint 的 Key 格式为 checkpoint 加线程 ID 加步骤编号 Value 为序列化的 JSON 包含完整状态快照。Redis 的 TTL 设置为 24 小时超过未完成的任务会被自动清理。",
            "Checkpoint 的核心价值在于断点续传。当 Agent 因为网络故障 API 超时或服务重启而中断时可以从最近的 Checkpoint 恢复执行而不会丢失上下文。对比实验显示有 Checkpoint 机制的任务成功率从 76% 提升至 98.3% 平均恢复时间（从失败到恢复）为 1.2 秒。此外 Checkpoint 还支持回溯调试：开发人员可以从任意步骤的 Checkpoint 恢复执行并修改后续路径这一功能在调试阶段将问题定位时间减少了 60%。",
            "性能方面每个 Checkpoint 的写入时间约 15-25ms（取决于状态大小）使用 Redis Pipeline 批量写入可以将多个 Checkpoint 的写入合并为一次网络往返使 P99 写入延迟从 180ms 降至 45ms。CorpAssist 在生产环境中部署了 3 节点 Redis Cluster 来支撑 Checkpoint 的高并发读写峰值写入量为 1200 次每秒。"
         ],
         "rich": make_code("import redis.asyncio as aioredis\nfrom langgraph.checkpoint.redis import RedisSaver\n\nclass CheckpointManager:\n    def __init__(self, redis_url: str = \"redis://localhost:6379/0\"):\n        self.redis = aioredis.from_url(redis_url, decode_responses=True)\n        self.saver = RedisSaver(client=self.redis)\n\n    async def save_checkpoint(self, thread_id: str, step: int, state: dict):\n        key = f\"checkpoint:{thread_id}:{step}\"\n        pipe = self.redis.pipeline()\n        pipe.set(key, json.dumps(state, ensure_ascii=False))\n        pipe.hset(f\"checkpoint:meta:{thread_id}\", \"last_step\", step)\n        pipe.expire(key, 86400)  # 24 hours TTL\n        await pipe.execute()\n\n    async def load_checkpoint(self, thread_id: str, step: int) -> dict | None:\n        key = f\"checkpoint:{thread_id}:{step}\"\n        data = await self.redis.get(key)\n        return json.loads(data) if data else None\n\n    async def get_latest_step(self, thread_id: str) -> int:\n        step = await self.redis.hget(f\"checkpoint:meta:{thread_id}\", \"last_step\")\n        return int(step) if step else 0")
        },
        {"h3": "步数与 Token 预算控制",
         "paras": [
            "Agent 系统的成本控制核心在步数和 Token 两个维度。步数控制防止 Agent 陷入无限循环：在 LangGraph 中通过 add_conditional_edges 实现每个节点执行后检查当前步数是否达到 max_steps。CorpAssist 默认 max_steps=8 这个值来源于 2000 个历史任务的统计：99.7% 正常任务在 6 步内完成 8 步是 3 标准差边界。当步数超限时触发降级记录当前状态返回已完成部分的结果在回复中告知用户任务未完整执行创建异步工单继续处理。",
            "Token 预算控制更复杂。每个 Agent 调用过程会产生三类 Token：系统提示约 2000 tokens 对话历史每步约 500 tokens 八步约 4000 tokens 工具返回每步约 1000 tokens 八步约 8000 tokens 合计约 14000 tokens。设定 max_tokens=4000 指的是 LLM 输出的 Token 上限而不是输入的。CorpAssist 会在每步 LLM 调用时设置 max_tokens=4000 如果 LLM 输出被截断 Agent 会在下一步中要求 LLM 继续输出。",
            "超标降级策略分为三级：第一级当前步骤输出截断自动增加 max_tokens 到 6000 并重试本步。第二级连续 3 步输出截断切换到更长上下文的模型如从 qwen-plus 切换到 gpt-4-32k。第三级累计 Tokens 超限执行摘要压缩将已有对话历史通过 LLM 压缩到 1000 tokens 以内然后继续执行。监控数据显示约 5.3% 的任务会触发第一级降级 1.1% 触发第二级 0.2% 触发第三级。"
         ],
         "rich": make_table(["降级级别","触发条件","处理措施","受影响任务占比","平均额外延迟"],
            [["L1","当前步输出截断","max_tokens 6000 + 重试","5.3%","1.2s"],["L2","连续 3 步截断","切换长上下文模型","1.1%","3.5s"],
             ["L3","累计 Tokens 超限","历史摘要压缩到 1K","0.2%","2.8s"],["步数超限","max_steps=8","断点保存 + 异步工单","<0.3%","45min(工单)"]])
        },
    ],
    conclusions = [
        "ReAct 循环（Think-Act-Observe-Loop）是 Agent 的核心推理模式 CorpAssist 平均 3.7 步完成一个任务",
        "Agent 与纯对话的四个根本区别：状态机工具调用多步推理错误恢复",
        "LangGraph Checkpoint 通过 Redis 持久化实现了断点续传成功率达 98.3%",
        "max_steps=8 和 max_tokens=4000 的设定基于 2000 个任务的统计 99.7% 任务在 6 步内完成",
        "三级降级策略覆盖步数超限和 Token 超限场景仅 0.2% 的任务触发最高级降级"
    ],
    checklists = [
        "能用 Python 伪代码完整描述 ReAct 循环的四个阶段",
        "能说出 Agent 与纯对话的 4 个本质区别并举例说明",
        "能配置 LangGraph 的 RedisSaver Checkpoint 并解释其价值",
        "能解释 max_steps 和 max_tokens 的设定依据和降级策略",
        "能在面试中用具体数据（3.7 步 98.3% 成功率 0.2% 降级）支持观点"
    ],
    cheats = [
        ("ReAct 循环","Think → Act → Observe → Loop 四阶段迭代"),
        ("Agent vs 对话","状态机 + 工具调用 + 多步推理 + 错误恢复"),
        ("Checkpoint 格式","checkpoint:{thread_id}:{step} → Redis JSON"),
        ("Checkpoint 性能","写入 15-25ms · P99 45ms · 峰值 1200 次/秒"),
        ("max_steps=8 依据","99.7% 任务 6 步内完成 8 步是 3σ 边界"),
        ("三级降级","截断重试 → 换长模型 → 摘要压缩"),
        ("成功率提升","有 Checkpoint: 76% → 98.3%"),
        ("调试提升","回溯调试减少 60% 定位时间")
    ],
    interviews = [
        ("Agent 与普通 LLM 应用的本质区别是什么？",
         "四个本质区别。第一状态机架构 Agent 运行在 StateGraph 上每个节点读写共享状态而纯对话是无状态的请求响应。第二工具调用 Agent 的 LLM 输出结构化 tool_calls 系统执行后返回结果再输入给 LLM 形成闭环。第三多步推理 Agent 通过多轮 ReAct 循环逐步逼近目标而纯对话一次输出答案。第四错误恢复 Agent 可以重试降级请求人工介入纯对话遇到错误只能返回错误消息。CorpAssist 使用 LangGraph 实现这些能力生产数据显示有 Checkpoint 后任务成功率从 76% 提升到 98.3%。"),
        ("复杂任务 10 步以上的 Agent 架构怎么设计如何防止偏航？",
         "三步法。第一任务分解在 System Prompt 中要求 LLM 先将复杂任务拆分为子任务列表每个子任务作为独立的 LangGraph 子图执行避免单次推理路径过长。第二中间校验在每个子任务完成后插入 Validation Node 使用 LLM-as-Judge 检查结果是否与原始目标一致不一致则回退。第三 Checkpoint 回溯利用 LangGraph Checkpoint 的版本管理功能当偏航检测触发时自动回退到最近的正确状态。CorpAssist 在 15 步以上的任务中采用 Plan-and-Execute 模式偏航率从 23% 降至 4.1%。"),
        ("任务规划有哪些主流方法各适用什么场景？",
         "三种主流方法。ReAct 是最通用的模式适用于步骤数在 8 步以内的单轮任务优势是简单直接缺点是长任务容易偏航。Plan-and-Execute 适用于 10-20 步的复杂任务先由 LLM 生成完整的 Plan 然后逐步骤执行每步后验证 Plan 可以动态调整。Tree-of-Thought（ToT）适用于需要探索多种可能路径的任务如代码 Debug 和策略分析 LLM 在每个决策点生成多个候选通过评估函数选择最优路径。CorpAssist 的实践是：80% 简单任务用 ReAct 15% 复杂任务用 Plan-and-Execute 5% 探索性任务用 ToT。")
    ],
    practice_steps = [
        "用 Python 实现一个简化的 ReAct 循环支持 Think-Act-Observe 三阶段包含停止条件检查",
        "在 LangGraph 中配置 RedisSaver Checkpoint 模拟服务重启后的断点续传场景",
        "编写一个步数计数器装饰器当 Agent 步数超过 5 步时输出告警日志到文件中"
    ],
    judgments = [
        ("Agent 的步数设得越大越好？",
         "不是。步数越大 Token 消耗越大偏航概率越高。CorpAssist 的数据显示 99.7% 的任务在 6 步内完成。过大的步数上限等于允许 Agent 无限漫游。正确的做法是基于历史数据设定合理的上限超标后触发降级而不是无限制等待。"),
        ("Checkpoint 会拖慢系统性能？",
         "初期会。但通过 Redis Pipeline 批量写入后 P99 延迟仅 45ms 而带来的断点续传能力使任务成功率从 76% 提升到 98.3% 净收益远超成本。关键在于不要同步等待写入完成而是采用异步写入加定时刷盘的策略。")
    ],
    "demos/basics-02-react-agent-lab/",
    ["ReAct 循环实现至少覆盖 Think-Act-Observe 三个阶段",
     "Checkpoint 配置支持断点续传和回溯调试",
     "步数和 Token 预算控制有明确的超标降级策略"],
    [("LangGraph Checkpoint","https://langchain-ai.github.io/langgraph/concepts/persistence/"),("ReAct 论文","https://arxiv.org/abs/2210.03629"),("OpenAI Tool Use","https://platform.openai.com/docs/guides/function-calling")],
    "任务规划与分解"
)

# ===== CHAPTER 3 =====
write_chapter("basics-03-task-planning",
    "任务规划与分解",
    "约 30 分钟 · 阶段：架构认知 · 场景：S1",
    "当 Agent 需要处理超过 3 步的复杂任务时随意推理会导致偏航和 Token 浪费。任务规划是让 Agent 从随机探索变为系统化执行的关键能力。CorpAssist 中所有多步骤 Agent 都使用 Plan-and-Execute 模式。",
    "能实现 Plan-and-Execute 任务规划架构掌握子任务拓扑排序分解检查点断点续传和三级失败恢复机制的设计与编码。",
    "Plan-and-Execute 模式实现 | 任务依赖图拓扑排序 networkx | 检查点与断点续传 | 三级失败恢复机制 | 动态 Plan 调整策略",
    [
        {"h3": "Plan-and-Execute 模式",
         "paras": [
            "Plan-and-Execute 将 Agent 的任务执行分为两个阶段：首先由 Planning LLM 生成一份完整的执行计划（Plan）然后在 Executor 中逐步骤执行该计划。Plan 是一个 JSON 结构包含 steps 数组每个 step 有 id、description、tool、params、dependencies 和 status 六个字段。Planning LLM 的 System Prompt 中注入了可用工具列表和任务约束条件 top_p 设置为 0.1 以减少随机性确保计划质量。",
            "执行过程中每完成一个步骤后都会调用 Verify Node（LLM-as-Judge）检查该步骤的输出是否符合预期。如果验证通过将 status 标记为 completed 并进入下一步。如果验证失败有两种处理路径：重试当前步骤最多 3 次或动态调整 Plan 插入修正步骤或修改后续步骤的依赖关系。CorpAssist 的生产数据显示约 87.4% 的 Plan 在执行过程中不需要调整 9.2% 需要微调修改参数或重试 3.4% 需要大幅调整新增或删除步骤。",
            "Plan 的生成质量取决于 System Prompt 中的工具描述质量。CorpAssist 的工具注册表中每个工具包含 5 个关键字段：name、description、parameters（JSON Schema）、return_type、example_usage。其中 description 字段使用 LLM 自动生成优化版本将原始工具文档通过 GPT-4 压缩为 3 句以内的精炼描述。这一优化使 LLM 选择正确工具的概率从 82.1% 提升至 94.6%。"
         ],
         "rich": make_mermaid("flowchart TB\n    SUB[用户请求]-->PLAN[Planning LLM\\n生成 Plan JSON]\n    PLAN-->VAL[验证 DAG 合法性]\n    VAL-->|有环|REPLAN[要求重新规划]\n    VAL-->|合法|STEP[执行下一个 Step]\n    STEP-->VERIFY[Verify Node\\nLLM-as-Judge]\n    VERIFY-->|通过|NEXT{还有 Steps?}\n    VERIFY-->|失败|RETRY{重试次数<3?}\n    RETRY-->|是|STEP\n    RETRY-->|否|ADJUST[动态调整 Plan]\n    ADJUST-->STEP\n    NEXT-->|是|STEP\n    NEXT-->|否|DONE[任务完成 ✓]")
        },
        {"h3": "基于依赖图的拓扑排序分解",
         "paras": [
            "当 Plan 包含 10 个以上步骤时步骤间可能存在复杂的依赖关系：步骤 B 需要步骤 A 的输出步骤 C 需要步骤 A 和 B 的输出。这种依赖关系使用有向无环图（DAG）建模通过 networkx 库进行拓扑排序来确定执行顺序。在 CorpAssist 中 Planning LLM 输出 Plan 后系统会自动使用 networkx 验证 DAG 合法性检测环的存在如果存在环则要求 LLM 重新生成 Plan。",
            "拓扑排序的价值在于识别可并行执行的步骤。无依赖关系的步骤可以放入同一个 asyncio.gather 组中并发执行。CorpAssist 的数据显示对于 10 步以上的 Plan 拓扑排序平均能识别出 3.2 个可并行执行的步骤组使总执行时间减少 41%。例如一个周报生成 Plan 中查询日历事件和查询 Jira 任务没有依赖关系可以并行执行而生成报告依赖于前两者的结果必须串行等待。",
            "networkx 的实现非常简洁：创建一个有向图添加节点和边调用拓扑排序函数获得执行顺序调用有向无环图检测函数检测环。如果检测到环 CorpAssist 的 Planner 会删除环中的最新添加边并重新验证最多尝试 3 次若仍无法解决则要求 LLM 重新规划该部分。"
         ],
         "rich": make_code("import networkx as nx\nfrom typing import TypedDict, List\nimport asyncio\n\nclass TaskStep(TypedDict):\n    id: str\n    description: str\n    tool: str\n    params: dict\n    dependencies: List[str]\n    status: str  # pending/running/completed/failed\n\ndef validate_and_sort(steps: List[TaskStep]) -> List[str]:\n    \"\"\"验证 DAG 合法性并返回拓扑排序的执行顺序\"\"\"\n    G = nx.DiGraph()\n    for step in steps:\n        G.add_node(step[\"id\"])\n    for step in steps:\n        for dep in step[\"dependencies\"]:\n            G.add_edge(dep, step[\"id\"])\n    if not nx.is_directed_acyclic_graph(G):\n        cycles = list(nx.simple_cycles(G))\n        raise ValueError(f\"Plan 包含循环依赖: {cycles}\")\n    return list(nx.topological_sort(G))\n\ndef find_parallel_groups(steps: List[TaskStep]) -> List[List[str]]:\n    \"\"\"识别可并行执行的步骤组\"\"\"\n    G = nx.DiGraph()\n    for step in steps:\n        G.add_node(step[\"id\"])\n        for dep in step.get(\"dependencies\", []):\n            G.add_edge(dep, step[\"id\"])\n    levels = {}\n    for node in nx.topological_sort(G):\n        predecessors = list(G.predecessors(node))\n        if not predecessors:\n            levels[node] = 0\n        else:\n            levels[node] = max(levels[p] for p in predecessors) + 1\n    groups = {}\n    for node, level in levels.items():\n        groups.setdefault(level, []).append(node)\n    return list(groups.values())\n\nasync def execute_plan(steps: List[TaskStep]):\n    order = validate_and_sort(steps)\n    groups = find_parallel_groups(steps)\n    results = {}\n    for group in groups:\n        tasks = [execute_step(s, results) for s in steps if s[\"id\"] in group]\n        group_results = await asyncio.gather(*tasks)\n        results.update(group_results)\n    return results\n\nasync def execute_step(step: TaskStep, context: dict):\n    # 执行单个步骤\n    return {step[\"id\"]: f\"结果 for {step['id']}\"}")
        },
        {"h3": "检查点与断点续传",
         "paras": [
            "断点续传是多步任务的生命线。CorpAssist 在 Redis 中维护一个 plan 加线程 ID 的 Hash 结构字段包括 plan_json（完整计划）completed_steps（已完成步骤 ID 列表 JSON 数组）current_step（当前执行步骤）status（running/paused/completed/failed）。当 Agent 因任何原因中断后重启首先从 Redis 读取该 Hash 过滤掉已完成的步骤从 current_step 继续执行。",
            "重启后的执行流程：加载 Redis 中的 plan 状态用已完成的工具返回值重建上下文跳过已完成步骤从 current_step 开始执行每步完成后更新 completed_steps 和 current_step。这种设计使得即使中断发生在步骤执行过程中也只是重复执行该步骤而不会丢失数据。幂等性设计是关键每个工具的执行结果需要通过 idempotency_key 去重。",
            "CorpAssist 对 Checkpoint 的性能要求是：单次状态写入小于 30ms 全量 Plan 恢复小于 100ms。实际测试数据：单步 Checkpoint 写入平均 18ms（Redis Pipeline）全量 Plan 加载平均 42ms（包含反序列化时间）。Redis 实例使用 3 节点 Cluster RDB 持久化每小时一次 AOF 每秒刷盘确保极端情况下最多丢失 1 秒的状态数据。"
         ],
         "rich": make_code("import json\nimport redis.asyncio as aioredis\n\nclass PlanCheckpointer:\n    def __init__(self, redis_url: str = \"redis://localhost:6379/0\"):\n        self.redis = aioredis.from_url(redis_url, decode_responses=True)\n\n    async def save_plan(self, thread_id: str, plan: dict):\n        key = f\"plan:{thread_id}\"\n        pipe = self.redis.pipeline()\n        pipe.hset(key, \"plan_json\", json.dumps(plan, ensure_ascii=False))\n        pipe.hset(key, \"completed_steps\", json.dumps([]))\n        pipe.hset(key, \"current_step\", plan[\"steps\"][0][\"id\"])\n        pipe.hset(key, \"status\", \"running\")\n        pipe.expire(key, 86400)\n        await pipe.execute()\n\n    async def mark_complete(self, thread_id: str, step_id: str):\n        key = f\"plan:{thread_id}\"\n        completed = json.loads(\n            await self.redis.hget(key, \"completed_steps\") or \"[]\")\n        completed.append(step_id)\n        pipe = self.redis.pipeline()\n        pipe.hset(key, \"completed_steps\", json.dumps(completed))\n        pipe.hset(key, \"status\", \"completed\")\n        await pipe.execute()\n\n    async def recover_plan(self, thread_id: str) -> dict:\n        key = f\"plan:{thread_id}\"\n        data = await self.redis.hgetall(key)\n        return {k: json.loads(v) if k in [\"plan_json\",\"completed_steps\"]\n                else v for k, v in data.items()}\n\n    async def get_remaining_steps(self, thread_id: str) -> list:\n        plan = await self.recover_plan(thread_id)\n        completed = set(plan.get(\"completed_steps\", []))\n        all_steps = plan[\"plan_json\"][\"steps\"]\n        return [s for s in all_steps if s[\"id\"] not in completed]")
        },
        {"h3": "失败恢复机制",
         "paras": [
            "工具执行失败是 Agent 系统的常态而非异常。CorpAssist 设计了三层失败恢复机制。第一层自动重试：网络类错误（HTTP 5xx 超时连接断开）使用指数退避重试 initial=1s multiplier=2 max_interval=30s max_retries=3。对于业务类错误（参数错误权限不足）重试无意义直接进入第二层。第二层降级策略：跳过该步骤（如果后续步骤不依赖它）使用默认值替代（如果字段有默认值）简化版工具（如用本地文件替代远程 API）。第三层人工介入：当以上两层都失败时自动创建 Jira 工单包含失败步骤的完整上下文尝试记录和推荐处理方案通知对应负责人。",
            "降级策略的选择依赖步骤间依赖关系的分析。如果一个失败步骤没有后续步骤依赖它降级策略是跳过。如果有依赖则需要判断是否有替代数据来源。例如 Calendar API 失败时可以从 Mail API 获取会议邀请邮件来提取日程信息。CorpAssist 的工具注册表中每个工具都有一个 fallback_tools 字段指定了降级时可替代的工具列表。",
            "生产数据统计：在所有工具调用中约 4.2% 会遇到失败。其中 62% 通过第一层重试恢复 23% 需要第二层降级 15% 最终需要人工介入。需要人工介入的案例中平均处理时间（从工单创建到解决）为 45 分钟其中 80% 在 1 小时内解决。全年 SLA 为 99.95% 的自动处理率意味着 10000 次调用中只有 5 次需要人工介入。"
         ],
         "rich": make_mermaid("flowchart TB\n    CALL[工具调用]-->RES{成功?}\n    RES-->|是|OK[返回结果]\n    RES-->|失败|L1{网络错误?}\n    L1-->|是|RETRY[指数退避重试\\n1s 2s 4s 8s 16s 30s]\n    RETRY-->RETRY_CHECK{重试<3次?}\n    RETRY_CHECK-->|是|CALL\n    RETRY_CHECK-->|否|L2\n    L1-->|否|L2[降级策略]\n    L2-->DECIDE{可以降级?}\n    DECIDE-->|跳过|SKIP[跳过此步]\n    DECIDE-->|默认值|DEFAULT[使用默认值]\n    DECIDE-->|替代工具|FALLBACK[调用 fallback 工具]\n    DECIDE-->|不可降级|L3[创建 Jira 工单]\n    L3-->NOTIFY[通知负责人]\n    SKIP-->CONTINUE[继续执行]\n    DEFAULT-->CONTINUE\n    FALLBACK-->CONTINUE")
        },
    ],
    conclusions = [
        "Plan-and-Execute 模式将任务执行分为规划与执行两个阶段验证节点的加入使偏航率降至 4.1%",
        "networkx 拓扑排序能自动识别并行步骤 10 步以上任务平均减少 41% 执行时间",
        "Redis 存储的 plan 状态支持毫秒级断点续传恢复时间平均 42ms",
        "三层失败恢复（重试到降级到人工）覆盖 99.95% 的异常场景",
        "工具描述的精确度从 82.1% 提升至 94.6% 关键在于 5 字段工具注册表设计"
    ],
    checklists = [
        "能画出 Plan-and-Execute 的架构时序图包含规划执行验证三个节点",
        "能用 networkx 实现任务依赖图的拓扑排序和环检测",
        "能设计基于 Redis 的断点续传方案并解释幂等性设计",
        "能设计三级失败恢复机制并说出每层的触发条件和处理方式",
        "能解释工具描述优化如何影响 LLM 的工具选择准确率"
    ],
    cheats = [
        ("Plan JSON 字段","id/description/tool/params/dependencies/status"),
        ("拓扑排序","nx.topological_sort(DAG) 获得执行顺序"),
        ("并行组识别","find_parallel_groups() 平均 3.2 组"),
        ("环检测","nx.is_directed_acyclic_graph(G)"),
        ("Redis Key","plan:{thread_id} → Hash 结构"),
        ("恢复性能","单步写入 18ms 全量恢复 42ms"),
        ("三层失败恢复","重试 62% → 降级 23% → 人工 15%"),
        ("SLA 自动率","99.95% 即 10000 次中仅 5 次需人工")
    ],
    interviews = [
        ("Plan-and-Execute 和 ReAct 的区别与各自的适用场景？",
         "ReAct 是动态推理——LLM 每步都思考下一步做什么适用于 8 步以内的简单任务灵活但不稳定。Plan-and-Execute 是先规划再执行——LLM 先生成完整的计划 JSON 然后逐步执行并在每步后验证。适用于 10-20 步的复杂任务稳定性高但灵活性低。在实践中 CorpAssist 对 80% 的简单请求使用 ReAct 对 20% 的复杂请求使用 Plan-and-Execute。两者也可以通过 LangGraph 的条件边结合：先用 ReAct 判断任务复杂度简单则直接用 ReAct 复杂则切换到 Plan-and-Execute。"),
        ("任务依赖图出现环怎么处理？",
         "首先在规划阶段使用 networkx 的 is_directed_acyclic_graph 检测环。如果检测到环有两种处理方式：自动修复删除环中的最新添加边相当于解除某个依赖关系最多尝试 3 次或者要求 LLM 重新生成 Plan。在 CorpAssist 中约 2.3% 的 Plan 初始会包含环自动修复的成功率为 91% 剩余 9% 需要 LLM 重新规划。出现环的常见原因是步骤间的依赖关系描述不精确例如步骤 A 需要步骤 B 的结果但步骤 B 也需要步骤 A 的结果这是典型的设计冲突。"),
        ("断点续传的幂等性怎么保证？",
         "每个工具调用都分配一个全局唯一的 idempotency_key 格式为线程 ID 加步骤 ID。工具收到后先检查该 key 是否已经处理过如果已处理则直接返回缓存的结果。同时工具的执行结果应该是幂等的多次执行同参数的工具应该产生相同结果查询类工具天然幂等写入类工具需要设计幂等逻辑。CorpAssist 的 Redis Checkpoint 在写入时会检查该步骤是否已在 completed_steps 中避免重复写入。这些措施共同保证了断点续传的幂等安全性。")
    ],
    practice_steps = [
        "使用 networkx 构建一个 6 步骤的任务依赖图计算拓扑排序并识别可并行执行的步骤组",
        "实现 Redis 中 plan 状态的增删改查操作支持断点续传场景模拟服务重启恢复",
        "编写一个指数退避重试装饰器支持 initial=1s multiplier=2 max_retries=3"
    ],
    judgments = [
        ("所有任务都应该先规划再执行？",
         "不是。对于 1-3 步的简单任务如查询天气翻译文本 Plan 的生成成本（一次 LLM 调用加 0.5 秒延迟）超过了它带来的收益。CorpAssist 的判断是步骤数大于 5 或者步骤间有依赖关系的复杂任务才需要 Plan-and-Execute。"),
        ("失败恢复时重试次数越多越好？",
         "不是。重试次数的增加会线性增加延迟和 Token 消耗。CorpAssist 的数据显示 3 次重试可以恢复 62% 的失败案例而如果再增加到 5 次恢复率仅提升到 68% 但延迟增加了 67%。3 次是性价比最高的平衡点。")
    ],
    "demos/basics-03-task-planning-lab/",
    ["Plan-and-Execute 实现包含 Plan 生成 Step 执行 结果验证三个节点",
     "拓扑排序实现正确识别并行步骤",
     "失败恢复至少支持重试和降级两级"],
    [("networkx 文档","https://networkx.org/documentation/stable/"),("LangGraph Plan-Execute","https://langchain-ai.github.io/langgraph/how-tos/plan-and-execute/"),("Redis Hash","https://redis.io/docs/data-types/hashes/")],
    "记忆与工具生态"
)

print("Course 1 done: 3 of 12 chapters generated")
