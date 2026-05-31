# practice-04-lab: 实战：CorpAssist 开发效率提升

对应章节：[实战：CorpAssist 开发效率提升](../../index.html#ch-practice-04)

## 前置

- Python 3.12+
- `pip install uv`（推荐）或 pip
- Claude Code CLI 或等效 AI 编码工具
- FastAPI + SQLAlchemy 2.0 + LangChain + ChromaDB

## 文件

| 文件 | 说明 |
|------|------|
| `demo.py` | 端到端 RAG 管线开发演示脚本 |
| `eval_rag.py` | RAG 评测脚本 (命中率/精确率/延迟) |
| `monitor.py` | 开发步数和 Token 消耗监控 |
| `requirements.txt` | Python 依赖 |
| `spec_template.md` | Spec 文档模板 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/ai-dev-toolchain/demos/practice-04-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/ai-dev-toolchain/demos/practice-04-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：五阶段完整流程
按照 Spec-设计-代码-测试-文档五阶段流程从零构建 RAG 检索端点。
```bash
# 阶段一：编写 Spec
python demo.py --phase spec --output spec/rag-query.md
# 阶段二-五：AI 辅助开发完整流程
python demo.py --phase full --spec spec/rag-query.md
```
**验收标准**：完整流程产出 6 个文件、编译通过、测试覆盖率 >=90%。

### 练习 2：Agent 工作流
使用 Claude Code Agentic 模式生成 RAG 模块多文件代码。
```bash
claude "阅读 spec/rag-query.md，按计划逐文件生成 RAG 模块代码"
```
**验收标准**：Agent 生成 6 个文件，类型交叉引用一致，编译一次通过。

### 练习 3：评测脚本
运行评测脚本评估 RAG 管线检索质量。
```bash
pytest eval_rag.py -v --tb=short
python eval_rag.py --report report.json
```
**验收标准**：输出包含命中率、精确率(Precision@K)、P50/P99 延迟三项指标。

### 练习 4：效率 ROI 计算
运行效率对比脚本，计算 AI 辅助开发的 ROI。
```bash
python demo.py --mode roi --team-size 15 --monthly-salary 10000
```
**验收标准**：输出 ROI 计算报告，包含年度节省、工具成本和净收益。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 练习 1-4 全部可运行并输出预期结果
- [ ] 五阶段流程产出 6 个文件，覆盖率 >=90%
- [ ] 评测脚本输出三项指标
- [ ] 完成对应章节测验
