# practice-03-lab: AI 辅助 Code Review 与调试

对应章节：[AI 辅助 Code Review 与调试](../../index.html#ch-practice-03)

## 前置

- Python 3.12+
- `pip install uv`（推荐）或 pip
- 安装 py-spy (`pip install py-spy`)
- GitHub Actions 可访问 (CI 集成)

## 文件

| 文件 | 说明 |
|------|------|
| `reviewer.py` | AI Review 引擎 (Bug 定位/安全扫描/性能分析) |
| `app.py` | 含有模拟缺陷的 FastAPI 服务 |
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

### 练习 1：Bug 定位 — 差异分析法
准备一段代码的"正确"和"错误"两组输出，让 AI 通过差异分析法定位 Bug。
```bash
python reviewer.py --mode diff-bug --file app.py --correct-output good.json --wrong-output bad.json
```
**验收标准**：AI 定位到导致差异的具体代码行，并给出修复建议。

### 练习 2：Bug 定位 — 因果链分析法
给 AI 提供一个模拟的运行时错误堆栈，让 AI 从错误症状追溯根因。
```bash
python reviewer.py --mode trace-bug --file app.py --stacktrace error.log
```
**验收标准**：AI 输出完整的因果链（错误行 -> 调用方 -> 根因），定位到根因函数。

### 练习 3：安全漏洞扫描
以攻击者视角审查 app.py，发现安全漏洞。
```bash
python reviewer.py --mode security --file app.py
```
**验收标准**：发现至少 3 个不同类别的安全漏洞（如 SQL 注入、XSS、硬编码密钥），每个标注风险等级和修复建议。

### 练习 4：性能热点分析
运行性能采样并让 AI 分析热点函数。
```bash
python -m cProfile -o profile.prof app.py
python reviewer.py --mode perf --profile profile.prof
```
**验收标准**：AI 输出前 3 个热点函数，每个包含原因分析和代码级优化建议。

### 练习 5：CI 集成 AI Review
配置 GitHub Actions 集成 AI Review 三层告警。
```bash
cp .github/ai-review-template.yml .github/workflows/ai-review.yml
```
**验收标准**：CI 中 AI Review 步骤成功运行，Blocking 问题阻断 PR 合并。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 练习 1-5 全部可运行并输出预期结果
- [ ] 安全审查发现至少 3 个漏洞
- [ ] 完成对应章节测验

## 下一章

[实战：CorpAssist 开发效率提升](../../index.html#ch-practice-04) · Demo：[实战：CorpAssist 开发效率提升](../practice-04-lab/)
