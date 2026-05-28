# Demo：CorpAssist 五模块与双栈配置

对应章节：[从大模型到应用工程](../../index.html#ch-basics-01-llm-app-landscape)

## 目标

- 理解 S1～S5 模块与配置键的对应关系
- 练习 Python / Spring 共用 `corpassist.llm` 网关配置

## 文件

| 文件 | 说明 |
|------|------|
| `corpassist-modules.yaml` | 与章节正文一致的本地开发配置样例 |
| `module-mapping-worksheet.md` | 五模块职责填空表（含参考答案） |

## 练习 1：配置键对照

阅读 `corpassist-modules.yaml`，回答：

1. Python 脚本读取网关应使用哪两个键？（提示：`base-url`、`api-key` 环境变量名）
2. Spring Boot 中 `corpassist.modules.s2-customer-service` 控制什么？
3. S1 的 `index` 与 `embedding-model` 分别对应 RAG 哪两步？

## 练习 2：五模块表

打开 `module-mapping-worksheet.md`，先填空再对照参考答案。

## 验收

- [ ] 能口述 S1～S5 各解决什么业务问题
- [ ] 能指出「统一网关」相对「每模块各持 API Key」的好处
- [ ] 完成章节测验

## 下一章

[Token、上下文窗口与费用](../../index.html#ch-basics-02-token-context) · Demo：[basics-02-token-budget](../basics-02-token-budget/)
