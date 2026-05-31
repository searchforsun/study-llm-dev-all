# Demo：Grounding/Citation 实战

对应章节：[Grounding/Citation 实战](../../index.html#ch-advanced-02-grounding-citation)

## 概述

本 Demo 为 CorpAssist RAG 系统实现引用溯源与归因评分。核心组件包括 CitationRAGPipeline（带引用标记的 LCEL 管线）、GroundednessChecker（声明提取 + 归因评分）、ConfidenceTagger（段落级置信度标注 high/medium/low/unverifiable）、CitationValidator（引用格式与内容验证，检测幻觉引用）。满足企业合规场景对答案可追溯的要求。

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key
- 需已有 Chroma 向量索引

## 文件

| 文件 | 说明 |
|------|------|
| `citation_pipeline.py` | 带引用溯源的 RAG 管线 |
| `groundedness.py` | Groundedness 评分器 |
| `confidence_tagging.py` | 答案段落置信度标注 |
| `citation_validator.py` | 引用验证器与验收测试 |
| `requirements.txt` | Python 依赖 |
| `.env.example` | 环境变量模板 |

## 练习

### 练习 1：引用溯源问答
运行带引用标记的 RAG 管线。**验收**：答案包含 [1][2] 等引用标记，citations 数组包含对应的源 chunk 信息。

### 练习 2：Groundedness 评分
对 5 个问答对运行归因评分。**验收**：输出每个声明的 SUPPORTED/NOT_SUPPORTED 状态，总体得分 ≥ 0.8。

### 练习 3：幻觉引用检测
构造一个包含无效引用的答案，用 CitationValidator 检测。**验收**：验证器准确检出所有无效引用并列出错误类型。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 引用验证器通过全部测试用例
- [ ] 完成对应章节测验

## 下一章

所有章节已完成。回顾 [LangChain RAG 实战](../../index.html#ch-practice-01-langchain-rag) 重走全课程。
