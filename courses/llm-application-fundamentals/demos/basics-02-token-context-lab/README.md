# Demo：Token 预算与截断策略

对应章节：[Token、上下文窗口与费用](../../index.html#ch-basics-02-token-context)

## 目标

- 粗算单次对话与月度 Token 费用数量级
- 为 S1/S2 设计 `max_context` 与历史保留轮次

## 文件

| 文件 | 说明 |
|------|------|
| `estimate_cost.py` | 本地费用估算（**不调用 API**） |
| `token-budget-template.md` | 预算表模板与示例填法 |

## 运行估算脚本

```powershell
cd demos/basics-02-token-context-lab
python estimate_cost.py
python estimate_cost.py --prompt 12000 --completion 800 --model corpassist-fast
```

## 练习

1. 用脚本估算：制度问答一次 in=8000、out=400 的费用（改单价见脚本内 `PRICING`）。
2. 在 `token-budget-template.md` 填写 S2 多轮客服一行：8 轮历史 + system 2k Token 时是否触顶 32k 窗口。
3. 对比「200 页 PDF 全进 prompt」与「RAG top-5 共 3k Token」的单次费用比（数量级即可）。

## 验收

- [ ] 预算表含 S1、S2 两行，列齐全
- [ ] 能说明截断时 system 提示为何不能丢
- [ ] 完成章节测验
