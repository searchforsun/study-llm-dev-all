# Demo：整体架构与 RAG vs 微调选型

[章节](../../index.html#ch-basics-02-architecture)

## 目标
画出 CorpAssist 四层架构图、数据流图，用决策树分析 RAG vs 微调选型。

## 文件
- `architecture_diagram.py` — 四层架构图生成器
- `dataflow_diagram.py` — 数据流时序图生成器

## 验收标准
- 完成架构图（四层，标注技术栈）
- 完成数据流图（索引阶段 + 问答阶段）
- 用决策树分析一个选型案例

## 运行
```bash
python architecture_diagram.py --output ./output/architecture.png
```
