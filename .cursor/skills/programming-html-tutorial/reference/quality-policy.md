# 质量策略（v3 单一策略）

真源：`config/chapter-quality.json`（**无** `default` / `delivery` 档位）。命令与 Agent **不得**在 prompt 中写死行数、题数。

## 闸门入口（唯一推荐）

```bash
node <skill-root>/scripts/course-gate.mjs --dir <workspace>/courses/<slug> [--strict] [--gate-report]
```

- `--strict`：全部 warning 视同 error
- `--gate-report`：写入 `<workspace>/.course-quality/<slug>/gate-report.json`（路径见 JSON → `gateReport.defaultRelativeDir`）

**勿**在交付流程中混用 assemble / validate / review-* 分步命令，除非单章调试（`review-chapter.mjs --chapter <id>`）。

## 严重级别

| 符号 | 含义 |
|------|------|
| ✗ | 门禁（blocking） |
| ⚠ | 警告（`--strict` 时升格为 ✗） |
| · | 建议（不挡 Gate） |

教学法、术语 prompt、标准代码块 DOM、demo README 引用等见 JSON 与 `scripts/lib/quality-policy.mjs` → `issueLevel()`；代码块规则见 `scripts/lib/code-block-quality.mjs`。

## 动手练习 DOM

选择器、模板、条数与反套模板 → **[chapter-practice-dom.md](chapter-practice-dom.md)**（不在本文重复）。

## 禁讲列表

在 `course.json` → `meta.forbiddenTopics` 配置；扫描范围见 `forbiddenTopics.scanScopes`。

## Gate 3 前置

`/course-review` 须在 `course-gate` **无 blocking error** 后执行；读取 `gate-report.json`，不重复 L1–L2 已报项。
