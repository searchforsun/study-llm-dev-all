# Demo：双栈创作 API 联调

对应章节：[双栈创作 API 联调](../../index.html#ch-practice-05-dual-stack)

## 前置
- Python 3.12+

## 实验内容
1. 启动 FastAPI 内容生成服务
2. 测试同步和流式生成端点
3. 模拟 Spring 端 Feign 调用

## 验收
- POST /generate 返回生成内容
- POST /generate/stream 流式输出
- 响应格式与 Spring 端兼容

核心文件：`dual_stack_api.py`
