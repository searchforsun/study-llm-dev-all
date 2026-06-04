# Demo：红队与演练实验室

[返回章节](../../index.html#ch-practice-04-red-team)

## 目标

维护 L1 对抗用例库，实现 run_case 执行器，本地跑通 smoke 回归。

## 前置准备

- Python 3.10+

## 文件

| 文件 | 说明 |
|------|------|
| `cases/l1-smoke.json` | L1 冒烟用例（4 条 critical/high） |
| `run_red_team.py` | 用例执行与报告 |
| `stub_agent.py` | 本地 stub Agent（无需真实 LLM） |

## 步骤

1. 阅读用例 JSON 格式，新增 1 条 alignment 用例。
2. 运行 smoke，确认 4/4 pass。
3. 故意修改 stub 放行 injection，观察 CI 失败行为。

## 验收

```bash
python run_red_team.py --suite cases/l1-smoke.json
# 期望输出：PASS: 4/4 L1 smoke
```

- [ ] 4 类 category 各有代表用例
- [ ] critical 失败 exit code 非 0
- [ ] 报告含用例 id 与 pass/fail
- [ ] 完成章节测验
