# Demo：RAG 安全

对应章节：[RAG 安全](../../index.html#ch-advanced-05-security)

阅读 ACL 过滤样例，编写一条防止 CorpAssist 跨部门检索的 filter 规则。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `acl-filter.example.txt` 中 `dept` 与 `classification` 过滤逻辑
- 掌握 RAG 检索阶段 ACL 过滤的必要性与写法
- 能为 CorpAssist 编写一条防止跨部门检索的 filter 规则

## 步骤

1. 打开 `acl-filter.example.txt`，阅读现有 filter 样例（`dept == user.dept AND classification <= user.level`）。
2. 对照章节中 CorpAssist RAG 安全设计，分析跨部门检索的风险场景（HR 员工检索到财务部内部制度）。
3. 在 `acl-filter.example.txt` 中补充或完善一条防止跨部门检索的 filter 规则，写明过滤字段、匹配逻辑与例外情况（如公开文档）。
4. 自检：该 filter 是否在检索阶段生效（而非生成后过滤），以避免敏感片段进入 prompt？

## 验收

- [ ] verify.py 验收通过
- [ ] 已编写防止跨部门检索的 filter 规则
- [ ] 能说明 filter 在检索阶段拦截的必要性
- [ ] 完成章节测验
