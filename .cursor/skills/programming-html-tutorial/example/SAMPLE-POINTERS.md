# 样例阅读指引（不必克隆全部 demo）

`example/java-distributed-architecture/` 用于展示**章节密度与 DOM 结构**；完整 Spring Cloud 多模块工程仅作 Gate 2b 参考，独立发布时不必随 skill 分发全部 `demos/`。

## 建议优先阅读

| 路径 | 说明 |
|------|------|
| `chapters/basics-01-distributed-fundamentals.html` | 概念章：术语、Mermaid、动手练习 DOM |
| `chapters/practice-01-spring-cloud-bootstrap.html`（若存在）或 `practice-*` 任一章 | 实践章：代码块 + demo-box |
| `course.json` | 大纲、`terms`、`quizzes` 结构 |
| `welcome.partial.html` | 欢迎页与 `#outline-summary-body` |

## 可选：最小 demo

仅需验证 Gate 2b 时，保留单章 `demos/<chapter-id>-lab/README.md` + 验收命令即可，无需整套 `shopflow/` 多模块仓库。

壳层与 portal：在 skill 根执行 `sync-portal-shell` + `sync-courses-index.mjs example/index.html` 后与 `templates/` 对齐。样例课须通过 `course-gate.mjs --dir example/java-distributed-architecture`（发布前可加 `--strict`）。
