# Demo：生产坑：上下文、FIM 与工具环

对应章节：[生产坑：上下文、FIM 与工具环](../../index.html#ch-practice-06-production-pitfalls)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `main.py` | 主程序入口 |
| `config.py` | 配置项 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-code-assistant/demos/practice-06-production-pitfalls-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-code-assistant/demos/practice-06-production-pitfalls-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：生产坑复现
运行含有典型生产问题的代码，观察异常行为。
```bash
python pitfall_demo.py --scenario dirty-pdf
```
**验收标准**：问题被稳定复现，日志输出错误详情与影响范围。

### 练习 2：修复方案验证
切换到修复模式，验证解决方案正确消除问题。
```bash
python pitfall_demo.py --scenario dirty-pdf --fix
```
**验收标准**：修复后管线正常运行，输出符合预期结果。

### 练习 3：避坑清单生成
基于本次实践生成可复用的生产部署避坑清单。
**验收标准**：`checklist.md` 包含 5 条以上实践验证的最佳实践。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

