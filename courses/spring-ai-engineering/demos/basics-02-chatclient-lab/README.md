# Demo：ChatClient 与 ChatModel

对应章节：[ChatClient 与 ChatModel](../../index.html#ch-basics-02-chatclient)

阅读 `ChatServiceDemo.java`，画出 ChatClient → ChatModel → 网关 HTTP 调用链。

## 步骤

1. 阅读 `ChatServiceDemo.java` 中 `.call()` 与注释里的 `.stream()` 示例。
2. 在笔记标注四层调用链：Controller → ChatClient → ChatModel → OpenAI 兼容网关。
3. 对照 Python `client.chat.completions.create`，列出应对齐的 4 个 parity 参数。

## 验收命令

```bash
cd demos/basics-02-chatclient-lab
javac ChatServiceDemo.java
```

## 验收

- [ ] 对 ChatServiceDemo.java 执行 javac 无编译错误
- [ ] 能解释 ChatClient 相对 ChatModel 的封装价值
- [ ] 完成章节测验
