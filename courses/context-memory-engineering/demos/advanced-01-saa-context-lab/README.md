# Demo：Spring AI Alibaba 上下文工程

[返回章节](../../index.html#ch-advanced-01-saa-context)

## 目标

离线对照 SAA 的 ContextCompressAdvisor、ContextEditingAdvisor 与 StateGraph Reducer（Java/SAA 生产配置见章节正文；本 lab 为 **Python 示意**）。

## 前置准备

- Python 3.10+

## 目录

| 路径 | 说明 |
|------|------|
| `saa_context.py` | 压缩/编辑/Reducer/Checkpoint 示意 |

## 验收命令

```bash
cd demos/advanced-01-saa-context-lab
pip install -r requirements.txt
python -m pytest -q test_saa_context_lab.py
```

期望：4 项测试全绿。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] PII 脱敏与字段截断生效
- [ ] 80% 压缩阈值触发
- [ ] State Reducer + Checkpoint 示意正确
