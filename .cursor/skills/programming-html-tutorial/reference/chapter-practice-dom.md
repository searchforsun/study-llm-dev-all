# 动手练习 DOM 与内容（SSOT）

Gate 2 对 `.chapter-practice` 的 **DOM 骨架、条数与反套模板** 以本文为准；量化键见 `config/chapter-quality.json` → `practice` / `pedagogy`，严重级别见 [quality-policy.md](quality-policy.md)。

写作叙事与教学法 7 项见 [chapter-authoring.md](chapter-authoring.md) §3；必填块列表见 [chapter-blocks-policy.md](chapter-blocks-policy.md)。

---

## DOM 骨架（固定）

| 块 | 选择器 / 元素 |
|----|----------------|
| 容器 | `.chapter-practice` |
| 引导 | `p.steps-intro` |
| 操作小节标题 | `h4.practice-section-title`（文案固定：**操作步骤**） |
| 操作步骤 | `ol.steps.steps-operate` |
| 判断小节标题 | `h4.practice-section-title`（文案固定：**判断练习**） |
| 判断题列表 | `ol.steps-judgment-list` |
| 题干 | `p.judgment-stem` |
| 参考答案 | 每题 `.learn-practice-answer` 内 `<details><summary>参考答案</summary>…` |
| Demo | `.demo-box` + `h4.demo-box-title` |

样式：`templates/enrichment.base.css`（assemble 注入）。

### HTML 模板

```html
<div class="chapter-practice">
  <h3>动手练习</h3>
  <p class="steps-intro">…本章具体产出…</p>
  <h4 class="practice-section-title">操作步骤</h4>
  <ol class="steps steps-operate">
    <li>步骤正文（壳层 CSS 自动渲染圆形序号）</li>
  </ol>
  <h4 class="practice-section-title">判断练习</h4>
  <ol class="steps-judgment-list">
    <li>
      <p class="judgment-stem">题干…</p>
      <div class="learn-practice-answer">
        <details>
          <summary>参考答案</summary>
          <div class="learn-practice-answer-body"><p>…</p></div>
        </details>
      </div>
    </li>
  </ol>
  <div class="demo-box"><h4 class="demo-box-title">Demo：…</h4><p>验收标准…</p></div>
</div>
```

---

## 内容与形式（禁止套模板）

| 项 | 要求 |
|----|------|
| `steps-intro` | 写**本章**要完成的产出（改哪份配置、填哪张表、跑哪条命令），**禁止**每章抄写「先完成理解步骤，再用判断检验…」 |
| `ol.steps.steps-operate` | ≥2 条须**点名正文素材**（表/图题/配置键/API/代码块）；「完成 demos/xxx」最多 1 条且放在末位 |
| `ol.steps-judgment-list` | ≥1 题；**形式轮换**：A/B 权衡、找错配置、排障顺序、补全 yaml 等；**禁止**每章复制「方案 A/B 各写 1 条支持/反对」 |
| `demo-box` | 除目录外须写**验收标准**（命令 + 期望输出/截图要点） |
| 与大纲 | 操作步骤宜覆盖 `sections[]` 中 ≥2 节的具体技能点 |

判断题至少 1 道；每道须写**可展开的参考答案正文**（非仅题干）。

---

## 动态条数（写章前必算）

**DOM 骨架固定**；变的是条数与题型，由 `outline.sections[]` 与阶段决定。

| 输入 | 规则 |
|------|------|
| 大纲节数 **N** | 理解步骤 ideal ≈ `ceil(N × ratio)`，clamp 3～8；`ratio` 理论章 0.5、practice 阶段 0.6（见 JSON → `practice.stepsPerSectionRatio*`） |
| 判断题 | N≤4 → 1 题；N≥5 → 建议 2 题（排障 + 找错/权衡） |
| 每节映射 | 优先从正文已有素材出题：该节 **表/Mermaid/代码块/配置** → 1 条理解步骤 |
| 末位 | 最多 1 条「可选：demos/…」；不得全部步骤只写 demo |

**写章前「动手练习清单」（Agent 内部，写在 HTML 前）**

```text
本章 N={sections.length}，ideal 理解步骤={ideal}，判断={1|2}
节1「{sections[0]}」→ 步骤：{填表|画图|改配置|…，点名正文元素}
节2「{sections[1]}」→ …
判断1 形式：{排障顺序|找错 yaml|A/B 权衡|…}，考点：{某节 h3}
demo 验收：{命令 + 期望输出}
```

### 阶段差异

| 阶段 | 理解步骤侧重 | 判断侧重 |
|------|--------------|----------|
| basics / advanced | 填表、画序列/Mermaid、纸面标注 | 概念权衡、找错设计 |
| practice | `mvn`/`curl`/改 yaml、对照正文代码块 | 排障顺序、配置找错、模块边界 |

### 题型轮换（避免每章同一套）

| 轮换池 | 示例 |
|--------|------|
| 排障顺序 | 「Gateway 先于 Eureka 启动会怎样？」 |
| 找错 | 「下列 API/配置哪条违反本章契约？」 |
| 补全 | 「缺哪段 yaml 键导致 lb:// 不生效？」 |
| 权衡 | 「单模块 vs 多模块，为何选 B？」（**勿每章都用**） |
| 口头 | 「用三句话向同事解释 Outbox」 |

---

## 与 Gate / 教学法的关系

| 检查 | 文档 / 工具 |
|------|-------------|
| DOM 存在、条数、反套模板 | Gate 2 → `review-chapter.mjs` + `chapter-quality.json` |
| 是否讲透、题型是否切中正文 | Gate 3 → [chapter-quality-rubric.md](chapter-quality-rubric.md) |
| 教学法第 7 项（判断与迁移） | [chapter-authoring.md](chapter-authoring.md) §3 表第 7 行 |
