# Demo：面试：安全案例

[章节](../../index.html#ch-advanced-04-interview)

## 目标
用 CORAL/STAR 框架准备安全面试回答。

## 步骤
1. 在 interview-answers.md 中用 CORAL 写注入防护题
2. 用 STAR 写安全事件处理经历
3. 画纵深防御 4 层架构图

## 验收标准
- [ ] interview-answers.md 含 3 个完整回答
- [ ] 使用 CORAL 或 STAR 框架
- [ ] 回答包含实际踩坑和数字

## 验收命令

```bash
# 文档型 lab：确认产物文件存在且非空
ls -la *.md *.rego 2>/dev/null | wc -l
# 期望：≥ 1；再按上方验收标准逐项勾选
```
