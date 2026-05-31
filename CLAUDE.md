# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a **33-course interactive HTML tutorial site** for LLM application development, built as a dual-track curriculum: Python and Spring AI (Java). All courses orbit a unified case study called **CorpAssist** (enterprise intelligent assistant). Target audience: engineers with 3–5 years of Java distributed/microservices experience transitioning to LLM app development.

The site is purely **static HTML + JS + CSS** — no framework, no build step. It's served with `npx serve .` from `courses/`.

## Run it

```bash
cd courses
npx --yes serve .
# Opens at http://localhost:3000 → course portal
```

**Must serve from `courses/`** — the portal `fetch`es `courses.json` and the index loader uses a relative base path (`./`).

## Architecture

### Source of truth

`courses/outline-specs.json` is the master planning file (schema v2). It contains:
- All 33 courses with slug, title, domain, outline (chapters per phase), `dualStackPolicy`, `globalRules.mustNotCover`
- `northStarCapabilities` (NS1–NS3), `interviewScenarios` (S1–S5 with `productionPitfalls`), `capstoneModel`
- `learningPath` with 8-stage dual-track structure

**After editing `outline-specs.json`, always run:**

```bash
node courses/scripts/sync.mjs
```

This regenerates `courses/courses.json` (the portal catalog that `index.html` fetches).

### Course structure

Each course lives in `courses/<slug>/` with this layout:

```
<slug>/
├── course.json          # Course metadata + outline (from outline-specs, sometimes enriched by scripts)
├── index.html           # Assembled single-page course (generated from chapters + partials)
├── theme.css            # Per-course theme (CSS custom properties for accent colors)
├── welcome.partial.html # Course intro/welcome fragment (included during assembly)
├── quiz.partial.html    # Chapter quizzes fragment (included during assembly)
├── quiz-partial/        # Phase-specific quiz fragments (basics.html, practice.html, advanced.html)
├── chapters/            # Individual chapter HTML fragments (one per chapter, e.g. basics-01-llm-app-landscape.html)
└── demos/               # Lab READMEs and starter code per chapter
```

**Important naming conventions:**
- Chapter IDs: `{phase}-{index}-{slug}` — e.g. `basics-01-llm-app-landscape`, `practice-03-data-privacy`, `advanced-05-capstone-plan`
- Phases: `basics`, `practice`, `advanced` (some courses add `bridge`)
- Course slugs: shared courses have descriptive names; Python-track courses use `*-py`; Java-track courses use `*-java`; scenario courses use `scenario-{py,java}-{scene-name}`

### Generation pipeline (programming-html-tutorial)

Course content is generated with the `programming-html-tutorial` skill (a Claude Code skill). The pipeline:

1. **Bootstrap**: `node scripts/bootstrap-course-from-spec.mjs <slug>` creates directory + `course.json` from `outline-specs.json`
2. **Chapter generation**: Write individual `chapters/<id>.html` files via the `programming-html-tutorial` skill or direct Claude generation. Each is a `<section>` fragment with structured sections: intro, body, conclusions, review checklist, cheat sheet, interview Q&A, practice steps, quiz judgment, demos.
3. **Merge**: `node scripts/merge-course-manifests.mjs` merges multiple `manifest-*.json` into `course.json`
4. **Enrich**: `node scripts/enrich-term-prompts.mjs` adds term tips/prompts
5. **Assemble**: The `programming-html-tutorial` skill's `assemble` command stitches `chapters/*.html` + `welcome.partial.html` + `quiz.partial.html` + `theme.css` → `index.html`

**Never hand-edit `index.html` directly** — it's an assembly output. Edit the source fragments instead.

### Key scripts in `courses/scripts/`

| Script | Purpose |
|--------|---------|
| `sync.mjs` | `outline-specs.json` → `courses.json` (always run after spec edits) |
| `bootstrap-course-from-spec.mjs` | Initialize a new course directory from spec |
| `merge-course-manifests.mjs` | Merge incremental manifest files into `course.json` |
| `enrich-term-prompts.mjs` | Complete term tip/prompt fields |

### Reference example: chapter depth & breadth

The skill's `example/java-distributed-architecture/` is the **gold standard** for all courses. When generating or reviewing chapters, match these thresholds:

