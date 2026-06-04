# Demo：CorpAssist 安全基线实验室

[返回章节](../../index.html#ch-practice-05-corpassist-sec)

## 目标

整合前四章 Demo 脚本，运行一键安全基线验收，产出 acceptance-report.json。

## 前置准备

- 已完成 practice-01～04 Demo 脚本（或本目录 bundled stubs）
- Python 3.10+

## 文件

| 文件 | 说明 |
|------|------|
| `corpassist-security-baseline.yaml` | SEC-01～10 清单定义 |
| `run_baseline_acceptance.py` | 编排验收 |
| `acceptance-report.json` | 输出报告（运行后生成） |

## 步骤

1. Review 基线 YAML 中 blocking 项。
2. 运行一键验收脚本。
3. 打开 acceptance-report.json，确认 all_pass 为 true。

## 验收

```bash
python run_baseline_acceptance.py
# 期望输出：PASS: baseline accepted
```

- [ ] SEC-01～08 全部 pass
- [ ] acceptance-report.json 已生成
- [ ] 双栈 spot check 记录（如适用）
- [ ] 完成章节测验
