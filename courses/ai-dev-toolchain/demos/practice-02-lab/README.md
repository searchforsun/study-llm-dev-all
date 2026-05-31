# Demo：AI 生成文档与 Schema

对应章节：[AI 生成文档与 Schema](../../index.html#ch-practice-02)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `docs_generator.py` | 文档生成器 |
| `requirements.txt` | Python 依赖 |
| `pyproject.toml` | 项目配置 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/ai-dev-toolchain/demos/practice-02-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/ai-dev-toolchain/demos/practice-02-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：docstring 自动生成
为 Python 函数自动生成 Google 风格 docstring。
```bash
python -c "from app import document; print(document('utils.py'))"
```
**验收标准**：docstring 包含 Args、Returns、Raises 三要素。

### 练习 2：OpenAPI Schema 生成
为 FastAPI 端点生成 OpenAPI Schema 文档。
```bash
python -c "from app import gen_openapi; gen_openapi('docs/openapi.json')"
```
**验收标准**：生成的 Schema 符合 OpenAPI 3.0 规范，端点描述完整。

### 练习 3：README 与 API 文档
基于代码结构自动生成 README 和 API 使用文档。
```bash
python -c "from app import gen_readme; gen_readme('README.md')"
```
**验收标准**：README 包含安装说明、API 示例、配置表格。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[AI 辅助 Code Review 与调试](../../index.html#ch-practice-03) · Demo：[AI 辅助 Code Review 与调试](../practice-03-lab/)
