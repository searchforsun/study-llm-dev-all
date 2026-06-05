# DashScope API Key 轮换 Runbook（练习模板）

## 四阶段

| 阶段 | 动作 | 验证 |
|------|------|------|
| T0 准备 | 在 Secret Manager 创建 `key-v2`；通知依赖方 | `kubectl get secret dashscope-key` 含 v2 |
| T1 双 Key 重叠 | 应用同时接受 v1/v2（网关或 Spring 配置双值） | staging `curl /api/agent/chat` 200 |
| T2 切主 | 将主 Key 指向 v2；监控 401/429 | Micrometer `dashscope.auth.error` = 0 |
| T3 下线 v1 | 撤销 v1；Git 历史扫描无泄露 | 百炼控制台 Key 列表仅 v2 active |

## 回滚条件

- 5 分钟内 401 率 > 1%
- Agent 完成率下降 > 5%
- 账单突增（误用 batch Key 跑在线）

## 验证命令（示意）

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/actuator/health
curl -s -X POST http://localhost:8080/api/agent/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Key rotation smoke"}'
```
