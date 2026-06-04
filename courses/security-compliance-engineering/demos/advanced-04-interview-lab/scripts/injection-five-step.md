# 注入越权 — 五步法面试稿

## 1. 现象

CorpAssist 某城商行金融租户在 18 分钟内出现 37 次跨用户余额查询；安全运营通过审计规则 `TOOL_CROSS_USER` 发现异常，P95 工具延迟从 120ms 升至 890ms。我们立即将事件定级为 P1，冻结相关客服账号并保留 WORM 审计样本。

## 2. 采集

我带队拉取完整 `trace_id` 链路，核对工具参数 `target_user` 与 JWT `sub` 不一致；同时确认网关返回头 `X-Policy-Bundle: 2026.05.1` 缺少 `CTRL-TOOL-04` 主体绑定。采集阶段不做猜测，只固化证据供监管与客户通报。

## 3. 根因

映射 OWASP LLM07「过度代理」：攻击 Prompt 诱导模型调用 `query_balance`，而 OPA/Advisor 未强制 `input.jwt_sub == input.target_user`。根因是策略版本漂移，而非模型「变聪明」。

## 4. 修复

短期熔断 `query_balance` 24 小时；24h 内发布 Rego deny 规则并升级 bundle 至 `2026.06.04`；对受影响 37 条查询发起客户告知与补偿流程。修复后回放攻击 Prompt，确认返回 403 `POLICY_DENY`。

## 5. 预防

红队用例 `INJ-TOOL-09` 纳入 CI 回归；监控「跨用户工具调用」P99 检测 &lt;1min；每季度与业务联合演练。投标材料中附上本次 MR、测试报告与审计样本索引，证明可验收闭环。
