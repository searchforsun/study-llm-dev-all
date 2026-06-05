# Demo：隐私与合规实验室

对应章节：[数据、隐私与合规入门](../../index.html#ch-practice-03-data-privacy)

## 目标

- 为 CorpAssist S1～S4 标注 L1～L4 数据分级与出网策略
- 理解日志脱敏规则并在样例脚本中验证
- 用采购检查表评审一家 LLM 厂商合同要点

## 文件

| 文件 | 说明 |
|------|------|
| `data-classification-worksheet.md` | 模块 × 分级 × 部署形态工作表 |
| `egress-policy.example.yaml` | 网关出网/路由策略样例 |
| `log-redaction.example.py` | PII 掩码与安全日志 extra 示例 |
| `procurement-checklist.md` | 企业采购检查项（可打印勾选） |
| `sample-prompts.txt` | 含 PII 的脱敏练习样例 |

## 练习

1. 填写 `data-classification-worksheet.md` 中 S1、S2 两行。
2. 阅读 `egress-policy.example.yaml`，说明 L4 请求在配置中如何被 `deny`。
3. 运行 `log-redaction.example.py`，确认控制台输出无完整手机号。

```bash
python log-redaction.example.py
```
4. 在 `procurement-checklist.md` 中为通义或 DeepSeek 勾选 ≥6 项并注明证据。

## 验收

- [ ] S1/S2 分级、是否出网、审批角色已填
- [ ] `log-redaction.example.py` 对样例输出 `[PHONE]` / `[ID_CARD]`
- [ ] 采购表 ≥6 项有「通过 / 需合同确认 / 不适用」及备注
- [ ] 完成章节测验
