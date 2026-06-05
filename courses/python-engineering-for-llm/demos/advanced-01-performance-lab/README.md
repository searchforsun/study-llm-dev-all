# Demo：性能与资源

对应章节：[性能与资源](../../index.html#ch-advanced-01-performance)

## 目标

- 用 cProfile 定位 Python 热点函数
- 理解 RAG 批处理中的 CPU/IO 瓶颈排查思路

## 步骤

```powershell
cd demos/advanced-01-performance-lab
python profile_demo.py
```

## 验收

- [ ] 脚本输出 cProfile 统计表（含 `ncalls`、`tottime`）
- [ ] 能指出耗时最高的 1 个函数名
- [ ] 完成章节测验
