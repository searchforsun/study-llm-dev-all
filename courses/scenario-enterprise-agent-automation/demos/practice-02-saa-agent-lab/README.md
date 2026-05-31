# Demo：Spring AI Alibaba Agent/Graph

[章节](../../index.html#ch-practice-02-saa-agent)

## 目标

用 Spring AI Alibaba 配置 DashScope 模型、注册 ToolCallback、实现审批工具列表。

## 练习内容

1. **审批工具列表**（saa-config.yaml）：在 application.yml 中配置 DashScope 模型参数和 human-approval-tools 列表
2. **ToolCallback 实现**：自定义 3 个办公工具（查日历、发邮件、建工单）
3. **双栈对照**：将 SAA 实现与 LangGraph 实现对照，记录差异和选型理由

## 验收标准

- YAML 配置包含 model、temperature、max_steps、human_approval_tools
- 每个 ToolCallback 包含 name、description、input_schema 和 tool 实现
- 双栈对照表至少对比 5 个维度（Graph 定义、状态管理、审批、模型、部署）

## 关键概念

- `saa react agent`：SAA 标准 ReAct 循环封装
- `dashscope agent`：通过 DashScope 接入通义千问模型
- `dual stack s3`：LangGraph（Python 编排） vs SAA（Java 治理）
