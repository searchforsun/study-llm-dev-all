# Demo：注入与越狱防护实验室（C27）

[返回章节](../../index.html#ch-basics-03-injection)

## 目标

为 CorpAssist 用户输入实现分隔符包裹与注入模式拦截，理解多层防护（C27）中「结构化边界」的第一道闸门。

## 前置准备

- Python 3.10+
- 已阅读本章「攻击 / 防护层」与 OWASP LLM01 说明

## 步骤

1. 运行 `injection_guard_check.py` 理解 `wrap_user_input` 与正则黑名单。
2. 收集 5 条真实越狱 prompt（内部红队库或公开 benchmark），测试是否被拦截。
3. 对未拦截样本，讨论应归入哪一层：RAG 清洗 / 工具参数校验 / 输出审核。
4. 用 Java 伪代码描述等价 `ChatClientRequestAdvisor` 拦截点。
5. 记录分隔符被用户伪造时的缓解：随机 token、长度上限、schema 校验。

## 预期输出

- 验收脚本打印 `OK: injection guard blocked malicious sample`
- 一份「攻击样例 → 防护层」映射表（至少 5 行）

## 验收

```bash
cd demos/basics-03-injection-lab
python injection_guard_check.py
```
