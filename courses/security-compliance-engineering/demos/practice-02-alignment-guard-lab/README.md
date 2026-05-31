# Demo：价值观与输出护栏

[章节](../../index.html#ch-practice-02-alignment-guard)

## 目标
实现政策模板和拒答机制。

## 步骤
1. 在 policy.yaml 中写话题限制和拒答模板
2. 实现 Java OutputGuardrail 的 check 方法
3. 实现 Python RefusalHandler

## 验收标准
- [ ] policy.yaml 含话题限制、拒答模板和品牌语调
- [ ] OutputGuardrail 拦截敏感话题
- [ ] RefusalHandler 提供多级拒答
