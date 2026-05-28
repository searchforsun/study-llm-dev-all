# Demo：采样参数与幻觉边界对照表

对应章节：[Transformer 应用层理解](../../index.html#ch-basics-03-transformer-apps)

## 目标

- 为不同 CorpAssist 场景选定 `temperature` / `top_p`
- 明确每场景的幻觉风险与 RAG/人工兜底

## 文件

| 文件 | 说明 |
|------|------|
| `params-customer-service.json` | S2 制度客服（低随机） |
| `params-marketing.json` | S5 营销文案（偏高随机） |
| `params-policy-qa.json` | S1 制度问答（低随机 + 引用） |
| `sampling-worksheet.md` | 三列表格练习与参考答案 |

## 练习

1. 对比三个 JSON 文件的 `temperature`，说明为何不同。
2. 在 `sampling-worksheet.md` 填写「幻觉风险与兜底」列，至少包含：RAG 引用、拒答、人工复核。
3. 用 curl 或 Postman 将 `params-customer-service.json` 发到**测试网关**（勿用生产 Key）。

## 验收

- [ ] 制度客服、营销文案、报销意图解析三行均已填写
- [ ] 每行幻觉列不为空
- [ ] 完成章节测验
