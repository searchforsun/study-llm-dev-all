# Demo：Agentic RAG 实验室

对应章节：[Agentic RAG 集成](../../index.html#ch-practice-05-agentic-rag)

## 前置

- Python 3.12+、`agentscope>=2.0.0`
- 可选：`langchain-community`、`langchain-openai`（有 Chroma 索引时）
- `DASHSCOPE_API_KEY`

## 文件

| 文件 | 说明 |
|------|------|
| `kb_agent_demo.py` | 检索工具 + ReActAgent（含 mock 检索 fallback） |
| `requirements.txt` | 依赖 |

## 快速开始

```bash
cd demos/practice-05-agentic-rag-lab
pip install -r requirements.txt
export DASHSCOPE_API_KEY=your-key
python kb_agent_demo.py "年假最多几天"
python kb_agent_demo.py "火星移民政策"
```

## 说明

- 若本地无 Chroma 索引，脚本使用内置 mock 文档演示引用格式。
- 有 rag-system-py 索引时，修改 `CHROMA_DIR` 指向 `./data/chroma`。

## 验收

- [ ] 政策问题回答含 [1] 引用
- [ ] 低相关/无关问题触发拒答文案
- [ ] 完成章节测验
