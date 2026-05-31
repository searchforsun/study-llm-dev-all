# Demo：生产坑：数据、权限与索引

[章节](../../index.html#ch-practice-06-production-pitfalls)

## 目标
诊断脏 PDF、ACL 审计、Graph 补召回、Re-embed 版本管理。

## 文件
- `diagnose_pdf.py` — 脏 PDF 诊断工具
- `acl_audit.py` — ACL 过滤审计
- `graph_recall.py` — 文档关联图补充召回
- `reembed_manager.py` — Re-embed 版本管理

## 验收标准
- 扫描件 PDF 被正确识别并给出 OCR 建议
- ACL 审计无违规（用户不能看到 forbidden 文档）
- Re-embed 后两个版本有对比评测数据

## 运行
```bash
python diagnose_pdf.py ./data/scanned_doc.pdf
python acl_audit.py --role employee
```
