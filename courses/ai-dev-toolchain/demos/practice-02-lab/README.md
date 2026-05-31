# practice-02-lab: AI 生成文档与 Schema

对应章节：[AI 生成文档与 Schema](../../index.html#ch-practice-02)

## 前置

- Python 3.12+ (FastAPI 项目)
- `pip install uv`（推荐）或 pip
- 安装 pydocstyle / black
- 安装 `npm install -g @stoplight/prism-cli` (可选)

## 文件

| 文件 | 说明 |
|------|------|
| `docs_generator.py` | 文档生成器 (docstring + OpenAPI + README) |
| `requirements.txt` | Python 依赖 |
| `pyproject.toml` | 项目配置 (含 pydocstyle/black 配置) |

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

### 练习 1：docstring 三种风格生成
使用 AI 为一个 FastAPI 路由函数生成 Google/NumPy/Sphinx 三种风格的 docstring。
```bash
python docs_generator.py --mode docstring --style google app/routers/rag.py
python docs_generator.py --mode docstring --style numpy app/routers/rag.py
python docs_generator.py --mode docstring --style sphinx app/routers/rag.py
```
**验收标准**：三种风格各生成完整的 docstring，Google 风格包含 Args/Returns/Raises 三要素。

### 练习 2：OpenAPI Schema 生成
从 FastAPI 项目的 /openapi.json 获取 Schema，用 AI 补充描述和示例值。
```bash
python docs_generator.py --mode openapi --input openapi.json --output docs/openapi_ai.yaml
```
**验收标准**：生成的 Schema 中每个端点都包含 description、参数包含 example 值、错误码包含 description。

### 练习 3：三阶段 README 生成
使用模板-填充-润色三阶段流水线生成 README。
```bash
python docs_generator.py --mode readme --output README.md
```
**验收标准**：README 包含简介、快速开始、API 端点表、配置说明和开发指南五节。

### 练习 4：文档一致性 CI 检查
配置 pydocstyle CI 门禁并运行一致性检查。
```bash
pydocstyle --convention=google --count app/
```
**验收标准**：docstring 覆盖率 >=80%。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 练习 1-4 全部可运行并输出预期结果
- [ ] docstring 覆盖率 >=80%
- [ ] 完成对应章节测验

## 下一章

[AI 辅助 Code Review 与调试](../../index.html#ch-practice-03) · Demo：[AI 辅助 Code Review 与调试](../practice-03-lab/)
