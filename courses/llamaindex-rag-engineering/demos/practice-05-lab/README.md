# Demo：实战：CorpAssist 知识库 Python 版

对应章节：[实战：CorpAssist 知识库 Python 版](../../index.html#ch-practice-05)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `demo.py` | 端到端演示脚本 |
| `monitor.py` | 步数/Token 监控 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/llamaindex-rag-engineering/demos/practice-05-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/llamaindex-rag-engineering/demos/practice-05-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：端到端演示
运行完整演示脚本，覆盖核心业务场景。
```bash
python demo.py --scenario full
```
**验收标准**：演示覆盖 3 个以上业务场景，输出详细的执行日志。

### 练习 2：步数与 Token 监控
实现 Agent 步数和 Token 消耗的实时监控与统计。
```bash
python monitor.py --output report.json
```
**验收标准**：`report.json` 包含总步数、工具调用次数、输入/输出 Token 数、耗时。

### 练习 3：场景录制
录制演示场景为可复放脚本，支持回放与对比。
**验收标准**：录制文件可被回放工具加载并重现完全相同的执行流程。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

