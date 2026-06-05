# Demo：后台任务与队列

对应章节：[后台任务与队列](../../index.html#ch-advanced-02-background-jobs)

## 目标

- 理解 ARQ/Celery 风格任务 stub 的入队与状态轮询
- 对照 Spring `@Async` / 消息队列触发模式

## 步骤

```powershell
cd demos/advanced-02-background-jobs-lab
python task_stub.py
```

## 验收

- [ ] 输出任务 ID 与状态流转（pending → succeeded）
- [ ] 能说明 BFF 如何轮询 index job 状态
- [ ] 完成章节测验
