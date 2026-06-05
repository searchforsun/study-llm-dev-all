# Demo：AI 编码度量周报

对应章节：[团队级 AI 编码度量与治理](../../index.html#ch-advanced-02)

## 目标

用模板生成一周 AI 工具链周报，含接受率、缺陷密度、合规三层指标。

## 步骤

1. 复制 `weekly-report.template.md` 为 `weekly-report.md`
2. 从章节表格填入示例数据（或你们团队真实数据）
3. 填写 `git-trailer.example` 说明如何标记 AI-Assisted 行
4. 写出 1 条告警阈值建议（见 `alert-rules.example.yaml`）

## 验收

- [ ] `weekly-report.md` 四段齐全：用量/效率/质量/合规
- [ ] 接受率与 PR AI 占比分栏，未混谈
- [ ] `alert-rules.example.yaml` 至少 2 条规则

## 验收命令

```bash
test -f weekly-report.md
grep -q "缺陷密度" weekly-report.md
```
