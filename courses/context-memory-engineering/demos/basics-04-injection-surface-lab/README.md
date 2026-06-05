# Demo：上下文污染与注入面

[返回章节](../../index.html#ch-basics-04-injection-surface)

## 目标

实现注入检测器、三区隔离模型和审计日志，用 `injection-cases.json` 离线验证 4 种注入模式（生产 Redis/LLM 集成见章节正文；本 lab 为**内存示意**）。

## 前置准备

- Python 3.10+
- 本 lab 附带的 [`injection-cases.json`](injection-cases.json)（4 种注入模式）

## 目录

| 路径 | 说明 |
|------|------|
| `injection_detector.py` | 正则注入检测 + sanitize/block |
| `isolated_context.py` | 可信/半可信/不可信三区组装 |
| `audit_log.py` | 污染事件审计字段 |
| `injection-cases.json` | 4 种测试用例 |
| [`surface-list.md`](surface-list.md) | 注入面速查 |

## 验收命令

```bash
cd demos/basics-04-injection-surface-lab
pip install -r requirements.txt
python -m pytest -q test_injection_lab.py
```

期望：4 项测试全绿；注入识别率 100%（4/4 cases）。

## 步骤（扩展）

1. **InjectionDetector**：读取 `injection-cases.json`，对每条 `input` 调用 `scan()`。
2. **IsolatedContext**：System Prompt → TRUSTED；RAG chunk → SEMI_TRUSTED；用户输入 → UNTRUSTED。
3. **边界声明**：`assemble()` 输出含 `[TRUSTED]` 区域规则。
4. **审计日志**：每次检测命中写入 `AuditLog`，字段含 timestamp/source/severity/action。

## 验收清单

- [ ] pytest 套件通过（见上方验收命令）
- [ ] 4 种注入模式均被检测
- [ ] 三区隔离顺序：TRUSTED → SEMI_TRUSTED → UNTRUSTED
- [ ] 审计日志字段完整
