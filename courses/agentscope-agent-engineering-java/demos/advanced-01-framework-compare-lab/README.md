# Demo：CorpAssist 框架选型决策矩阵

对应章节：[框架选型对比](../../index.html#ch-advanced-01-framework-compare)

## 前置

- 已完成本课 practice 阶段或具备 AgentScope Java / SAA Graph 经验
- 无需运行服务，以表格与文档为主

## 文件

| 文件 | 说明 |
|------|------|
| `selection-matrix.md` | CorpAssist S1–S3 框架选型矩阵（可填） |
| `migration-estimate.md` | LangGraph4j → AgentScope Java 迁移人日模板 |
| `verify-matrix.sh` / `verify-matrix.ps1` | 检查矩阵必填维度是否完整 |

## 快速开始

```powershell
cd demos/advanced-01-framework-compare-lab
.\verify-matrix.ps1
```

## 验收

- [ ] `selection-matrix.md` 中 S3 场景行已填写「推荐框架」与「理由」
- [ ] `migration-estimate.md` 含状态迁移、工具契约、HITL 三栏风险
- [ ] 执行 `.\verify-matrix.ps1` 输出 `matrix OK`
- [ ] 完成章节测验
