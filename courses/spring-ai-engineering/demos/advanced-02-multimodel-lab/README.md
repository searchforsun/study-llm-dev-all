# Demo：多模型路由与 Fallback

对应章节：[多模型路由与 Fallback](../../index.html#ch-advanced-02-multimodel)

阅读 `routing-rules.md`，为 CorpAssist NS3 场景设计 fast / reasoning / vision 三档路由表。

## 步骤

1. 打开 `routing-rules.md`，补充「年假 FAQ」与「截图报错分析」各走路由 tier。
2. 在笔记说明熔断打开后 fallback chain 如何选择备用模型。
3. 对照 Micrometer 章，列出 2 个应用来验证路由是否生效的指标。

## 验收

- [ ] 路由表含至少 3 种 intent/tier 映射
- [ ] 能解释 response cache 与 conversationId 互斥的原因
- [ ] 完成章节测验
