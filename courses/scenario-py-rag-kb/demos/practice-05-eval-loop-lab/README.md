# Demo：评测闭环与增量更新

对应章节：[评测闭环与增量更新](../../index.html#ch-practice-05-eval-loop)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `eval_runner.py` | 评测闭环 |
| `pipeline.py` | 增量索引管线 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-rag-kb/demos/practice-05-eval-loop-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-rag-kb/demos/practice-05-eval-loop-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：评测闭环搭建
构建自动评测流水线，每次索引更新后自动运行 RAGAS 评测。
```bash
python eval_runner.py --auto-eval --watch-dir ./data
```
**验收标准**：索引变化后自动触发评测，输出回归对比报告。

### 练习 2：坏例归因
分析低分案例，定位是分块问题、检索问题还是模型生成问题。
```bash
python eval_runner.py --root-cause --badcase-id 5
```
**验收标准**：输出坏例归因报告，标注问题类别与改进建议。

### 练习 3：增量索引
实现增量索引更新，仅重新索引变更的文档。
```bash
python pipeline.py --incremental --watch-dir ./docs
```
**验收标准**：新增/修改文档后，增量索引耗时 < 全量索引的 20%。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生产坑：数据、权限与索引](../../index.html#ch-practice-06-production-pitfalls) · Demo：[生产坑：数据、权限与索引](../practice-06-production-pitfalls-lab/)
