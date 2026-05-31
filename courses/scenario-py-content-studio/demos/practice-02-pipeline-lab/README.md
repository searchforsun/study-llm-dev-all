# Demo：生成 + 审核流水线

对应章节：[生成 + 审核流水线](../../index.html#ch-practice-02-pipeline)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `pipeline.py` | 审核流水线 |
| `reviewer.py` | 安全审核模块 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-content-studio/demos/practice-02-pipeline-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-content-studio/demos/practice-02-pipeline-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：内容安全审核
实现生成内容的安全审核模块，过滤敏感词与不合规内容。
```bash
python reviewer.py --check '待审核文本'
```
**验收标准**：敏感内容被标记并触发驳回流程，安全内容正常通过。

### 练习 2：人工复核交互
设计人工复核界面/API，支持审核员查看、修改、通过或驳回生成内容。
```bash
uvicorn app:app --reload --port 8001
```
**验收标准**：API 支持 POST `/review/approve` 和 `/review/reject`，驳回触发重新生成。

### 练习 3：驳回重写
实现驳回后可自动或手动触发重写，改进生成质量。
**验收标准**：重写后的内容保留原上下文变量，50% 以上驳回案例通过重写达标。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[千人千面个性化](../../index.html#ch-practice-03-personalize) · Demo：[千人千面个性化](../practice-03-personalize-lab/)
