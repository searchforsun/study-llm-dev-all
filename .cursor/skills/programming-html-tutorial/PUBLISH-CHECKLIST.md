# Skill 独立发布检查清单

在将 `programming-html-tutorial` 推送到独立 GitHub 仓库或 [agentskill.sh](https://agentskill.sh/submit) 前逐项确认。

## 仓库卫生

- [ ] 根目录仅含技能包内容（`SKILL.md`、`templates/`、`scripts/`、`config/`、`reference/`、`example/`、`LICENSE`）
- [ ] **无**消费方路径：`outline-specs.json`、`CorpAssist`、本仓库 `scripts/sync.mjs` 等
- [ ] `example/` 正文使用虚构案例（当前样例为 ShopFlow）；README 标明「样例领域 ≠ 技能边界」
- [ ] `example/index.html` 壳版本可能滞后于 `templates/` — 发布说明中保留该警告

## 通用性（对照 [reference/skill-project-boundary.md](reference/skill-project-boundary.md)）

- [ ] 脚本仅 `--dir` / `course.json` 参数化，无硬编码 slug 或绝对路径
- [ ] `config/chapter-quality.json` 阈值适用于目标受众；短文/微课工作区可复制后下调 `lines.*`、`quiz.*`
- [ ] `config/term-platforms.json` 可按地区替换（见 [config/README.md](config/README.md)）
- [ ] reference 示例课名使用虚构 slug（如 `intro-to-docker`），非真实消费方课程名

## 文档单一真源

- [ ] Gate 矩阵与命令：**仅** [reference/delivery-review.md](reference/delivery-review.md) §Gate 总表
- [ ] 动手练习 DOM：**仅** [reference/chapter-practice-dom.md](reference/chapter-practice-dom.md)
- [ ] 量化阈值：**仅** `config/chapter-quality.json`（ prose 不写死数字）

## 可运行验证

```bash
node scripts/course-gate.mjs --dir example/java-distributed-architecture
node scripts/course-gate.mjs --dir example/java-distributed-architecture --strict --gate-report
```

- [ ] 上述命令在 Node 18+ 下通过（或记录已知样例豁免项）

## 元数据

- [ ] `SKILL.md`  frontmatter `description` 覆盖中英文触发词
- [ ] `metadata.version` 已 bump
- [ ] `README.md` 安装说明使用占位 `<你的GitHub用户名>`，无私有仓库 URL

## 可选：最小教程模式

面向单课、无 portal、低密度内容的工作区，在发布说明中指向 [SKILL.md](SKILL.md) §轻量工作区，并建议复制 `config/chapter-quality.json` 后调整键值。
