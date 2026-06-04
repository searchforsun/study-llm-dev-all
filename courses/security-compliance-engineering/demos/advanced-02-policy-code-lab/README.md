# Demo：OPA 策略包实验室

[返回章节](../../index.html#ch-advanced-02-policy-code)

## 目标

编写并测试 CorpAssist 工具授权 Rego 策略，验证 guard bundle 签名占位。

## 前置

- Node.js 18+
- 可选：安装 [OPA](https://www.openpolicyagent.org/) 以运行 `opa test`

## 步骤

1. 阅读 `policies/tool_authz.rego` 与 `tool_authz_test.rego`。
2. 运行 `opa test -v policies/`（若未安装 OPA，可跳过，以步骤 3 为准）。
3. 运行 `node verify-bundle.mjs` 检查 `bundle/manifest.yaml` 含 `bundle_id` 与 `signature`。

## 验收命令

```bash
cd demos/advanced-02-policy-code-lab
node verify-bundle.mjs
```

期望输出：`bundle signature ok`

（可选）`opa test -v policies/` 全部 PASS。

## 验收清单

- [ ] `node verify-bundle.mjs` 输出 `bundle signature ok`
- [ ] manifest 含 `bundle_id` 与 `signature`
- [ ] Rego 测试含 allow 与 deny 用例
