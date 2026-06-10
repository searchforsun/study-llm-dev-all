# Demo 索引 · AgentScope 多 Agent 工程实践

## 离线验收（无 API Key）

Python lab 支持 AgentScope 2.0 兼容层（`demos/_corpassist_compat.py`）。设置环境变量后可用 mock 路径跑通 README 主命令：

```powershell
$env:CORPASSIST_MOCK = "1"
python main.py   # 或各 lab 入口脚本
```

`practice-04-hitl-lab` 亦可 `--decision allow` 非交互验收。`advanced-03` 用 `pytest eval_capstone.py -v`；`advanced-04` 用 `diagnose.py`。

## 章节目录

| 章 | 目录 |
|----|------|
| basics-01-framework-compare | [basics-01-framework-compare-lab](./basics-01-framework-compare-lab/) |
| basics-02-react-events | [basics-02-react-events-lab](./basics-02-react-events-lab/) |
| basics-03-tools-mcp | [basics-03-tools-mcp-lab](./basics-03-tools-mcp-lab/) |
| basics-04-memory | [basics-04-memory-lab](./basics-04-memory-lab/) |
| basics-05-model-adaptation | [basics-05-model-adaptation-lab](./basics-05-model-adaptation-lab/) |
| practice-01-single-agent | [practice-01-single-agent-lab](./practice-01-single-agent-lab/) |
| practice-02-message-hub | [practice-02-message-hub-lab](./practice-02-message-hub-lab/) |
| practice-03-pipeline | [practice-03-pipeline-lab](./practice-03-pipeline-lab/) |
| practice-04-hitl | [practice-04-hitl-lab](./practice-04-hitl-lab/) |
| practice-05-agentic-rag | [practice-05-agentic-rag-lab](./practice-05-agentic-rag-lab/) |
| advanced-01-agent-service | [advanced-01-agent-service-lab](./advanced-01-agent-service-lab/) |
| advanced-02-framework-compare | [advanced-02-framework-compare-lab](./advanced-02-framework-compare-lab/) |
| advanced-03-capstone | [advanced-03-capstone-lab](./advanced-03-capstone-lab/) |
| advanced-04-interview | [advanced-04-interview-lab](./advanced-04-interview-lab/) |
