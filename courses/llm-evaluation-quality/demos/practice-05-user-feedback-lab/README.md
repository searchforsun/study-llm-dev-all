# Demo：用户反馈与迭代闭环

[章节](../../index.html#ch-practice-05-user-feedback)

## 内容
- `feedback-event.json` — 反馈事件结构
- `reflow_demo.py` — 回流流水线

## 验收标准
1. feedback event 含 trace_id + labels
2. reflow pipeline 可运行

## 操作步骤
1. 阅读 feedback-event.json 结构
2. 写 thumbs_down 到 jsonl 的 3 步
3. 定义 P0 badcase 响应 SLA
