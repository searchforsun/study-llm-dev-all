# Demo：AI 辅助 Code Review 与调试

对应章节：[AI 辅助 Code Review 与调试](../../index.html#ch-practice-03)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `reviewer.py` | AI Review 引擎 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/ai-dev-toolchain/demos/practice-03-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/ai-dev-toolchain/demos/practice-03-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：Bug 定位 Prompt
使用 AI Review 模式分析代码中的潜在 Bug。
```bash
python reviewer.py --file src/main.py --mode bug
```
**验收标准**：报告至少发现 1 个逻辑错误或边界条件遗漏。

### 练习 2：安全漏洞扫描
扫描代码中的安全漏洞（SQL 注入、XSS、硬编码密钥）。
```bash
python reviewer.py --file src/main.py --mode security
```
**验收标准**：发现安全漏洞并标注 CWE 编号和修复建议。

### 练习 3：CI 集成 Review
编写 CI 脚本，在 PR 时自动触发 AI Code Review。
**验收标准**：CI 中 AI Review 步骤成功运行，结果作为 PR 评论发布。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[实战：CorpAssist 开发效率提升](../../index.html#ch-practice-04) · Demo：[实战：CorpAssist 开发效率提升](../practice-04-lab/)
