# Demo：文档接入与索引流水线

[章节](../../index.html#ch-practice-01-ingest)

## 目标
构建生产级 Python 索引管线，处理多格式文档并标注 ACL 元数据。

## 文件
- `unstructured_parse.py` — Unstructured 多格式解析
- `index_job.py` — Celery 批量索引任务
- `acl_indexing.py` — ACL 元数据标注

## 验收标准
- 索引管线成功处理 3 份测试文档（PDF/扫描件/Word）
- 每份文档输出 chunk 数量和 metadata 内容
- 验证幂等写入（同一份文档不重复索引）

## 运行
```bash
python index_job.py --doc_dir ./data/docs/
```
