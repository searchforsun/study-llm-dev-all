# Demo：查询改写与 HyDE

对应章节：[查询改写与 HyDE](../../index.html#ch-advanced-01-query-transform)

阅读查询改写样例，为 CorpAssist 口语化问题编写 2 条 multi-query 改写。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `rewrite-example.txt` 中口语化查询到规范检索词的改写逻辑
- 掌握 multi-query 改写如何提升 CorpAssist 制度问答的召回覆盖率
- 能为 CorpAssist 用户问题写出 2 条有效的 multi-query 改写

## 步骤

1. 打开 `rewrite-example.txt`，阅读原问「年假咋请」到改写「年假申请流程 制度」的示例。
2. 对照章节中 multi-query 与 HyDE 策略，理解改写目标：扩展检索词覆盖面、消除口语歧义。
3. 选取一个 CorpAssist 口语化问题（如「报销咋弄」「出差住哪」），在 `rewrite-example.txt` 末尾补充 2 条 multi-query 改写，每条覆盖不同检索角度。
4. 自检：改写后的查询是否能命中制度文档中的不同表述方式？

## 验收

- [ ] verify.py 验收通过
- [ ] `rewrite-example.txt` 已补充 2 条 multi-query 改写
- [ ] 能说明改写如何提升 CorpAssist 检索召回覆盖率
- [ ] 完成章节测验
