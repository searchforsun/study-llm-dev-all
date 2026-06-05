# Demo：Agent 场景记忆

[返回章节](../../index.html#ch-advanced-02-agent-memory)

## 目标

内存版 Checkpoint、共享黑板与私有日志隔离（LangGraph/Redis 生产实现见章节正文；本 lab 为**离线示意**）。

## 前置准备

- Python 3.10+

## 目录

| 路径 | 说明 |
|------|------|
| `agent_memory.py` | Checkpoint / Blackboard / PrivateLog |

## 验收命令

```bash
cd demos/advanced-02-agent-memory-lab
pip install -r requirements.txt
python -m pytest -q test_agent_memory_lab.py
```

期望：4 项测试全绿。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] Checkpoint 保存/恢复
- [ ] 共享黑板读写
- [ ] 私有日志跨 Agent 隔离
- [ ] thread_id 与 session_id 对齐
