# Demo：工作量与成本估算

[返回章节](../index.html#ch-basics-04-estimation)

## 目标

编制 CorpAssist MVP 的人天、Token 运营成本与硬件预算三栏报价。

## 验收标准

- [ ] `quote-sheet.md` 含人天/Token/硬件三栏
- [ ] Token 月成本计算函数可用
- [ ] 含 ROI 估算段落
- [ ] 列出所有假设条件

## 产出物

| 文件 | 说明 |
|------|------|
| `quote-sheet.md` | 三栏报价 + ROI 估算 |
| `token-cost.py` | Token 成本计算脚本 |
| `assumptions.md` | 估算假设条件清单 |

## 操作步骤

1. 填写人天/Token/硬件三栏报价
2. 用 Python 函数算月 Token 成本
3. 写 ROI 估算：节省客服人天 vs 总成本
4. 列出所有假设（QPS、模型、缓存率）
