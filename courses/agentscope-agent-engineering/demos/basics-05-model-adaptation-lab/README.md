# DashScope 模型路由实验室

## 目标
配置 turbo 分类 + plus 执行的双模型路由，并统计 usage。

## 前置条件
- Python 3.11+ · agentscope · `DASHSCOPE_API_KEY`

## 练习
1. 实现 router 字典（turbo / plus / 可选 max）
2. 对简单问句与复杂任务分别路由
3. 从 reply_stream 汇总 total_tokens 打印 NS3 指标

## 验收标准
- [ ] 运行 main.py 打印分类与执行所用模型名
- [ ] 输出 `total_tokens` 或 usage 字段
- [ ] 使用 DashScopeCredential，非硬编码 Key

## 参考
- 章节: basics-05-model-adaptation
