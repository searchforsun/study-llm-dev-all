# Demo：文档接入与解析

对应章节：[文档接入与解析](../../index.html#ch-basics-02-ingestion)

阅读样例文档元数据，识别接入阶段必须保留的 meta 字段及其在检索过滤中的作用。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解文档接入时 meta 字段的采集原则（来源可追溯、权限可过滤）
- 能从 `sample-doc-meta.json` 中选出 3 个应保留的 meta 字段并说明理由
- 建立「meta 缺失 → 检索越权或引用不可追溯」的风险意识

## 步骤

1. 打开 `sample-doc-meta.json`，阅读 `text` 与 `meta` 结构。
2. 对照章节中 CorpAssist 文档接入规范，逐一评估 `source`、`page`、`dept` 等字段的业务价值。
3. 列出 3 个应保留的 meta 字段，并为每个字段写一句用途说明（如 ACL 过滤、引用溯源、分页定位）。
4. 思考：若缺少 `dept` 字段，跨部门检索时会产生什么风险？

## 验收

- [ ] verify.py 验收通过
- [ ] 已列出 3 个应保留的 meta 字段及各自用途
- [ ] 能说明 meta 字段与 ACL / 引用溯源的关联
- [ ] 完成章节测验
