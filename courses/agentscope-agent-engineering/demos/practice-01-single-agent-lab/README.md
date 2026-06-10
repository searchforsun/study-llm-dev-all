# Demo：CorpAssist 办公助手实验室

对应章节：[单 Agent：CorpAssist 办公助手](../../index.html#ch-practice-01-single-agent)

## 前置

- Python 3.12+
- `pip install agentscope`
- 环境变量：`DASHSCOPE_API_KEY`

## 文件

| 文件 | 说明 |
|------|------|
| `office_assistant.py` | ReActAgent + 日历/邮件/工单/转人工四工具 |
| `requirements.txt` | agentscope 依赖 |

## 快速开始

```powershell
cd demos/practice-01-single-agent-lab
pip install -r requirements.txt
$env:DASHSCOPE_API_KEY = "your-key"
python office_assistant.py
python office_assistant.py --max-iters 2
```

## 练习

1. 补全工具 docstring，跑通「日历 + 邮件」复合请求。
2. 观察 `reply_stream` 中 tool_call 事件。
3. 将 `max_iters=2` 验证预算降级或转人工。

## 验收

- [ ] 复合请求完成多步 tool_call
- [ ] `max_iters=2` 时触发转人工或提前终止
- [ ] 工具失败返回 ToolResponse 而非抛异常
- [ ] 完成章节测验
