# Demo：A2A 与 Nacos

对应章节：[A2A 与 Nacos](../../index.html#ch-practice-06-a2a-nacos)

## 目标
配置两个 Agent 服务通过 A2A 通信。

## 操作步骤
1. 启动 Nacos 服务（`docker run -d -p 8848:8848 nacos/nacos-server`）
2. 创建 finance-agent 注册到 Nacos，暴露 `/a2a/execute` 端点
3. 创建 ticket-agent 注册到 Nacos，通过 A2AClient 调用 finance-agent
4. 验证跨服务 Agent 调用成功

## 验收
两个 Agent 服务通过 A2A 通信成功。

## 练习
写一句话说明 A2A 协议最适合什么场景。
