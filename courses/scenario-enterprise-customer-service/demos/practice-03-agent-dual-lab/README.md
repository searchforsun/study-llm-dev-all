# Demo：客服 Agent 双栈实现

## 目标
实现 LangGraph Agent + Spring AI Tools 双栈。

## 操作步骤
1. 画双栈 Agent 序列图
2. 在 LangGraph 中注册工具节点
3. 在 Spring 中实现 SSE 端点
4. 写 Redis DST 共享的伪代码

## 验收标准
- [ ] 序列图含 Python/Spring/Redis
- [ ] 工具节点可被 Agent 调用
- [ ] SSE 流式输出正常
