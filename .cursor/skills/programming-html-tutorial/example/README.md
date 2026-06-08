# 交互式课程

静态 HTML 教程集合：分阶段大纲、章节正文、测验与 Demo 实验。从**课程中心**选择课程进入学习。

## 启动方式

在 **skill 包根目录**（`programming-html-tutorial/`）启动（含进度写入 API；默认托管本 `example/` 目录）：

```powershell
node scripts/serve-tutorial-root.mjs
```

浏览器打开 **http://localhost:3000**，进入课程选择页；单课如 **http://localhost:3000/java-distributed-architecture/**。

| 方式 | 说明 |
|------|------|
| **推荐** | `serve-tutorial-root.mjs`：`courses.json`、明暗主题、`progress.local.json` 自动读写 |
| **不推荐** | `npx serve` 或 `file://`：无法 PUT 进度文件；`file://` 也无法 fetch `courses.json` |

指定端口：`$env:PORT=3456; node scripts/serve-tutorial-root.mjs`

消费方工作区托管 `courses/` 时，使用项目根目录的 `node scripts/serve-courses.mjs`（行为一致）。

## 目录结构

```text
courses/
├── index.html          # 课程选择页（含主题切换脚本）
├── courses.json        # 课程目录（新增课程在此注册）
├── README.md           # 本文件
└── <slug>/             # 单门课程
    ├── index.html      # 教程主页面（assemble 生成）
    ├── course.json     # 大纲、术语、测验元数据
    ├── chapters/       # 章节源稿
    ├── theme.css       # 课程主题色
    ├── progress.local.json  # 学习进度（自动创建，gitignore）
    └── demos/          # 可选：章节配套练习
```

## 功能说明

- **课程中心**：`index.html` 通过 `courses.json` 动态展示已注册课程与进度，点击进入对应教程。
- **返回导航**：课程顶栏与侧栏均有「← 全部课程」，可回到选择页。
- **全局主题**：明暗偏好在所有课程间同步（键名见 `config/defaults.json` → `globalThemeKey`，默认 `html-tutorial_theme`）；在任一页切换后，其他页面刷新即生效。

## 已注册课程

| 课程 | 目录 | 说明 |
|------|------|------|
| Java 分布式架构设计入门到进阶 | [java-distributed-architecture](./java-distributed-architecture/) | 7 章已发布 · 3 阶段 · Spring Cloud 微服务（skill 样例） |

各课程详情见子目录 `README.md`。

## 新增课程

1. 在 `courses/<slug>/` 按教程技能包规范创建课程（`course.json`、章节等）。
2. 在 [`courses.json`](./courses.json) 的 `courses` 数组中追加条目（`slug`、`title`、`path`、`summary` 等）。
3. 从 `courses/` 根目录启动服务，在课程中心确认卡片与链接正常。
