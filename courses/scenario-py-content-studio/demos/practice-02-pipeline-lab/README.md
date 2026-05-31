# Demo：生成 + 审核流水线

对应章节：[生成 + 审核流水线](../../index.html#ch-practice-02-pipeline)

## 前置
- Python 3.12+, OpenAI API Key

## 实验内容
1. 实现 ContentPipeline 处理流程
2. 测试 SafetyChecker 敏感词检测
3. 实现驳回重写 LLM 调用

## 验收
- 含敏感词的内容被拦截
- 通过检测的内容进入人工审核
- 驳回后重写内容不保留敏感词

核心文件：`content_pipeline.py`
