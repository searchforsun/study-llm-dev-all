# Demo：模板引擎与批量生成

## 目标
实现 Jinja2 模板渲染引擎与 MQ 批量调度。

## 文件说明
- `batch-csv-header.md` — CSV 变量表头示例
- `README.md` — 本说明

## 操作步骤
1. 写一条 Jinja2 模板，含 3 个变量
2. 用 Python 从 CSV 读取 100 行数据并渲染
3. 将渲染后的 prompt 推入 RabbitMQ 队列
4. 写 Worker 消费消息（可 mock LLM 调用）

## 验收标准
- [ ] 模板渲染 ≥ 100 条
- [ ] MQ 消息可正常发布与消费
- [ ] 进度追踪可实时查看
