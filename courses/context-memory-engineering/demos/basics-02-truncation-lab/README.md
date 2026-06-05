# Demo：截断、摘要与滑动窗口

[返回章节](../../index.html#ch-basics-02-truncation)

## 目标

对比 FIFO 截断与滑动窗口策略，验证 token 预算与约束丢失检测（生产 LLM 语义截断见章节正文；本 lab 为**离线示意**）。

## 前置准备

- Python 3.10+
- 本 lab 附带的 [`conversation-10turn.json`](conversation-10turn.json)（CorpAssist 客服 10 轮样例）

## 目录

| 路径 | 说明 |
|------|------|
| `truncation.py` | FIFO / SlidingWindow / 约束检测 |
| `conversation-10turn.json` | 10 轮对话 + 约束列表 |
| [`trim-compare.md`](trim-compare.md) | 策略对照速查 |

## 验收命令

```bash
cd demos/basics-02-truncation-lab
pip install -r requirements.txt
python -m pytest -q test_truncation_lab.py
```

期望：4 项测试全绿；FIFO 不超预算；滑动窗口保留最近 5 轮并生成摘要。

## 步骤（扩展）

1. **FIFO**：`FifoTruncation(max_tokens=…).trim(turns)` 从最新轮次向前保留。
2. **滑动窗口**：`SlidingWindow(window_turns=5)` 保留最近 5 轮，旧轮次折叠为 `[SUMMARY]`。
3. **约束**：`assemble_context` 将 `constraints` 固定置顶；`detect_constraint_loss` 检测被删轮次中的约束关键词。
4. **对比**：调整 `max_tokens` / `window_turns`，观察保留轮次与约束风险。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] FIFO 输出 token 数 ≤ 预算
- [ ] 滑动窗口保留 5 轮 + 摘要
- [ ] 约束置顶且丢失检测可报告风险
