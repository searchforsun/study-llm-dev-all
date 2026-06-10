# Demo：Message Hub 协作实验室

对应章节：[Message Hub 多 Agent 协作](../../index.html#ch-practice-02-message-hub)

## 前置

- Python 3.12+、`agentscope>=2.0.0`
- `DASHSCOPE_API_KEY`

## 文件

| 文件 | 说明 |
|------|------|
| `message_hub_demo.py` | Supervisor + Calendar/Mail Worker MsgHub 示例 |
| `requirements.txt` | 依赖 |

## 快速开始

```bash
cd demos/practice-02-message-hub-lab
pip install -r requirements.txt
export DASHSCOPE_API_KEY=your-key
python message_hub_demo.py
python message_hub_demo.py --manual-broadcast
```

## 验收

- [ ] 自动广播模式下 Supervisor 能汇总双 Worker 结果
- [ ] `--manual-broadcast` 时 MailWorker 不收到仅给 Calendar 的消息
- [ ] 使用 DashScopeMultiAgentFormatter
- [ ] 完成章节测验
