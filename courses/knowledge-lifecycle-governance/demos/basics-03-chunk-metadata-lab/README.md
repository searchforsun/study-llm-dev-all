# Demo：分块与 C7 metadata

[章节](../../index.html#ch-basics-03-chunk-metadata)

## 目标

对照 CorpAssist **corpassist schema（C7）** 列出必填字段，并构造一条合法 chunk JSON。

## 步骤

1. 打开 [`schema-fields.md`](schema-fields.md)。
2. 列出 C7 **8 个必填** metadata 字段（含 schema_version、doc_id、acl_tags 等）。
3. 任选一 doc_type_tag（policy/faq/contract），写一条 `{doc_id}#chunk-001` 样例键值。

## 验收

- [ ] 8 字段与章节 JSON 样例逐键对照无缺项
- [ ] chunk_id 符合 `{doc_id}#chunk-{seq}` 规范
- [ ] acl_tags 为非空数组

验收人签名与日期：________
