# Demo：异常与 structlog

对应章节：[异常、日志与配置](../../index.html#ch-basics-04-errors-logging)

## 目标

- 观察 JSON 结构化日志（成功 / 失败）
- 理解 request_id 与 Java ELK 联查

## 运行

```powershell
pip install structlog
cd demos/basics-04-errors-logging-lab
python structured_logging_demo.py
```

stdout 为 JSON 行；stderr 为说明文字。

## 验收

- [ ] 至少 2 条 JSON 日志（info + error）
- [ ] error 含 code=LLM_UPSTREAM 与 request_id
- [ ] 完成章节测验
