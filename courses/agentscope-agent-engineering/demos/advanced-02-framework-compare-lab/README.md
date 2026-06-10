# Demo：框架选型加权矩阵模板

对应章节：[框架选型对比](../../index.html#ch-advanced-02-framework-compare)

## 文件

| 文件 | 说明 |
|------|------|
| `selection-matrix.md` | 五维度加权评分表（AgentScope/LangGraph/CrewAI/Dify） |
| `migration-estimate.csv` | LangGraph → AgentScope 人日估算 |

## 练习

1. 为 CorpAssist S3 填写 `selection-matrix.md` 权重（实时性、多 Agent、HITL、双栈、团队熟悉度）。
2. 计算加权总分，S3 场景 AgentScope 应最高并写 3 条理由。
3. 根据 `migration-estimate.csv` 估算 8 Node StateGraph 迁移人日。

## 验收

- [ ] `selection-matrix.md` 含 ≥5 维度且权重合计 100%
- [ ] S3 推荐框架为 AgentScope 并附文字理由
- [ ] 完成章节测验
