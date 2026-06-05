# Demo：CorpAssist 分层架构标注

对应章节：[LLM 应用分层架构](../../index.html#ch-practice-01-app-architecture)

## 前置

- 已阅读 [API 契约与集成方式](../../index.html#ch-basics-05-api-contracts) 中的 BFF→网关拓扑
- 了解接入层 / 编排层 / 数据层概念

## 文件

| 文件 | 说明 |
|------|------|
| `corpassist-layers.yaml` | 三层组件与 RAG 索引配置示例 |
| `layer-mapping-template.md` | 团队服务 → 分层职责表（待填写） |
| `sync-async-scenarios.md` | 四类场景同步/异步选型卡 |

## 练习

1. 复制 `layer-mapping-template.md` 为 `layer-mapping.md`，为每层填写至少 1 个服务/仓库名。
2. 在 `sync-async-scenarios.md` 中完成 4 行：Web 客服、全库索引、夜间批摘要、Agent 多工具。
3. 对照 `corpassist-layers.yaml`，标出哪些键属于接入/编排/数据。

## 验收

- [ ] `layer-mapping.md` 三层均有服务名
- [ ] 场景卡 4 行含同步/异步及一句理由
- [ ] 能口述 RAG 问答 4 步调用序