**Scale targets:**
- 15 chapters per course (3 phases × 5 chapters each) — but follow the spec's `outline` for each specific course
- 380–500 lines per chapter HTML fragment (the example ranges from 381 to 499 lines)
- ~25–30 term entries per course with detailed AI explanation prompts
- 5 quiz questions per chapter (mix of single-choice, multi-choice, fill-in-the-blank)

**Mandatory chapter DOM blocks (every chapter must have all of these):**
- `chapter-header` → title + `.chapter-done-badge` + `.btn-mark-done`
- `.chapter-intro` → `.chapter-meta` (time, phase, competency) + `.notice-why-learn` + `.notice-outcome` + key-points (3 items)
- Multiple `.section-block` subsections, each with `h3` + rich content
- `.chapter-conclusions-block` → conclusion list
- `.learn-review-block` → `.learn-checklist` (checkbox items) + `.learn-cheat-sheet` (concept table) + `.learn-interview` (defense/interview Q&A)
- `.official-links` → links to official docs
- `.chapter-practice` → `.steps-operate` (numbered steps) + `.steps-judgment-list` (judgment exercises with `<details>` answers) + `.demo-box`
- `.resources` → extended reading + next chapter link

**Content richness per section (match the example's density):**
- Inline `<span class="term" data-term-id="...">` glossary terms (linked to `course.json` terms)
- `<aside class="learn-scenario">` for business context (tied to the unified case study)
- `<div class="learn-compare">` for "bad vs good" comparison tables
- Mermaid diagrams (`<pre class="mermaid">`) for architecture/flow visualization
- `<details class="learn-micro-check">` for "think first" reflection boxes
- `<div class="role-cards">` for structured info cards

**Quiz pattern (in `quiz.partial.html` or `quiz-partial/*.html`):**
```html
<article class="quiz-item" data-qid="q{N}" data-answer="...">
  <p class="stem"><strong>N.</strong> （类型·单选/多选/填空）题目</p>
  <!-- options for single/multi; input.fill-input for fill -->
  <div class="quiz-actions">
    <button class="btn-check">检查</button>
    <button class="btn-hint">提示</button>
    <button class="btn-answer">答案</button>
  </div>
  <p class="hint hidden">...</p>
  <p class="answer hidden"><strong>答案：</strong>...</p>
</article>
```

**Term prompt pattern (in `course.json` `terms`):**
```json
"term-slug": {
  "label": "中文标签",
  "prompt": "我在学习{domain}。请结合{业务案例}场景说明..."
}
```

The example's full source is at the skill package path `example/java-distributed-architecture/` — open its `chapters/*.html`, `course.json`, `quiz.partial.html`, and `welcome.partial.html` as direct templates when generating new courses.

### Content rules

- All 33 courses use **CorpAssist** as the unified business case
- `globalRules.mustNotCover` in `outline-specs.json` lists forbidden topics: pretraining algorithms, CUDA kernels, thousand-GPU training (this is an application engineering curriculum, not ML infra)
- `dualStackPolicy` per course: `shared` (both tracks), `python` (Python track only), `java` (Java track only), `bridge` (cross-stack integration)

### The 8 learning stages

1. Cognitive foundation (shared): `llm-application-fundamentals`
2. Engineering foundation: Python track (`python-engineering-for-llm`, `ai-dev-toolchain`) **or** Java track (`spring-ai-engineering`, `spring-ai-alibaba-engineering`)
3. Core capabilities (shared): Prompt engineering, security/compliance, context/memory
4. RAG engineering: shared RAG theory + track-specific practice (`rag-system-py`/`rag-system-java`)
5. Evaluation & Agent: shared eval theory + track-specific Agent practice
6. Production: domain adaptation, serving, observability
7. Scenario landing: 5 scenarios × 2 tracks (enterprise RAG KB, customer service, Agent automation, code assistant, content studio)
8. Graduation delivery: enterprise solution delivery

### Graduation rules (from capstoneModel)

3-layer capstone:
- Layer 1: Complete track + mandatory scenario (`scenario-{py,java}-rag-kb`) + 1+ elective scenario
- Layer 2: Cross-service contracts, traces, canary orchestration
- Layer 3: TOP5 interview defense + badcase flywheel

## Git workflow

- Branch: `main`
- Commit style: conventional commits (`feat:`, `fix:`, `style:`, `refactor:`) — see recent commit history
- The project has a clean working tree at baseline
