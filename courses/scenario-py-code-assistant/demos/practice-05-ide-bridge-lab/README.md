# Demo：IDE 集成概念验证

对应章节：[IDE 集成概念验证](../../index.html#ch-practice-05-ide-bridge)

## 前置
- Python 3.12+

## 实验内容
1. 实现 IDEConnector LSP 协议桥接
2. 模拟 VS Code 插件调用补全 API
3. 验证前缀/后缀上下文提取

## 验收
- LSPCompletionParams 正确提取光标上下文
- 补全结果通过 LSP 格式返回
- 支持多语言（python/java）

核心文件：`ide_bridge.py`
