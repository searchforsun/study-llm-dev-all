# Demo：工具调用权限

[章节](../../index.html#ch-practice-01-tool-authz)

## 目标
设计角色-工具权限矩阵并实现鉴权。

## 步骤
1. 在 authz-model.md 中设计角色-工具权限矩阵
2. 实现 Java ToolAuthorizationService 的 authorize 方法
3. 配置 Python ToolSandbox 执行沙箱

## 验收标准
- [ ] authz-model.md 含角色矩阵、参数校验规则
- [ ] 工具鉴权三层：角色→参数→OAuth
- [ ] 沙箱限制命令白名单和超时
