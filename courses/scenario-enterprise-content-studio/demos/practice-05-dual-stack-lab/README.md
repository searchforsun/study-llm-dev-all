# Demo：双栈创作 API 联调

## 目标
实现 FastAPI + Spring BFF 双栈联调。

## 文件说明
- `api-contract.md` — API 契约定义
- `README.md` — 本说明

## 操作步骤
1. 用 FastAPI 实现 /v1/generate 接口
2. 用 Spring WebClient 编写 BFF
3. 实现 SSE 流式输出
4. 写 API 契约 JSON

## 验收标准
- [ ] Python 服务可独立运行
- [ ] Spring BFF 可调用 Python
- [ ] SSE 流式正常
