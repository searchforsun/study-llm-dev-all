# Demo：记忆的成本与延迟

[返回章节](../../index.html#ch-advanced-03-cost-latency)

## 目标

测量读写放大、会话事实缓存与懒加载对 P95 的改善（Redis 生产实现见章节正文；本 lab 为**离线示意**）。

## 前置准备

- Python 3.10+

## 目录

| 路径 | 说明 |
|------|------|
| `cost_latency.py` | LatencyMonitor / SessionFactCache / LazyMemoryLoader |

## 验收命令

```bash
cd demos/advanced-03-cost-latency-lab
pip install -r requirements.txt
python -m pytest -q test_cost_latency_lab.py
```

期望：4 项测试全绿；缓存命中率 ≥60%、P95 下降 ≥50%。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] 读写放大可测量
- [ ] 缓存命中率 ≥60%
- [ ] 懒加载跳过问候语召回
