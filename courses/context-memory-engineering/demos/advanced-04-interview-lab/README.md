# Demo：面试：上下文爆窗排障

[返回章节](../../index.html#ch-advanced-04-interview)

## 目标

使用 WindowOverflowDiagnoser 诊断爆窗根因，配置爆窗监控告警，用五步法组织面试级回答。

## 前置准备

- Python 3.8+

## 步骤

1. **实现 WindowOverflowDiagnoser**：分析 token 分布，检测 History 是否 > 35%、System 是否 < 10%、总 token 是否超预算。输出诊断报告。

2. **模拟爆窗场景**：生成一个 20 轮对话的 token 分布数据，运行 diagnoser 识别根因。

3. **修复验证**：实施修复策略（滑动窗口、缓存、工具截断），验证修复后 token 分布回归正常。

4. **配置爆窗告警**：编写告警规则 YAML，包含 window_overflow、history_spike、system_prompt_squeeze 三条规则。

5. **模拟面试练习**：找一个搭档，用五步法（现象→采集→定位→修复→预防）回答「对话变长后 LLM 变慢怎么排查」。

## 预期输出

Diagnoser 正确识别爆窗根因。修复后 token 分布回归健康范围。告警规则配置完整。

## 验收清单

- [ ] Diagnoser 正确识别根因
- [ ] 修复后 token 分布正常
- [ ] 告警规则配置完整
- [ ] 能用五步法清晰组织回答
