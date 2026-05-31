# Demo：工作流与简历叙事

[章节](../../index.html#ch-advanced-02-portfolio)

## 目标

用状态图、MCP 集成故事和 STAR 法则包装 Agent 项目，输出可在简历和答辩中直接使用的素材。

## 练习内容

1. **STAR 案例**（star-template.md）：用 STAR 模板填写完整的 Agent 项目案例，S/T/A/R 每部分至少 50 字，R 部分必须包含量化指标
2. **状态图绘制**：用 Mermaid 画出 Agent 状态图，包含至少 6 个状态和 4 个条件转换
3. **MCP 故事**：列出你接入的 MCP 工具清单，每个工具包含 name、connected_system、tool_count、security_level

## 验收标准

- STAR 案例的 R（Result）包含至少 2 个量化指标（如时间减少百分比）
- 状态图使用 Mermaid stateDiagram-v2 语法，标注 interrupt 位置
- MCP 清单至少包含 3 个 Server、10 个工具

## 简历包装技巧

- 差评：「用了 LangGraph 做 Agent」→ 好评：「设计 Supervisor-Worker 多 Agent 架构，编排 5 个 Worker」
- 差评：「提升了效率」→ 好评：「审批周期从 8 小时降至 1.5 小时（-81%）」
