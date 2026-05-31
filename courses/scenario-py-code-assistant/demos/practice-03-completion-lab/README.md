# Demo：补全与生成 Prompt

对应章节：[补全与生成 Prompt](../../index.html#ch-practice-03-completion)

## 前置
- Python 3.12+, OpenAI API Key

## 实验内容
1. 实现 FIM 补全服务
2. 测试不同风格的约束效果（google / project）
3. 验证后处理格式（去反引号、缩进对齐）

## 验收
- POST /v1/completions 返回补全代码
- 风格约束生效（Google 风格 vs 默认）
- 后处理正确对齐缩进

核心文件：`completion_service.py`
