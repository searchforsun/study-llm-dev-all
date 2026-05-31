# Demo：多工具协作与编排

对应章节：[多工具协作与编排](../../index.html#ch-practice-03-multi-tool)

## 前置
- Python 3.12+
- OpenAI API Key

## 实验内容
1. 用 ToolExecutor 实现并行工具调用
2. 实现串行管线和错误重试
3. 测试部分成功场景的补偿流程

## 验收
- 并行工具总耗时 = max(各工具耗时)
- 单个工具超时不阻塞全局
- 关键步骤失败触发回滚

核心文件：`parallel_executor.py`, `pipeline.py`
