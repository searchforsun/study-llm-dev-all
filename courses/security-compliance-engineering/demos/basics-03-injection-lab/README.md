# Demo：注入与越狱

[章节](../../index.html#ch-basics-03-injection)

## 目标
实现多层注入防护和指令层级 Prompt。

## 步骤
1. 在 defense-plan.md 中写带指令层级的 system prompt
2. 实现 Java DelimiterGuard 的 wrapUserInput 方法
3. 实现 Python JailbreakDetector

## 验收标准
- [ ] defense-plan.md 含攻击手法列表和防护层
- [ ] DelimiterGuard 正确转义标签字符
- [ ] JailbreakDetector 识别 Base64 编码注入
