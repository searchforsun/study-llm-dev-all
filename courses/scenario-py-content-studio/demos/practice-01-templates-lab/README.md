# Demo：模板引擎与批量生成

对应章节：[模板引擎与批量生成](../../index.html#ch-practice-01-templates)

## 前置
- Python 3.12+, OpenAI API Key

## 实验内容
1. 用 Jinja2 注册 ContentTemplate 模板
2. 测试变量替换和条件渲染
3. 用 BatchGenerator 批量生成 100 条内容

## 验收
- 模板渲染正确替换变量
- 条件语句（if/for）生效
- 批量生成可并发执行

核心文件：`template_engine.py`, `batch_generator.py`
