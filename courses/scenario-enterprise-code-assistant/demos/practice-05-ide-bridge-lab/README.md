# Demo：IDE 集成与数据边界

[章节](../../index.html#ch-practice-05-ide-bridge)

## 实验目标

1. 画出插件数据流图
2. 实现敏感度路由
3. 设计隐私保护策略

## 步骤一：数据流图

画出 IDE 插件的数据边界：

```
IDE 插件 → API 网关 (只发送)
  ├── prefix/suffix (光标上下文)
  ├── 文件 hash (用于缓存判断)
  └── 光标位置
IDE 插件 ← 服务端 (接收)
  ├── 补全建议文本
  └── 引用代码块
```

## 步骤二：敏感度路由

```java
var analyzer = new SensitivityAnalyzer();
var level = analyzer.analyze("payment/SecretKeyManager.java");
// 应返回 RESTRICTED → 仅符号补全
```

## 步骤三：隐私保护清单

列出 5 项措施并解释实现方式。

## 验证标准

- 数据流图标注发送/不发送的数据
- 敏感代码正确路由到本地/限制模式
- 隐私清单涵盖加密、清除、审计
