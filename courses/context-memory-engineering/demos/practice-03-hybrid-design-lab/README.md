# Demo：混合记忆架构

[返回章节](../../index.html#ch-practice-03-hybrid-design)

## 目标

实现三层混合记忆的写穿透（write-through）和读合并（read-merge），验证会话层修正覆盖长期层（Redis/Milvus 生产实现见章节正文；本 lab 为**内存示意**）。

## 前置准备

- Python 3.10+
- 已阅读 [`practice-01-short-term-lab`](../practice-01-short-term-lab/README.md) 的 session 契约（可选）
- 长期记忆设计见 [`practice-02-long-term-lab`](../practice-02-long-term-lab/README.md)

## 目录

| 路径 | 说明 |
|------|------|
| `session_store.py` | 内存会话层 |
| `fact_store.py` | 内存长期事实库 + superseded 标记 |
| `hybrid_memory.py` | Writer / Reader / MemRouter |
| [`layer-table.md`](layer-table.md) | 三层对照表 |

## 验收命令

```bash
cd demos/practice-03-hybrid-design-lab
pip install -r requirements.txt
python -m pytest -q test_hybrid_lab.py
```

期望：4 项测试全绿；偏好修正后会话覆盖长期层。

## 步骤（扩展）

1. **HybridMemoryWriter**：同步写 session，提取事实写 long_term。
2. **HybridMemoryReader**：按 MemRouter 决定读 session / long_term，去重合并。
3. **MemRouter**：问候语仅查 session；操作/知识类查询触发 long_term。
4. **一致性**：用户说「偏好错了，改邮箱」→ `mark_superseded` 后长期层仅保留新偏好。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] 写穿透：session + long_term 均有数据
- [ ] 读合并：去重有效
- [ ] MemRouter：问候语不查 long_term
- [ ] 一致性：邮箱偏好覆盖短信
