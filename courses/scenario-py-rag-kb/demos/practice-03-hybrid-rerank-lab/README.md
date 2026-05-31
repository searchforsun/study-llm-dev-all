# Demo：混合检索 + Rerank 联调

对应章节：[混合检索 + Rerank 联调](../../index.html#ch-practice-03-hybrid-rerank)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `pipeline.py` | 混合检索管线 |
| `reranker.py` | Rerank 集成 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-rag-kb/demos/practice-03-hybrid-rerank-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-rag-kb/demos/practice-03-hybrid-rerank-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：BM25 + 向量融合检索
配置混合检索器，同时执行 BM25 关键词检索和向量语义检索。
```bash
python pipeline.py --retriever hybrid --alpha 0.5
```
**验收标准**：返回结果同时包含关键词命中结果和语义相似结果。

### 练习 2：Rerank 集成
在检索结果上叠加 BGE-Reranker 模型，对 top-k 结果重新排序。
```bash
python pipeline.py --rerank --rerank-model BAAI/bge-reranker-v2-m3
```
**验收标准**：Rerank 后前三结果 NDCG@3 提升 >= 5%。

### 练习 3：权重调优与延迟对比
调整混合检索权重 alpha 值，记录 Recall@10 与 P99 延迟。
```bash
python pipeline.py --alpha-sweep 0.0 0.25 0.5 0.75 1.0
```
**验收标准**：输出 alpha-Recall-延迟对照表，推荐最优 alpha 值。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[幻觉抑制与答案治理](../../index.html#ch-practice-04-hallucination) · Demo：[幻觉抑制与答案治理](../practice-04-hallucination-lab/)
