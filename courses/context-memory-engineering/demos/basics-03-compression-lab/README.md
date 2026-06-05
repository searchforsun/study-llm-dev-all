# Demo：上下文压缩入门

[返回章节](../../index.html#ch-basics-03-compression)

## 目标

实现 Token 阈值触发器与规则型摘要压缩，对比压缩前后 token 节省与实体保留率（LLM/SAA 生产实现见章节正文；本 lab 为**离线示意**）。

## 前置准备

- Python 3.10+
- 本 lab 附带的 [`conversation-10turn.json`](conversation-10turn.json)

## 目录

| 路径 | 说明 |
|------|------|
| `compression.py` | CompressionTrigger + RuleBasedCompressor |
| [`compress-trigger.md`](compress-trigger.md) | 触发策略速查 |

## 验收命令

```bash
cd demos/basics-03-compression-lab
pip install -r requirements.txt
python -m pytest -q test_compression_lab.py
```

期望：4 项测试全绿；80% 阈值触发、压缩后 token 下降、实体保留 ≥90%。

## 步骤（扩展）

1. **CompressionTrigger**：History 层 token ≥ budget×80% 时 `should_compress=True`。
2. **RuleBasedCompressor**：提取订单/地址/约束，生成 `[COMPRESSED_HISTORY]` 摘要块。
3. **对比**：打印 `before_tokens` / `after_tokens` / `savings_ratio`。
4. **扩展**：替换 `RuleBasedCompressor` 为真实 LLM 摘要调用。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] 80% 阈值逻辑正确
- [ ] 压缩后 token 显著下降
- [ ] 关键实体（订单号、约束）保留在摘要中
