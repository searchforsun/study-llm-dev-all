# Demo：知识质量运营

对应章节：[知识质量运营](../../index.html#ch-practice-03-quality)

## 目标

配置 stale/conflict 质量规则，填写 review queue 工单并完成 tombstone vs re-ingest 决策。

## 前置

- Python 3.10+
- 已阅读 `stale_rules.yaml` 与 conflict 检测脚本片段

## 步骤

```bash
cd demos/practice-03-quality-lab
# 1. 编辑 quality-rules.md：远程办公 v2/v3 场景
# 2. 校验规则 yaml 结构
python validate_quality.py
```

## 验收

| 命令 | 期望输出 |
|------|----------|
| `python validate_quality.py` | `PASS: 3 rules, 1 conflict case` |

手动验收：

- [ ] `meta_expired` 规则 when 表达式正确
- [ ] v2 superseded 工单 suggested_action 为 tombstone
- [ ] 说明 approve 后调用 incremental delete

## 文件

| 文件 | 用途 |
|------|------|
| `quality-rules.md` | 规则与工单练习 |
| `validate_quality.py` | 规则条数与 conflict case 校验 |
