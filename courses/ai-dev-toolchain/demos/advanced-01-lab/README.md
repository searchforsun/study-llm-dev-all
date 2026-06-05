# Demo：自定义 Agent 工作流（CorpAssist PR）

对应章节：[自定义 AI Agent 工作流设计](../../index.html#ch-advanced-01)

## 目标

纸面设计 Planner → Coder → Reviewer 分工，并编写可加载的 Skill 清单与 CI 两阶段 job 描述。

## 步骤

1. 阅读 `workflow-sketch.md`，补全 stage 与 artifact
2. 填写 `skills/corpassist-pr-review.SKILL.md` 中的验收命令
3. 对照 `ci-workflow-snippet.yml` 说明 deterministic 与 ai_assist 先后关系
4. 列出 2 条 subagent 委派场景（见章节）

## 验收

- [ ] `workflow-sketch.md` 含至少 4 个 stage
- [ ] Skill 文件含 pytest/ruff 验收命令
- [ ] `ci-workflow-snippet.yml` 中 ai_assist `needs: deterministic`

## 验收命令

```bash
grep -q "needs: deterministic" ci-workflow-snippet.yml
grep -q "pytest" skills/corpassist-pr-review.SKILL.md
```
