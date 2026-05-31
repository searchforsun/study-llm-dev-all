# Demo：RAG 评测实践

对应章节：[RAG 评测实践](../../index.html#ch-practice-04-rag-eval)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `eval_runner.py` | 评测脚本 |
| `test_dataset.json` | 测试数据集 |
| `report.py` | 报告生成器 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/rag-system-py/demos/practice-04-rag-eval-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/rag-system-py/demos/practice-04-rag-eval-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：评测集构建
基于文档集构建 Q&A 测试对，生成评测数据集。
```bash
python eval_runner.py --build-dataset --num-samples 50
```
**验收标准**：生成 `test_dataset.json`，包含 50 组 `question` + `ground_truth` 对。

### 练习 2：运行 RAGAS 指标评测
计算 Faithfulness、Answer Relevancy、Context Precision 等指标。
```bash
python eval_runner.py --ragas-metrics all
```
**验收标准**：输出完整评分表格，各指标得分 > 0.7 为合格。

### 练习 3：Ablation 实验
通过切换 chunk_size、top_k、rerank 等参数进行消融实验，对比效果差异。
```bash
python eval_runner.py --ablation --params '{"chunk_size": [256, 512, 1024]}'
```
**验收标准**：生成 ablation_report.md，含不同参数组合的 Recall/MRR/NDCG 对比。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

