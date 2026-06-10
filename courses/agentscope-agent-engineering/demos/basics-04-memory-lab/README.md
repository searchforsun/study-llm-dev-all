# 记忆控制实验室

## 目标
验证 AgentScope 多轮短期记忆与 max_tokens 裁剪行为。

## 前置条件
- Python 3.11+ · agentscope · `DASHSCOPE_API_KEY`

## 练习
1. 第一轮告知用户身份/区域，第二轮用指代词追问
2. 将 `max_tokens` 设为较小值，观察摘要或裁剪日志
3. 对照 context-memory-engineering 概念写 Working vs Semantic 各 1 例

## 验收标准
- [ ] 运行 main.py 第二轮正确引用第一轮实体
- [ ] 日志含 token 计数或裁剪提示
- [ ] Memory 配置显式传入 Agent

## 参考
- 章节: basics-04-memory
