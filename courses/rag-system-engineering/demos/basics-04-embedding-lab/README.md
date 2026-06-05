# Demo：Embedding 与索引

对应章节：[Embedding 与索引](../../index.html#ch-basics-04-embedding)

理解 Embedding 模型变更对向量索引的影响，并说明为何必须执行 re-embed 操作。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `index-config.json` 中 model、dim、collection 各字段的含义
- 能解释 Embedding 模型变更后旧向量不可复用的原因
- 掌握 re-embed 的触发条件与 CorpAssist 索引版本管理要点

## 步骤

1. 打开 `index-config.json`，阅读当前索引配置（`demo-embed` 模型、768 维、`corpassist-demo` 集合）。
2. 假设 CorpAssist 将 embedding 模型从 `demo-embed` 升级为 `text-embedding-v3`（维度或语义空间变化），思考旧向量是否仍可用于相似度检索。
3. 在笔记或 `index-config.json` 旁附注中写出 re-embed 的必要性说明：涵盖向量空间不一致、召回质量下降、版本对齐三个角度。
4. 列出 re-embed 执行时需同步更新的配置项（model、dim、collection 版本号等）。

## 验收

- [ ] verify.py 验收通过
- [ ] 已说明 Embedding 变更时为何必须 re-embed（≥2 个技术理由）
- [ ] 能列出 re-embed 时需同步更新的配置字段
- [ ] 完成章节测验
