# Demo：HITL 审批实验室

对应章节：[Human-in-the-loop 与 Realtime Steering](../../index.html#ch-practice-04-hitl)

## 前置

- Python 3.12+、`agentscope>=2.0.0`
- `DASHSCOPE_API_KEY`

## 文件

| 文件 | 说明 |
|------|------|
| `hitl_demo.py` | ASK 权限 + CLI 审批 + audit.jsonl |
| `audit.py` | 审计日志 helper |
| `requirements.txt` | 依赖 |

## 快速开始

```bash
cd demos/practice-04-hitl-lab
pip install -r requirements.txt
export DASHSCOPE_API_KEY=your-key
python hitl_demo.py
```

## 验收

- [ ] 触发 send_email ASK 事件
- [ ] CLI 选 MODIFY 后 audit.jsonl 含 modified_args
- [ ] DENY 决裁同样写入 audit.jsonl
- [ ] 完成章节测验
