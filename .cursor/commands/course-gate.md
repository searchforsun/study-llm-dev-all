# 课程 Gate 1–2 结构校验

对指定课程运行**自动化**结构校验与章节质量量化检查（语法/DOM/测验/术语/Mermaid/代码块等）。

## 参数

用户会在消息后提供课程 slug（如 `spring-ai-alibaba-engineering`）或 `--chapter <id>` 限定单章。若未提供，从当前打开文件路径推断 `courses/<slug>/`。

## 技能包路径

`<skill-root>` = `programming-html-tutorial` 技能包根目录。按序探测：

1. 环境变量 `PROGRAMMING_HTML_TUTORIAL_SKILL`
2. `~/.cursor/skills/programming-html-tutorial`
3. `~/.claude/skills/programming-html-tutorial`

## 执行步骤

1. 确定 `SLUG`、可选 `CHAPTER`，课程目录 `courses/<SLUG>/`。
2. 依次运行（任一步失败即停止并报告）：

```bash
node <skill-root>/scripts/assemble-index.mjs --dir courses/<SLUG>
node <skill-root>/scripts/validate-tutorial.mjs --dir courses/<SLUG> [--strict]
node <skill-root>/scripts/review-chapter.mjs --dir courses/<SLUG> [--chapter <CHAPTER>] [--strict]
```

3. 根据终端输出整理摘要：

| 维度 | 结果 |
|------|------|
| Gate 1（assemble + validate） | PASS/FAIL + 关键错误 |
| Gate 2（review-chapter） | PASS/FAIL + 失败章节列表 |
| 薄章（<380 行） | 统计 `chapters/*.html` 行数 |
| 术语/测验覆盖 | 读 `course.json` 的 terms / quizzes 数量 |

4. Gate 2 失败时，逐章列出 **errors**（必须修复）与 **warnings**（`--strict` 下同 error）。
5. **不要**修改章节内容；修复请用 `/course-fix`。

## 参考

- Gate 细则：`programming-html-tutorial/reference/delivery-review.md`
- 量化阈值：`programming-html-tutorial/config/chapter-quality.json`
- 金标准：`programming-html-tutorial/example/java-distributed-architecture/chapters/`
