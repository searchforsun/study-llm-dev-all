# Gate 3：章节语义评审（Agent）

在 **Gate 1**（`validate-tutorial`）与 **Gate 2**（`review-chapter`）通过后执行。输出 JSON，**不替代**脚本校验。

## 何时执行

- 工作流 **B / B-修订** 生成或修改 `chapters/*.html`、`quiz.partial.html` 后
- 告知用户「已生成」之前
- 若 `mustFixBeforeDelivery: true`，修复后重跑 Gate 1～2 与本清单

## 检查维度

1. **大纲覆盖（广度）**：每个 `outline.sections[]` 是否讲透、有无跑题或大面积重复；与 Gate 2 `richness.minSectionBlocksMatchOutline` 互补——脚本看块数，此处看每节**实质深度**。
2. **篇幅密度（与 Gate 2 分工）**：知识正文 `.section-block` 行数（`lines.countScope`，见 JSON）须 ≥ `lines.minByChapterType`。Gate 3 不重复数行，但须确认「够行数仍空泛」的章写入 `errors`。
3. **先读后做**：概念 → 图/表 → 代码 → 步骤 → Demo → **章节测验** 顺序是否合理。
4. **可检验**：学习目标能否用**本章测验**（单选/多选/填空）+ Demo + 自检清单验证。
5. **内容深度**：是否堆砌定义无场景；是否有统一业务案例下的生产坑、反例、决策表；实践章代码是否可对照步骤复现。
6. **准确性**：技术表述、版本号、官方链接描述是否与 `course.json.meta` 一致。
7. **反例与取舍**（概念/架构章）：是否含误区、双栏对比或场景决策表（至少其一）；各知识 `h3` 是否具备足够呈现形式（建议每节至少 2 种：图/表/代码/enrichment 等）。
8. **教学法检查项（7 项）**（见 [chapter-authoring.md](chapter-authoring.md) §教学法检查项）：动机、章末结论覆盖各节、微自检、判断练习、测验是否偏场景而非纯识记。
9. **章间一致**（多章时）：术语、示例线、命名是否与前后章冲突；跨章链接是否为 `outline.title` + `#ch-{id}`（见 [chapter-authoring.md](chapter-authoring.md) §跨章引用）。
10. **术语拓展**：按 [terms-policy.md](terms-policy.md) 与 Gate 2；`prompt` 是否含本课示例与误区，而非空泛定义。
11. **Demo 可运行验收**（与 Gate 2b 分工）：Gate 2b 校验 README/工程结构；此处对 **可运行 lab** 执行 README 验收命令并记录通过/失败（文档型 lab 按 checklist 抽检）。

## 输出格式

```json
{
  "chapterId": "<id>",
  "mustFixBeforeDelivery": false,
  "scores": {
    "outlineCoverage": 4,
    "readability": 4,
    "verifiability": 5,
    "accuracy": 5
  },
  "errors": [],
  "suggestions": ["可选改进一句"]
}
```

| 字段 | 说明 |
|------|------|
| `mustFixBeforeDelivery` | `true` 时必须改稿并重跑 Gate 1～2 |
| `errors` | 事实错误、大纲遗漏、测验无法覆盖正文等 |
| `suggestions` | 可选优化，可写入交付摘要 |

## 与 Gate 2 的分工

| Gate 2（脚本） | Gate 2b（脚本） | Gate 3（Agent） |
|----------------|-----------------|-----------------|
| 测验、行数、Mermaid/代码块、section-block 广度 | README、验收命令、可运行工程结构 | 题目是否切中正文 |
| h3 与大纲标题模糊匹配 | — | 每节是否讲透、深度是否够 |
| 非法标签、h5 位置 | — | 表述是否准确、是否空泛 |
| 物理行数 ≥ 阈值 | — | 够行数仍空泛 → `errors` |
| — | — | **执行** demo 验收命令 |

## 返工上限

对同一章自动返工建议 **最多 2 轮**（Gate 1～3 循环），避免死循环。
