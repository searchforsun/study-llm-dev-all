# Demo：长期记忆与向量记忆

[返回章节](../../index.html#ch-practice-02-long-term)

## 目标

从对话中提取结构化事实，写入带租户/用户隔离的事实库，验证召回范围、GDPR 删除与 TTL 过期（Milvus 生产实现见章节正文；本 lab 为**内存示意**）。

## 前置准备

- Python 3.10+
- 已阅读 [`practice-01-short-term-lab`](../practice-01-short-term-lab/README.md) 的 session 契约（可选）

## 目录

| 路径 | 说明 |
|------|------|
| `fact_extract.py` | 规则型事实提取（示意） |
| `fact_store.py` | 内存事实库 + 过滤/TTL/GDPR |
| `fact_schema.json` | 字段契约 |
| `sample_dialog.json` | 提取样例对话 |
| `eval_facts.json` | 评测期望（准确率 ≥80%） |
| [`fact_schema.md`](fact_schema.md) | 字段说明 |

## 验收命令

```bash
cd demos/practice-02-long-term-lab
pip install -r requirements.txt
python -m pytest -q test_fact_lab.py
```

期望：4 项测试全绿；提取准确率 ≥80%。

## 步骤（扩展）

1. **事实提取**：阅读 `sample_dialog.json`，运行 `fact_extract.extract_facts_from_dialog`。
2. **写入事实库**：`InMemoryFactStore.upsert`（生产环境换 Milvus + embedding）。
3. **召回范围**：`recall` 必须带 `tenant_id` + `user_id` 过滤。
4. **GDPR 删除**：`gdpr_delete` 后该用户事实不可召回。
5. **TTL**：`ttl=1min` 写入后 `purge_expired` 验证过期。

## 验收清单

- [ ] pytest 套件通过
- [ ] 提取准确率 ≥80%（eval_facts.json）
- [ ] 召回限定用户范围
- [ ] GDPR 级联删除验证通过
