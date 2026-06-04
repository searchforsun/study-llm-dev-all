# Demo：LLM 应用威胁模型实验室

[返回章节](../../index.html#ch-basics-01-threat-model)

## 目标

为 CorpAssist 企业智能助手绘制应用层威胁矩阵，覆盖注入、越权、泄露三大支柱，并输出可纳入安全评审的 STRIDE 对照表。

## 前置准备

- Python 3.10+
- 已阅读本章「注入 / 越权 / 泄露」三节与 OWASP LLM Top 10 速查

## 步骤

1. 打开 `threat_matrix_check.py`，阅读 `REQUIRED_CATEGORIES` 与示例场景字典。
2. 在团队文档或本地笔记中，为 CorpAssist 各场景（客服问答、工单 Agent、RAG 知识库）各补充至少 2 条真实威胁条目。
3. 将条目归类到 `injection` / `privilege` / `leakage`，确保无空列。
4. 标注每条威胁的**信任边界**（用户输入、检索文档、工具回调、模型输出）与首选控制措施。
5. 与《生产级 Prompt 与对话工程》中的 system 约束对照，标出可能被注入覆盖的指令位点。

## 预期输出

- 一份至少 6 行的 CorpAssist 威胁矩阵（Markdown 或表格均可）
- 终端运行验收脚本显示 `OK` 及三大支柱场景计数

## 验收

```bash
cd demos/basics-01-threat-model-lab
python threat_matrix_check.py
```

期望最后一行包含：`OK: CorpAssist threat matrix covers 3 pillars`
