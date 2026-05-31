# Demo：AI 生成测试用例

对应章节：[AI 生成测试用例](../../index.html#ch-practice-01)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `test_generator.py` | 测试生成器 |
| `requirements.txt` | Python 依赖 |
| `pytest.ini` | pytest 配置 |

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

### 练习 1：自动生成单元测试
使用 AI 为指定函数自动生成 pytest 单元测试。
```bash
python -c "from app import generate_tests; print(generate_tests('utils.py'))"
```
**验收标准**：生成的测试覆盖正常路径、边界条件和异常路径。

### 练习 2：Mock 与 Fixture
为外部依赖（数据库、API）生成 Mock 和 Fixture。
```bash
python -c "from app import generate_mocks; print(generate_mocks('service.py'))"
```
**验收标准**：Mock 类覆盖所有外部接口，Fixture 可复用。

### 练习 3：覆盖率报告
运行测试并生成覆盖率报告，分析未覆盖分支。
```bash
pytest --cov=app --cov-report=html tests/
```
**验收标准**：覆盖率 >= 80%，HTML 报告标注未覆盖行。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[AI 生成文档与 Schema](../../index.html#ch-practice-02) · Demo：[AI 生成文档与 Schema](../practice-02-lab/)
