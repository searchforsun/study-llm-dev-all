# Demo：内容安全检测实验室（C26）

[返回章节](../../index.html#ch-basics-02-content-safety)

## 目标

实现 CorpAssist 输入/输出双端 moderation 闸门，对照 Python NeMo Guardrails 与 Spring AI Advisor 的职责划分。

## 前置准备

- Python 3.10+
- 可选：阅读 Spring AI `SafeGuardAdvisor` 文档

## 步骤

1. 阅读 `moderation_check.py` 中 `BLOCK_PATTERNS` 与 `moderate()` 逻辑。
2. 为 CorpAssist 客服场景补充 3 条应拦截的输入样例与 2 条应拦截的输出样例。
3. 将样例写入测试用例并运行脚本验证。
4. 在架构图中标出「输入 Advisor → LLM → 输出 Advisor」链路顺序。
5. 记录误杀（false positive）时的降级策略：转人工 / 通用拒答模板。

## 预期输出

- 扩展后的测试用例全部通过
- 文档中说明输入/输出审核各自负责的违规类型

## 验收

```bash
cd demos/basics-02-content-safety-lab
python moderation_check.py
```

期望输出：`OK: CorpAssist moderation gate passed 4/4 cases (C26)`
