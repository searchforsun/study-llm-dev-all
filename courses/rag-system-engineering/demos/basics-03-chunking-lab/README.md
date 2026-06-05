# Demo：分块策略

对应章节：[分块策略](../../index.html#ch-basics-03-chunking)

为 CorpAssist 制度类 PDF 选择一种分块策略，并写出选型理由与风险应对。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解固定长度分块与结构化分块的适用场景
- 能为制度 PDF 选出合适的分块策略并给出理由
- 能在 `chunk-compare.md` 中记录选型结论与风险缓解措施

## 步骤

1. 打开 `chunk-compare.md`，阅读固定分块与结构分块的优缺点对比表。
2. 假设待接入文档为 CorpAssist HR 制度 PDF（含章节标题、条款编号），评估两种策略的召回质量与断句风险。
3. 选定一种分块策略，在 `chunk-compare.md` 末尾补充「制度 PDF 选型」小节：写明策略名称、选型理由、主要风险及缓解手段。
4. 自检：所选策略是否能保持条款语义完整，且 chunk 大小适合 embedding 模型上下文？

## 验收

- [ ] verify.py 验收通过
- [ ] `chunk-compare.md` 已补充制度 PDF 分块选型及理由
- [ ] 能说明所选策略的主要风险与缓解措施
- [ ] 完成章节测验
