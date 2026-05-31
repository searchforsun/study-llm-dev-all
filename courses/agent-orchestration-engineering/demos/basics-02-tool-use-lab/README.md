# Tool/Function Calling 实验室

## 目标
实现一组包含参数校验和错误处理的 CorpAssist 工具。

## 练习
1. 用 Pydantic 或 Java Record 定义 QueryOrderInput Schema
2. 实现 query_order 工具（含参数校验、业务异常、系统异常处理）
3. 添加工具调用的审计日志 AOP 切面
4. 测试模型传入错误参数时工具的恢复行为

## 验收标准
- [ ] 工具能正确处理正常/异常/边界情况
- [ ] 模型（模拟）能正确使用工具
- [ ] 审计日志完整记录工具调用

## 参考
- 章节: basics-02-tool-use
