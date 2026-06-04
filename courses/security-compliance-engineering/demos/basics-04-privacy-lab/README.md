# Demo：隐私与脱敏实验室（C28）

[返回章节](../../index.html#ch-basics-04-privacy)

## 目标

在 CorpAssist 日志与审计链路中落地 PII 脱敏规则，覆盖手机号、身份证、邮箱三类常见字段（C28）。

## 前置准备

- Python 3.10+
- 了解企业《个人信息保护法》最小必要原则

## 步骤

1. 运行 `pii_redact_check.py`，观察 `[PHONE]` / `[EMAIL]` / `[ID_CARD]` 替换结果。
2. 为 CorpAssist 增加「银行卡号」「工号」两类自定义规则（扩展 `PII_RULES`）。
3. 设计日志字段分级：DEBUG 禁止原始 PII，INFO 仅保留哈希或尾号。
4. 对照 Java `DataMaskingAdvisor` 或自研 `MessagePostProcessor` 写出等价逻辑要点。
5. 说明向量库与长期记忆中存储用户画像时的加密与 TTL 策略。

## 预期输出

- 扩展规则后脚本仍输出 `OK: CorpAssist PII redaction passed`
- 日志样例中无可逆向的明文 PII

## 验收

```bash
cd demos/basics-04-privacy-lab
python pii_redact_check.py
```
