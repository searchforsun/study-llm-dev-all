# Demo：AgentScope 生产 Trace 诊断实验

对应章节：[面试：AgentScope 生产排障](../../index.html#ch-advanced-04-interview)

## 文件

| 文件 | 说明 |
|------|------|
| `sample-traces/loop_search.json` | 死循环样例 Trace |
| `sample-traces/fake_exec.json` | 假执行样例 Trace |
| `diagnose.py` | 自动诊断脚本 |
| `report-template.md` | 诊断报告模板 |

## 快速开始

```bash
cd demos/advanced-04-interview-lab
python diagnose.py sample-traces/loop_search.json
python diagnose.py sample-traces/fake_exec.json
```

## 验收

- [ ] `loop_search.json` 诊断输出 `verdict: LOOP_DETECTED`
- [ ] `fake_exec.json` 诊断输出 `verdict: FAKE_EXECUTION`
- [ ] 完成章节测验
