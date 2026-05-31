# Demo：上下文压缩入门

[返回章节](../../index.html#ch-basics-03-compression)

## 目标

实现 Token 阈值触发器、LLM 摘要压缩和 Spring AI Alibaba 压缩 Advisor 配置，对比压缩前后的 token 节省量与信息保留度。

## 前置准备

- Python 3.8+ 或 JDK 17+
- 可选：Spring AI Alibaba 依赖
- 可选：一个可调用的 LLM API

## 步骤

1. **编写压缩触发器**：实现 `CompressionTrigger` 类，设定 80% token 阈值，token 超过阈值时触发压缩。

2. **实现 LLM 摘要压缩**：编写压缩用 Prompt，要求 LLM 在摘要中保留用户身份、偏好、关键实体和约束。处理 8-10 轮对话的压缩。

3. **配置 SAA Advisor**（Java 侧）：使用 `ContextCompressAdvisor.builder()` 配置压缩策略，设定摘要模式、80% 阈值和审计日志。

4. **对比实验**：记录压缩前后 token 数、检查摘要是否保留关键实体、记录压缩耗时。

## 预期输出

压缩前后对比：12,400 tokens 压缩到 3,200 tokens，节省率约 74%。关键实体保留率从 100% 下降到约 95%。压缩耗时约 850ms。

## 验收清单

- [ ] 压缩触发器在 token > 80% 时正确触发
- [ ] LLM 摘要保留至少 90% 关键实体
- [ ] 理解压缩与截断的区别
- [ ] 能配置 SAA ContextCompressAdvisor
