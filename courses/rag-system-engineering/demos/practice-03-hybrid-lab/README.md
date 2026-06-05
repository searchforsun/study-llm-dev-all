# Demo：混合检索接入

对应章节：[混合检索接入](../../index.html#ch-practice-03-hybrid)

理解混合检索权重配置，判断何时应提高 `bm25_weight` 并给出 CorpAssist 实例。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `hybrid-config.json` 中 `vector_weight` 与 `bm25_weight` 的含义
- 能判断何种查询场景适合提高 BM25 权重
- 能为 CorpAssist 写出一个提高 `bm25_weight` 的具体业务实例

## 步骤

1. 打开 `hybrid-config.json`，阅读当前权重配置（vector 0.5 / bm25 0.5）。
2. 对照章节中混合检索原理，分析向量检索与 BM25 各自擅长的查询类型（语义模糊 vs 关键词精确）。
3. 假设 CorpAssist 用户频繁查询含精确制度编号（如「制度第 3.2 条」）或专有名词的问题，判断此时是否应提高 `bm25_weight`。
4. 在 `hybrid-config.json` 旁附注中写一例：何种 CorpAssist 查询场景下提高 `bm25_weight`，以及调整后的预期收益。

## 验收

- [ ] verify.py 验收通过
- [ ] 已写出一例应提高 `bm25_weight` 的 CorpAssist 查询场景
- [ ] 能说明提高 BM25 权重对召回精度的影响
- [ ] 完成章节测验
