# Demo：实战：CorpAssist 记忆子系统

[返回章节](../../index.html#ch-practice-05-corpassist-memory)

## 目标

搭建内存版 CorpAssist 记忆 API 与多轮一致性评测套件（Redis/Milvus 生产拓扑见章节正文；本 lab 为**可运行最小集成**）。

## 前置准备

- Python 3.10+
- 已跑通 `practice-01`～`practice-04` lab 的 pytest（概念衔接）

## 目录

| 路径 | 说明 |
|------|------|
| `mem_api.py` | /v1/session + /v1/memory 示意 API |
| `eval_suite.py` | MemoryEvalSuite 多轮一致性评测 |
| `eval_scenarios.json` | 标准评测场景 |
| [`mem-checklist.md`](mem-checklist.md) | 发布门禁速查 |

## 验收命令

```bash
cd demos/practice-05-corpassist-memory-lab
pip install -r requirements.txt
python -m pytest -q test_corpassist_lab.py
```

期望：4 项测试全绿；多轮一致性 ≥95%。

## 步骤（扩展）

1. **API**：`get_session_messages` / `post_session_messages` / `post_memory_recall`。
2. **评测**：`MemoryEvalSuite.eval_consistency` 回放 `eval_scenarios.json`。
3. **门禁**：`avg_consistency >= 0.95` 再签字发布（章节 cross-layer consistency ≥0.85 另测）。
4. **扩展**：替换 InMemory 存储为 Redis + Milvus，对接 Spring BFF。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] Session API 读写正确
- [ ] Memory recall 含订单事实
- [ ] 多轮一致性 ≥95%
