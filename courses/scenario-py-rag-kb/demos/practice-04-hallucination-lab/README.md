# Demo：幻觉抑制与答案治理

对应章节：[幻觉抑制与答案治理](../../index.html#ch-practice-04-hallucination)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `guard.py` | 幻觉检测与引用强制 |
| `app.py` | FastAPI 服务 |
| `config.py` | 配置项 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-rag-kb/demos/practice-04-hallucination-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-rag-kb/demos/practice-04-hallucination-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：拒答策略实现
当检索结果置信度低于阈值时，拒绝回答并提示用户补充信息。
```bash
python app.py --confidence-threshold 0.6
```
**验收标准**：对于无关问题返回预设的拒答提示。

### 练习 2：引用强制校验
验证模型答案中的每个陈述都有对应的引用文档支持。
```bash
python guard.py --check-citations
```
**验收标准**：发现无引用陈述时触发告警，拒绝无来源输出。

### 练习 3：人工复核队列
将低置信度的问答对推送到人工复核队列（Redis List）。
**验收标准**：Redis 中 `review_queue` 列表包含待审核条目，可查看驳回/通过操作。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[评测闭环与增量更新](../../index.html#ch-practice-05-eval-loop) · Demo：[评测闭环与增量更新](../practice-05-eval-loop-lab/)
