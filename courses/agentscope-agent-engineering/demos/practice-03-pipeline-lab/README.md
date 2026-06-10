# Demo：Pipeline 编排实验室

对应章节：[Pipeline 工作流编排](../../index.html#ch-practice-03-pipeline)

## 前置

- Python 3.12+、`agentscope>=2.0.0`
- `DASHSCOPE_API_KEY`

## 文件

| 文件 | 说明 |
|------|------|
| `pipeline_demo.py` | sequential / fanout 模式 + LoopGuard |
| `loop_guard.py` | 循环检测 helper |
| `requirements.txt` | 依赖 |

## 快速开始

```bash
cd demos/practice-03-pipeline-lab
pip install -r requirements.txt
export DASHSCOPE_API_KEY=your-key
python pipeline_demo.py --mode sequential
python pipeline_demo.py --mode fanout
python loop_guard.py
```

## 验收

- [ ] sequential 模式 HR→IT→Admin 顺序输出
- [ ] fanout 模式返回三路审阅 Msg 列表
- [ ] `loop_guard.py` 打印 `LOOP_DETECTED`
- [ ] 完成章节测验
