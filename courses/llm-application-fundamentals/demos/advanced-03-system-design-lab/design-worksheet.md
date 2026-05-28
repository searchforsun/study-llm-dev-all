# 系统设计口述提纲（15 分钟）

## 1. 需求（3 min）
- 用户：____ DAU，峰值系数 ____
- 核心用例：制度问答 + 引用溯源
- 数据分级：L2 / L3 / L4 各如何处理？

## 2. 方案（5 min）
- 组件：BFF / orchestrator / rag-service / gateway / vector DB
- 在线路径 5 步：____

## 3. 权衡（3 min）
- 同步 vs 异步索引：____
- 混合检索 vs 纯向量：____

## 4. 风险（2 min）
- 幻觉 / 索引延迟 / 成本：____

## 5. 指标（2 min）
- P95、eval pass rate、citation rate：____
