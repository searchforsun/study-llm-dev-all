# Demo：双栈方案设计文档

[返回章节](../index.html#ch-basics-02-architecture-doc)

## 目标

输出 CorpAssist L1 架构图、Python/Spring 分工表与 OpenAPI 契约骨架。

## 验收标准

- [ ] `arch-l1.mmd` 含用户→BFF→RAG→向量库→通义，标注信任边界
- [ ] `raci.md` 标 Python/Spring 各 4 项「拥有」
- [ ] `openapi.yaml` 含 /v1/chat 的必填字段（deptId/citationsRequired/traceId）
- [ ] `adr.md` 含 1 条架构决策记录

## 产出物

| 文件 | 说明 |
|------|------|
| `arch-l1.mmd` | L1 架构图 Mermaid 源文件 |
| `raci.md` | 分工表 + RACI 矩阵 |
| `openapi.yaml` | OpenAPI 3.0 契约（3 条路径） |
| `adr.md` | 架构决策记录 |

## 操作步骤

1. 画 L1 架构图，标注 DMZ/内网信任边界
2. 填写分工 RACI 矩阵
3. 编写 OpenAPI 3 条路径的定义
4. 写一条 ADR 记录「选择双栈架构」的决策
