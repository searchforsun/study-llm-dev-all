# Demo：RAG 评测实践

对应章节：[RAG 评测实践](../../index.html#ch-practice-04-rag-eval)

## 概述

本 Demo 使用 RAGAS 框架构建 CorpAssist 的自动化 RAG 评测管线。包含评测数据集构建工具（黄金标注 + LLM 合成）、RAGAS 四大指标计算器（Faithfulness/Answer Relevancy/Context Precision/Context Recall）、消融实验框架（chunk_size/top_k/retriever/alpha 参数扫描），以及 CI 集成脚本。

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key
- 需安装 `pip install ragas datasets`

## 文件

| 文件 | 说明 |
|------|------|
| `build_dataset.py` | 评测数据集构建（黄金 + 合成） |
| `synthetic_data.py` | LLM 辅助合成评测样本 |
| `ragas_eval.py` | RAGAS 指标评测器 |
| `ablation.py` | 消融实验框架 |
| `ci_eval.py` | CI 集成评测脚本 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 练习

### 练习 1：评测集构建
构建 20+ QA 对的评测集，覆盖 HR/IT/政策三类。**验收**：生成 `eval_dataset.jsonl`，每项含 question/ground_truth/contexts。

### 练习 2：运行 RAGAS 评测
计算 Faithfulness、Answer Relevancy、Context Precision、Context Recall。**验收**：输出完整评分表，各指标得分 ≥ 0.7。

### 练习 3：Ablation 实验
扫描 chunk_size 和 top_k 参数组合，对比效果。**验收**：生成 ablation_report.md，含最佳参数推荐。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[GraphRAG 动手实践](../../index.html#ch-advanced-01-graphrag-hands-on) · Demo：[GraphRAG 实战](../advanced-01-graphrag-hands-on-lab/)
