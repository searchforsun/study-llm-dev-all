# RAG 专用 Prompt 实验室

CorpAssist HR 知识库 RAG Prompt：引用格式、拒答、grounded-only 与 cite 校验。

## 文件

| 文件 | 说明 |
|------|------|
| `rag-prompt-template.md` | System Prompt 模板（引用规则 + 拒答） |
| `sample-context.txt` | 两条 mock CONTEXT 块 |
| `sample-answer.txt` | 带 cite 的样例回答 |
| `validate_cites.py` | 校验 cite 是否 grounded |

## 任务

1. 补全 `rag-prompt-template.md` 中「引用规则」与「拒答模板」章节。
2. 确保 `sample-answer.txt` 中每个 `[doc_id:chunk]` 出现在 `sample-context.txt`。
3. 若校验失败，修正 answer 或 context，直至通过。

## 验收命令

```bash
cd demos/practice-01-rag-prompt-lab
python validate_cites.py
```

期望输出：`OK: all cites grounded`
