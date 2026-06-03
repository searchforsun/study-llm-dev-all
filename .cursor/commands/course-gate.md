# 课程 Gate 校验

对指定课程执行 **programming-html-tutorial** 技能包定义的 **Gate 1、Gate 2、Gate 2b**；不改稿。  
**Gate 3**（语义深度/广度、demo **执行**验收）在 `/course-review`，不在本命令。

## 前置

1. 读取 skill：`programming-html-tutorial/SKILL.md`
2. 打开 skill：`reference/delivery-review.md`、`reference/workflows.md` §Gate 总表
3. 量化阈值 **仅以** `<skill-root>/config/chapter-quality.json` 为准（本 command **不得**写死行数、题数等数值）
4. 确定 `--dir`：`courses/<slug>/`（slug 由用户提供或从当前路径推断）

## 技能包路径

`<skill-root>` 按序探测（取第一个存在且含 `scripts/assemble-index.mjs` 的目录）：

1. 当前工作区 `.cursor/skills/programming-html-tutorial`
2. 环境变量 `PROGRAMMING_HTML_TUTORIAL_SKILL`
3. `~/.cursor/skills/programming-html-tutorial`
4. `~/.claude/skills/programming-html-tutorial`

## 执行

按 `delivery-review.md` 依次运行（**任一步失败即停**、汇总 errors）：

```bash
node <skill-root>/scripts/assemble-index.mjs --dir courses/<slug>
node <skill-root>/scripts/validate-tutorial.mjs --dir courses/<slug> [--strict]
node <skill-root>/scripts/review-chapter.mjs --dir courses/<slug> [--chapter <id>] [--strict]
node <skill-root>/scripts/review-demo.mjs --dir courses/<slug> [--strict]
```

并完成 `delivery-review.md` §Gate 1 清单（壳层、outline、编码等；demo 结构以 **Gate 2b** 脚本为准）。

### Gate 2 / 2b 分工（数值见 `chapter-quality.json`）

| 类别 | Gate | JSON 键（示例） |
|------|------|-----------------|
| 章节量化（行数、测验、术语、丰度等） | 2 | `lines.*`、`quiz.*`、`terms.*`、`richness.*`、`practice.*`、`pedagogy.*` |
| Demo / lab 结构 | 2b | `demos.*` |
| 语义深度/广度、空泛 | 3 | `/course-review` → `chapter-quality-rubric.md` |
| Demo **跑通** | 3 | `/course-review` Agent D |

## 输出

- Gate 1 / 2 / 2b 各自 PASS/FAIL 与终端 errors/warnings
- 未通过项列表；**不修改源文件**
- 需修复时引导 `/course-fix`；需语义/demo 执行评审时引导 `/course-review`
