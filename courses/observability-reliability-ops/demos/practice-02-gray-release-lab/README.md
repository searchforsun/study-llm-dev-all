# Demo：灰度与版本管理

[章节](../../index.html#ch-practice-02-gray-release)

## 目标
设计 Prompt/模型/索引三维灰度方案。

## 步骤
1. 在 gray-release-plan.md 中设计 Prompt v1.3 灰度方案
2. 写 Java VersionRouter 的 resolvePromptVersion 方法
3. 配置回滚条件：error_rate > 2% 自动回滚

## 验收标准
- [ ] gray-release-plan.md 含三维灰度配置
- [ ] 灰度比例、观测指标、回滚条件清晰
- [ ] 回滚开关配置有效
