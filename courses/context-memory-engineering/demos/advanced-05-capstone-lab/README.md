# Demo：与 RAG/Agent 课集成验收

[返回章节](../../index.html#ch-advanced-05-capstone)

## 目标

编写记忆子系统 OpenAPI 契约，实现 RAG/Agent 集成测试，验收指标达标并绑定 CI/CD，完成跨课交接文档。

## 前置准备

- Python 3.8+ 或 JDK 17+
- 已完成 practice-05 的 API 端点
- CI/CD 系统（GitHub Actions 或 Jenkins）

## 步骤

1. **编写 OpenAPI 契约**：创建 openapi.yaml 文件，定义 /v1/session、/v1/memory/recall、/v1/memory/facts、/v1/memory/{user} 的请求/响应格式。

2. **实现集成测试套件**：编写 3 个集成测试 —— 会话连续性（RAG 集成）、Checkpoint 恢复（Agent 集成）、GDPR 删除（合规）。使用 mock 或测试环境运行。

3. **验收指标检查**：运行 MemoryEvalSuite，记录多轮一致性、P95 召回延迟等指标。确认 ≥ 95% 一致性和 ≤ 200ms 延迟。

4. **CI/CD 绑定**：在 CI 配置中添加验收指标检查步骤，指标不达标时阻断部署。

5. **编写交接文档**：创建 handoff.md，包含 API 端点、Redis Key 约定、部署拓扑、FAQ。

## 预期输出

OpenAPI 文档完整。集成测试全部通过。验收指标达标。CI/CD 绑定生效。交接文档清晰完整。

## 验收清单

- [ ] OpenAPI 契约文件完整
- [ ] 3 个集成测试通过
- [ ] 验收指标达标（一致性 ≥ 95%，延迟 ≤ 200ms）
- [ ] CI/CD 绑定了指标检查
- [ ] 交接文档包含 API/Key 约定/FAQ
