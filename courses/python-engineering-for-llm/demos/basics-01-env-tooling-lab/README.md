# Demo：CorpAssist-python 脚手架检查

对应章节：[环境、uv/poetry 与项目结构](../../index.html#ch-basics-01-env-tooling)

## 目标

- 理解 pyproject + src 布局与 Maven 模块的对照
- 列出 CorpAssist-python 第一版应提交的文件

## 文件

| 文件 | 说明 |
|------|------|
| `scaffold_check.py` | 检查 demo 目录骨架（**不联网**） |
| `pyproject.toml` | 示例项目声明（可 `uv sync` 扩展） |

## 运行

```powershell
cd demos/basics-01-env-tooling-lab
python scaffold_check.py
```

## 可选：本机 uv 演练

```powershell
uv init --name corpassist-python --package
uv python pin 3.12
uv add httpx pydantic pydantic-settings structlog
uv add --dev ruff mypy pytest
uv sync
python scaffold_check.py
```

## 练习

1. 对照脚本输出的 Maven 映射表，写一句你们仓库里 Spring 模块与 Python 包的分工。
2. 说明为什么 `uv.lock` 应进 Git 而 `.venv` 不应进 Git。
3. 在 `pyproject.toml` 中找出 `requires-python` 与 Maven `java.version` 的相似点。

## 验收

- [ ] 脚本运行无报错
- [ ] 能口头说出 src 布局三个子包（core / llm / rag）的规划
- [ ] 完成章节测验
