# Demo：CorpAssist Java Capstone 短链路

对应章节：[Capstone：CorpAssist 短链路 Agent](../../index.html#ch-advanced-02-capstone)

## 前置

- JDK 17+、Maven 3.9+
- `AI_DASHSCOPE_API_KEY`（或 mock profile）
- 可选：Micrometer + Prometheus 抓取 `/actuator/prometheus`

## 文件

| 文件 | 说明 |
|------|------|
| `CapstoneAgentApplication.java` | Spring Boot 入口与 Agent 配置 |
| `golden_set.json` | 10 条短链路评测用例 |
| `eval_capstone.sh` / `eval_capstone.ps1` | 跑 golden set 并统计成功率 |
| `ACCEPTANCE.md` | 验收清单 |

## 快速开始

```powershell
cd demos/advanced-02-capstone-lab
.\eval_capstone.ps1
```

## 验收

- [ ] golden set pass rate ≥ 90%
- [ ] 平均 ReAct 步数 ≤ 4
- [ ] `/actuator/metrics` 可见 `agent.steps` 与 `agent.tokens`
- [ ] `ACCEPTANCE.md` 四项全部勾选
