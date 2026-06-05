# CorpAssist 记忆子系统 · 跨课交接（Lab 示意）

## API 端点

- `GET/POST /v1/session/{tenant}/{user_id}/messages`
- `POST /v1/memory/{user_id}/recall`
- `GET /v1/memory/{user_id}/facts`
- `DELETE /v1/memory/{user_id}`（GDPR）

## Redis Key 约定

- 会话：`corpassist:session:{tenant}:{user_id}`（JSON schema `corpassist-session-v1`）
- 黑板：`corpassist:blackboard:{session_id}`

## 部署拓扑

- Python 记忆服务：写入 session + 长期事实
- Java BFF：只读 session JSON（见 practice-01 java-reader）

## FAQ

**Q: consistency 与多轮一致性区别？**  
A: consistency 测跨层矛盾；多轮一致性测连续对话约束是否保持。

**Q: 发布门禁？**  
A: 多轮一致性 ≥95%，跨层 consistency ≥0.85，P95 召回 <120ms。
