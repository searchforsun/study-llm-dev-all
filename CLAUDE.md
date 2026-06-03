---
description: 
alwaysApply: true
---

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
node scripts/sync.mjs
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

### Key scripts in `scripts/` (repo root)

项目专有脚本 — **不得**移入 skill 包；通用能力见 skill [skill-project-boundary.md](.cursor/skills/programming-html-tutorial/reference/skill-project-boundary.md)。

| Script | Purpose |
|--------|---------|
| `sync.mjs` | `outline-specs.json` → `courses.json` (always run after spec edits) |
| `bootstrap-course-from-spec.mjs` | Initialize a new course directory from spec |
| `merge-course-manifests.mjs` | Merge incremental manifest files into `course.json` |
| `enrich-term-prompts.mjs` | Complete term tip/prompt fields |
| `fix-course-ref-links.mjs` | Batch-fix cross-course link markup in chapters/welcome |

### Reference example & quality gates (skill is SSOT)

Do **not** duplicate chapter DOM / quiz HTML templates here — follow the skill package:

| Topic | Where |
|-------|--------|
| Example course (structure & density) | `.cursor/skills/programming-html-tutorial/example/java-distributed-architecture/` |
| Chapter count / outline | `courses/outline-specs.json` → this course's `course.json` → `outline` |
| Authoring & required blocks | skill `reference/chapter-authoring.md`, `chapter-blocks-policy.md` |
| Gate 2 numeric thresholds | skill `config/chapter-quality.json` (**JSON wins** over prose) |
| Gate 3 semantic review | skill `reference/chapter-quality-rubric.md` |
| Cursor commands | `/course-gate`, `/course-review`, `/course-fix`, `/course-pipeline` (see `.cursor/commands/`) |

**`<skill-root>` resolution** (same order as `/course-gate`): workspace `.cursor/skills/programming-html-tutorial` → env `PROGRAMMING_HTML_TUTORIAL_SKILL` → `~/.cursor/skills/programming-html-tutorial` → `~/.claude/skills/programming-html-tutorial`.

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

## Agent hygiene

- 仅为排障/一次性验证写的脚本（如 `_foo.mjs`）：用完后**删除**，不要提交；要长期保留则正式放入仓库根 `scripts/` 并更新上表。
