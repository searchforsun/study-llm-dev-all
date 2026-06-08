# Java 分布式架构设计入门到进阶

> 启动本地服务、打开课程选择页等说明见上级目录 [courses/README.md](../README.md)。

## 这门课是什么

- **版本**：Java 21 LTS；Spring Boot 3.5.x；Spring Cloud 2025.0.x（[Spring Cloud Reference](https://docs.spring.io/spring-cloud/docs/current/reference/html/)）
- **规模**：7 章已发布 · 3 阶段（advanced 阶段待续写；完整规划见 `course.json` phaseGoal）
- **前置**：Java 17+、Spring Boot、HTTP/REST、Maven
- **当前进度**：basics 全 5 章 + practice 前 2 章；通过 `course-gate.mjs --strict` 验收

## 文件是干什么的

| 文件 | 你要不要碰 | 说明 |
|------|------------|------|
| `index.html` | **打开学习** | 教程主入口（侧栏大纲、章节、测验） |
| `chapters/*.html` | 不用 | 章节源稿，学习时无需打开 |
| `course.json` | 一般不用 | 大纲、术语、测验元数据 |
| `quiz.partial.html` | 按需 | 章节测验 |
| `theme.css` | 按需 | 本课主题色 |
| `welcome.partial.html` | 不用 | 欢迎页 |
| `progress.local.json` | 不用 | 学习进度（自动创建/更新；见下方启动方式） |
| `demos/` | 动手时 | 章节配套练习 |

## 启动（含进度自动保存）

在 **skill 包根目录**（`programming-html-tutorial/`）执行：

```powershell
node scripts/serve-tutorial-root.mjs
# http://localhost:3000/ → 样例课程中心
# http://localhost:3000/java-distributed-architecture/
```

勿使用纯 `npx serve`（无法 PUT 写回 `progress.local.json`）。顶栏保留「导出 / 导入进度」。
