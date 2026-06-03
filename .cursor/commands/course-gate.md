# 课程 Gate 校验

对指定课程执行 **programming-html-tutorial** 技能包定义的 **Gate 1、Gate 2**；不改稿。

## 前置

1. 读取 skill：`programming-html-tutorial/SKILL.md`
2. 打开 skill：`reference/delivery-review.md`、`reference/workflows.md` §Gate 总表
3. 确定 `--dir`：`courses/<slug>/`（slug 由用户提供或从当前路径推断）

## 技能包路径

`<skill-root>` 按序探测（取第一个存在且含 `scripts/assemble-index.mjs` 的目录）：

1. 当前工作区 `.cursor/skills/programming-html-tutorial`
2. 环境变量 `PROGRAMMING_HTML_TUTORIAL_SKILL`
3. `~/.cursor/skills/programming-html-tutorial`
4. `~/.claude/skills/programming-html-tutorial`

## 执行

按 `delivery-review.md` 依次运行（失败即停、汇总 errors）：

```bash
node <skill-root>/scripts/assemble-index.mjs --dir courses/<slug>
node <skill-root>/scripts/validate-tutorial.mjs --dir courses/<slug> [--strict]
node <skill-root>/scripts/review-chapter.mjs --dir courses/<slug> [--chapter <id>] [--strict]
```

并完成 `delivery-review.md` §Gate 1 清单（含 demo README 运行命令等项）。

## 输出

- 各 Gate PASS/FAIL 与终端 errors/warnings
- 未通过项列表；**不修改源文件**
- 需修复时引导 `/course-fix`
