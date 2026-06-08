# welcome.partial.html 模板

写入 `<workspace>/courses/<slug>/welcome.partial.html`，由 assemble 注入 `index.shell.html` 中外层 `#welcome` 容器内。

**禁止**在片段根节点使用 `id="welcome"`（与 `index.shell.html` 外层 `#welcome` 重复）。

## 必填 DOM

| 选择器 | 用途 |
|--------|------|
| `#outline-summary-body` | `renderOutlineSummary()` 填充三阶段大纲表 |
| 勿重复 `id="welcome"` | 仅用 `class="welcome-panel"` 等 |
| `.notice.welcome-notice` 跨课链 | 使用 `.course-ref`（见 [chapter-authoring.md](chapter-authoring.md) §跨课程引用） |

## 跨课说明块（可选）

前置/并行课程说明写在 `.notice.welcome-notice` 内，链到 sibling 课程目录。HTML 结构与示例见 [chapter-authoring.md](chapter-authoring.md) §跨课程引用（**唯一示例真源**）。

**目标课 accent** 由 `assemble-index.mjs` 从 `courses/courses.json` 与各课 `theme.css` 自动注入，**勿**在本课 `theme.css` 手写 `[href*="slug"]` 覆盖（见 [theme-colors.md](theme-colors.md) §跨课程引用）。

## 加深理解脚本（内联，勿用独立 .js）

章节含 `.learn-checklist`、`.learn-param-slider` 时，在片段**末尾**内联（从 `templates/chapter-enrichment.js` 复制函数体）：

```html
<script>
(function () {
  /* …见 templates/chapter-enrichment.js … */
  window.initChapterEnrichment = initEnrichment;
})();
</script>
```

- **不要**使用 `<script src="assets/...">`；课程目录不出现 `assets/*.js`。
- `meta.useEnrichment === false` 时可省略；assemble 亦不会在缺失时注入。

## 生成后

工作流 A 完成后跑 Gate 1（见 [delivery-review.md](delivery-review.md)）。
