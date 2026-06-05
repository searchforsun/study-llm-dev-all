# 课程 Gate 校验

对指定课程执行 **programming-html-tutorial** 的 **Gate 1～2b**（`course-gate.mjs`）；不改稿。  
**Gate 3** 在 `/course-review`。

## 前置

1. `programming-html-tutorial/SKILL.md`
2. `reference/delivery-review.md`（§Gate 总表 SSOT）、`reference/quality-policy.md`
3. 阈值 **仅以** `<skill-root>/config/chapter-quality.json`（v3 单一策略，无 `--profile`）
4. `--dir` = `courses/<slug>/`

## `<skill-root>`

工作区 `.cursor/skills/programming-html-tutorial` → `PROGRAMMING_HTML_TUTORIAL_SKILL` → `~/.cursor/skills/...` → `~/.claude/skills/...`（取首个含 `scripts/course-gate.mjs` 的目录）。

## 执行

```bash
node <skill-root>/scripts/course-gate.mjs --dir courses/<slug>
node <skill-root>/scripts/course-gate.mjs --dir courses/<slug> --strict --gate-report
```

单章排障：`review-chapter.mjs --dir courses/<slug> --chapter <id>`。

## 输出

- 终端 Gate 1/2/2b PASS/FAIL
- `--gate-report` → `<workspace>/.course-quality/<slug>/gate-report.json`
- 不修改源文件；失败引导 `/course-fix`，语义评审引导 `/course-review`
