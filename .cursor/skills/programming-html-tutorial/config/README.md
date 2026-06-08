# config 说明

| 文件 | 用途 |
|------|------|
| `defaults.json` | 壳版本、阶段 id、UI 风格列表、`chapterBlocks`、CDN 版本 |
| `chapter-quality.json` | Gate 2 量化阈值（v3 单一策略） |
| `term-platforms.json` | 术语弹窗「在外部 AI 打开」链接列表（assemble 读取） |
| `term-platforms.example.json` | 国内平台示例；可复制覆盖 `term-platforms.json` |

## 自定义术语平台

1. 编辑 `term-platforms.json` 为 `{ "id", "label", "url" }[]` 数组。
2. 海外工作区可改为 ChatGPT / Claude 等链接，或留空数组（弹窗仅保留复制 prompt）。
3. 勿在 skill 内硬编码单一消费方品牌。
