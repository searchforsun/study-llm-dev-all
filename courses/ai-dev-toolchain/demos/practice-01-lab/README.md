# practice-01-lab: AI 生成测试用例

对应章节：[AI 生成测试用例](../../index.html#ch-practice-01)

## 前置

- Python 3.12+
- `pip install uv`（推荐）或 pip
- 安装了 pytest / pytest-asyncio / pytest-cov / httpx

## 文件

| 文件 | 说明 |
|------|------|
| `test_generator.py` | 测试生成器 (AI Prompt + 结构化模板) |
| `requirements.txt` | Python 依赖 |
| `pytest.ini` | pytest 配置 (覆盖分支模式) |

## 快速开始

### Windows PowerShell
```powershell
cd courses/ai-dev-toolchain/demos/practice-01-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/ai-dev-toolchain/demos/practice-01-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：Given-When-Then 测试生成
使用 AI 为指定的 Service 函数生成单元测试，覆盖正常路径、异常路径和边界条件。
```bash
python test_generator.py --func get_permissions --output tests/test_permissions.py
```
**验收标准**：生成的测试包含至少 1 条正常路径 + 2 条异常路径 + 2 条边界条件，全部通过。

### 练习 2：Mock/Fixture 自动生成
识别函数依赖的外部服务，生成 conftest.py 管理 Mock Fixture。
```bash
python test_generator.py --mode fixtures --source app/services/permission.py
```
**验收标准**：conftest.py 包含 AsyncSession、httpx.AsyncClient 和自定义 Repository 的 Mock Fixture。

### 练习 3：覆盖率驱动补充
运行 pytest-cov 生成覆盖率报告，让 AI 分析缺失行并补充测试。
```bash
pytest --cov=app --cov-branch --cov-report=xml --cov-report=term-missing
python test_generator.py --mode coverage-gap --coverage coverage.xml
```
**验收标准**：分支覆盖率 >=85%，AI 补充了至少 3 个缺失分支的测试。

### 练习 4：RAG 管线集成测试
为 RAG 管线生成集成测试，覆盖检索/生成/流式三个场景。
```bash
pytest tests/test_rag_integration.py -v
```
**验收标准**：三个集成测试场景全部通过。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 练习 1-4 全部可运行并输出预期结果
- [ ] 分支覆盖率 >=85%
- [ ] 完成对应章节测验

## 下一章

[AI 生成文档与 Schema](../../index.html#ch-practice-02) · Demo：[AI 生成文档与 Schema](../practice-02-lab/)
