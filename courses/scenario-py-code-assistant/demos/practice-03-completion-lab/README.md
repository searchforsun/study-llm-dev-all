# Demo：补全与生成 Prompt

对应章节：[补全与生成 Prompt](../../index.html#ch-practice-03-completion)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `completer.py` | FIM 补全实现 |
| `context.py` | 上下文拼装 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-code-assistant/demos/practice-03-completion-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-code-assistant/demos/practice-03-completion-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：FIM 补全实现
实现 Fill-in-the-Middle 补全服务，支持多语言代码补全。
```bash
python completer.py --prefix 'def hello(' --suffix ':\n    return "hi"'
```
**验收标准**：补全结果语法正确，与前后文衔接自然。

### 练习 2：上下文拼装
实现代码上下文收集器，自动提取光标附近的导入、函数、类定义。
```bash
python context.py --file sample.py --line 42
```
**验收标准**：输出包含相关导入语句、当前函数签名和前 20 行上下文。

### 练习 3：风格约束
通过 Prompt 约束强制代码风格（如类型注释、Google 风格 docstring）。
**验收标准**：生成的代码通过 flake8 检查且符合指定风格规范。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[延迟优化](../../index.html#ch-practice-04-latency) · Demo：[延迟优化](../practice-04-latency-lab/)
