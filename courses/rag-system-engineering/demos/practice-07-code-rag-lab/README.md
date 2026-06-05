# Demo：代码库 RAG 与研发助手

对应章节：[代码库 RAG 与研发助手（面试场景）](../../index.html#ch-practice-07-code-rag)

阅读代码库 RAG 要点笔记，补充一条安全扫描要求以防范敏感信息泄露。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `code-rag-notes.md` 中代码库 RAG 的核心约束（检索范围、prompt 体量）
- 掌握代码库 RAG 上线前必须满足的安全扫描要求
- 能为 CorpAssist 研发助手场景补充一条可执行的安全扫描规则

## 步骤

1. 打开 `code-rag-notes.md`，阅读 S4 场景要点（勿整库塞 prompt、检索范围限定 repo+branch）。
2. 对照章节中代码库 RAG 安全规范，思考：索引前需扫描哪些敏感模式（API Key、密码、内网地址、证书等）。
3. 在 `code-rag-notes.md` 中补充一条安全扫描要求，写明扫描时机（索引前/检索后）、扫描对象与违规处理方式。
4. 自检：该要求是否能防止 CorpAssist 研发助手将密钥或内网信息带入 RAG 回答？

## 验收

- [ ] verify.py 验收通过
- [ ] `code-rag-notes.md` 已补充一条安全扫描要求
- [ ] 能说明扫描时机、对象与违规处理方式
- [ ] 完成章节测验
