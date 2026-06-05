# Demo：多知识库与路由

对应章节：[多知识库与路由](../../index.html#ch-practice-04-multi-kb)

阅读多知识库路由配置，补充一条 ACL 规则以限制跨部门知识库访问。

## 可运行 Demo

```bash
python verify.py
```

## 目标

- 理解 `kb-routing.yaml` 中多知识库（hr、it）的路由与集合映射
- 掌握 ACL 规则在多知识库场景下的必要性与写法
- 能为 CorpAssist 补充一条防止越权访问知识库的 ACL 规则

## 步骤

1. 打开 `kb-routing.yaml`，阅读 `knowledge_bases` 下 hr 与 it 两个知识库的路由配置。
2. 对照章节中 CorpAssist 多知识库 ACL 设计，思考：HR 员工查询时不应检索到 IT 内部文档，需要怎样的过滤规则？
3. 在 `kb-routing.yaml` 中补充一条 ACL 规则（如按 `user.dept` 限制可访问的 `collection`），并写明规则逻辑。
4. 自检：规则是否覆盖「用户只能访问本部门及公开知识库」的基本安全要求？

## 验收

- [ ] verify.py 验收通过
- [ ] `kb-routing.yaml` 已补充一条 ACL 规则
- [ ] 能说明该规则如何防止跨部门知识库越权访问
- [ ] 完成章节测验
