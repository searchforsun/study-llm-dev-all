# Demo：交付物清单与安全报告

[章节](../../index.html#ch-advanced-02-portfolio)

## 实验目标

1. 整理代码助手交付物清单
2. 编写索引设计文档框架
3. 编写安全扫描报告模板

## 步骤一：交付物清单

检查以下交付物是否齐全：

- [ ] 架构设计文档（Architecture Doc）
- [ ] 索引设计文档（Index Design Doc）
- [ ] 安全扫描报告（Security Report）
- [ ] 交接文档（Handover Doc）
- [ ] Demo 脚本（Completion/QA/Review）
- [ ] API 文档（OpenAPI/Swagger）
- [ ] 运维部署手册
- [ ] 测试用例和结果

## 步骤二：索引设计文档

按以下结构撰写：

```markdown
# 索引设计文档

## 架构总览
## 切片策略
## Milvus Schema
## 增量更新策略
## 权限模型
```

## 步骤三：安全报告模板

```markdown
# 安全扫描报告
## SAST 结果 (Semgrep)
## 依赖扫描 (Trivy)
## 红队测试
## 修复计划
```

## 验证标准

- 交付清单包含至少 6 项
- 索引文档包含 5 个章节
- 安全报告覆盖 SAST+依赖+红队
