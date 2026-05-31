# Demo：模板引擎与批量生成（Python）

对应章节：[模板引擎与批量生成（Python）](../../index.html#ch-practice-01-templates)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `generator.py` | 模板引擎与生成 |
| `templates/` | 模板文件目录 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-content-studio/demos/practice-01-templates-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-content-studio/demos/practice-01-templates-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：模板变量引擎
实现 Jinja2 模板引擎，支持变量替换与条件渲染。
```bash
python generator.py --template welcome --vars '{"name":"张三"}'
```
**验收标准**：输出渲染后的完整文本，变量正确替换。

### 练习 2：批量生成任务
设计批量生成工作流，支持从 CSV 读取数据并批量渲染模板。
```bash
python generator.py --batch --input users.csv --output ./output
```
**验收标准**：100 条输入在 30 秒内完成生成，输出文件命名规范。

### 练习 3：进度与 MQ 集成
将批量任务推送到消息队列（Redis Pub/Sub 或 RabbitMQ），实现进度追踪。
**验收标准**：API 可查询任务进度百分比，支持取消正在进行的批任务。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生成 + 审核流水线](../../index.html#ch-practice-02-pipeline) · Demo：[生成 + 审核流水线](../practice-02-pipeline-lab/)
