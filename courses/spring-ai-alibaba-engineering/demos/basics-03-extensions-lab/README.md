# Demo：spring-ai-alibaba-extensions

对应章节：[extensions](../../index.html#ch-basics-03-extensions)

**可运行工程**：[`../corpassist-saa-workbench/`](../corpassist-saa-workbench/)

## 运行

```bash
cd ../corpassist-saa-workbench
mvn spring-boot:run
curl -s -X POST http://localhost:8080/api/extensions/parse \
  -H "Content-Type: application/json" \
  -d '{"filename":"leave.pdf","mimeType":"application/pdf","content":"员工年假不少于10天","tenantId":"t1"}'
```

## 验收

- [ ] 返回 `chunks` 数组（stub 解析）
- [ ] 阅读 `extensions-list.md` 列出生产需引入的 Maven 坐标
- [ ] 说明 extensions 与 core Starter 的版本对齐方式（BOM）
