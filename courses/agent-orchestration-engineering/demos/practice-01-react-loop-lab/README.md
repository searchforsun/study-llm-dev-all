# ReAct 循环实现实验室

## 目标
实现一个带终止条件检测的 ReAct Agent。

## 练习
1. 用 StateGraph 构建包含 Agent 和 Tool 节点的状态图
2. 添加条件边实现 should_continue 逻辑
3. 实现重复工具调用检测和连续失败检测
4. 用 S2 客服场景测试

## 验收标准
- [ ] Agent 能正常运行 S2 客服场景
- [ ] 重复工具调用在 3 次后触发终止
- [ ] 连续失败后正确转人工
- [ ] 双栈（Python + Java）各有一个实现

## 参考
- 章节: practice-01-react-loop
