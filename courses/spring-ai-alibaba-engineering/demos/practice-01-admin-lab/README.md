# Demo：Admin 与可视化

对应章节：[Admin 与可视化](../../index.html#ch-practice-01-admin)

```bash
cd ../corpassist-saa-workbench
mvn spring-boot:run
curl -s http://localhost:8080/api/admin/dsl/sample | jq .
```

## 验收

- [ ] 返回 S3 办公 Agent DSL YAML（含 HITL 节点）
- [ ] 能说明 Studio 草稿 vs 生产版本治理
- [ ] 列出 Dify 迁移 3 个字段映射项
