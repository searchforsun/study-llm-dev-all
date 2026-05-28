# Demo：CorpAssist 选型决策表

对应章节：[模型选型：商用 API vs 开源](../../index.html#ch-basics-04-model-selection)

## 目标

- 为 S1～S4 填写主选/备选模型与部署形态（L1～L4）
- 对齐多模型路由配置中的 Provider 名称

## 文件

| 文件 | 说明 |
|------|------|
| `decision-matrix-template.md` | 场景决策矩阵（可复制到 Wiki） |
| `llm-routing.example.yaml` | 网关路由样例（OpenAI 兼容 base_url） |

## 练习

1. 填写 `decision-matrix-template.md` 中 S1 制度 RAG 行：主选、备选、部署（L2 专属实例 或 L3 私有化）。
2. 修改 `llm-routing.example.yaml` 中 `scene: knowledge-qa` 的 `provider`，与矩阵一致。
3. 口述：为何幻觉频发时应先修 RAG 而非立即全量微调。

## 验收

- [ ] S1～S4 各行主选/备选/部署已填
- [ ] 制度 RAG 行与 YAML 中 provider 名称一致
- [ ] 完成章节测验
