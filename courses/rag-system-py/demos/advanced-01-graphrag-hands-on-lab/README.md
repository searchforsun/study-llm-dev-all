# Demo：GraphRAG 动手实践

对应章节：[GraphRAG 动手实践](../../index.html#ch-advanced-01-graphrag-hands-on)

## 概述

本 Demo 使用 Microsoft GraphRAG 框架从 CorpAssist 组织架构文档中提取实体和关系，构建知识图谱并实现全局/局部搜索。核心流程：文档切分 → LLM 实体提取 → 关系识别 → Leiden 社区检测 → 社区摘要生成 → Global Search（社区摘要聚合）和 Local Search（实体邻域检索）。

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key
- 需安装 `pip install graphrag`
- 建议文档量：10-50 篇（索引构建较耗时）

## 文件

| 文件 | 说明 |
|------|------|
| `graphrag_init.py` | 索引目录初始化与 settings.yaml 配置 |
| `run_index.py` | 编程方式运行索引构建 |
| `graphrag_query.py` | Global Search 与 Local Search 查询引擎 |
| `compare_scenarios.py` | GraphRAG vs 朴素 RAG 对比演示 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 练习

### 练习 1：索引构建
准备 5-10 篇组织架构文档，初始化 GraphRAG 索引目录，运行索引管线。**验收**：生成 entities/relationships/communities/community_reports 四份 parquet 输出。

### 练习 2：Global Search
测试全局搜索：「公司各部门的核心能力分布」。**验收**：答案综合多社区信息，包含实体和关系引用。

### 练习 3：Local Search
测试局部搜索：「张三的汇报关系和参与项目」。**验收**：答案准确描述实体邻域结构。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 索引构建完成，输出文件格式正确
- [ ] 完成对应章节测验

## 下一章

[Grounding/Citation 实战](../../index.html#ch-advanced-02-grounding-citation) · Demo：[Grounding/Citation 实战](../advanced-02-grounding-citation-lab/)
