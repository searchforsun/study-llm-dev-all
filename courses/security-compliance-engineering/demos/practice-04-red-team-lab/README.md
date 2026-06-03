# Demo：红队与演练

[章节](../../index.html#ch-practice-04-red-team)

## 目标
建立攻击用例库并集成安全回归。

## 步骤
1. 在 red-team-corpus.json 中写 10 个攻击用例
2. 实现 Python RedTeamRunner 的 run_single 方法
3. 设计 CI/CD 安全回归 pipeline

## 验收标准
- [ ] red-team-corpus.json 含至少 10 个用例
- [ ] 覆盖注入、越狱、越权三大类
- [ ] 每个用例有预期结果

## 验收命令

```bash
# 文档型 lab：确认产物文件存在且非空
ls -la *.md *.rego 2>/dev/null | wc -l
# 期望：≥ 1；再按上方验收标准逐项勾选
```
