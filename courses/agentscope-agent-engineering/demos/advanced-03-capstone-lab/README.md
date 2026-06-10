# Demo：S3 短链路 Capstone 套件

对应章节：[Capstone：CorpAssist 短链路 Agent](../../index.html#ch-advanced-03-capstone)

## 前置

- Python 3.12+
- `pip install pytest`
- （可选）AgentScope 2.0 + DashScope

## 文件

| 文件 | 说明 |
|------|------|
| `capstone_agent.py` | Mock 版 Capstone Agent（无 AgentScope 依赖） |
| `golden_set.json` | 10 条评测用例 |
| `eval_capstone.py` | pytest 指标门禁 |
| `DELIVERY.md` | 交付文档模板 |

## 快速开始

```bash
cd demos/advanced-03-capstone-lab
pytest eval_capstone.py -v
cat metrics.json
```

## 验收

- [ ] `pytest eval_capstone.py -v` 全部通过
- [ ] `metrics.json` 中 `success_rate` ≥ 0.9
- [ ] `DELIVERY.md` 六章节已填写
- [ ] 完成章节测验
