# Demo：上下文组成与窗口预算

[返回章节](../../index.html#ch-basics-01-context-anatomy)

## 目标

完成 CorpAssist 客服场景的 Token 预算分配设计与验证，理解 LLM 上下文窗口的四层结构，并亲手搭建一个预算计算器。

## 前置准备

- Python 3.8+ 或 JDK 17+
- 可选：安装 tiktoken (`pip install tiktoken`)

## 步骤

1. **阅读预算模板**：打开 `templates/budget-template.yaml`（在 demo 目录中），阅读 CorpAssist 预算结构。

2. **设计 budget split**：为以下 CorpAssist 场景设计 32K 窗口的预算分配：
   - System: 角色身份 + 客服约束
   - Retrieval: 企业知识库 Top-5 chunk
   - History: 最近对话轮次
   - Tool: CRM 订单 / 工单查询结果
   - Reserve: 缓冲空间

3. **编写预算验证函数**：
   - Python 版：使用 `tiktoken` 计算每层 token，验证总计不超过 32K
   - Java 版：使用 `TokenBudget` 类（参考章节中的 Java 代码）

4. **运行验证**：执行你的脚本，输出类似结果：
   ```
   System: 4800 (15.0%)
   Retrieval: 12800 (40.0%)
   History: 6400 (20.0%)
   Tool: 4800 (15.0%)
   Reserve: 3200 (10.0%)
   Total: 32000/32000 (100.0%) ✓
   ```

5. **压力测试**：将 Retrieval 改为 Top-8，观察 budget 是否溢出，触发降级策略。

## 预期输出

一个可执行的预算计算脚本，能够输出每层 token 分配及总体验证结果。当预算超限时，脚本应打印告警。

## 验收清单

- [ ] 能画出 System/Tool/History/Retrieval 四层上下文结构
- [ ] 预算分配比例合理，总计不超过 32K
- [ ] 验证函数正确检测预算溢出
- [ ] 理解每层典型占比范围（System 15-25%, Retrieval 30-45% 等）
