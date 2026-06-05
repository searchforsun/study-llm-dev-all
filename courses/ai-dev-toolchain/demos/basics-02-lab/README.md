# Demo：Prompt 驱动开发 Context 包

对应章节：[Prompt 驱动开发工作流](../../index.html#ch-basics-02)

## 目标

为 CorpAssist「CA-1428 citations 字段」任务编写 `context-pack.yaml`，练习 L1 Rules + L2 任务包组织方式。

## 步骤

1. 复制 `context-pack.example.yaml` 为 `context-pack.yaml`
2. 填写 `must_read`：OpenAPI 片段、`tests/rag/` 路径、相关 Pydantic 模型
3. 在 Cursor 中用该包发起一次「设计要点 → 生成 → 审查」闭环（纸面记录即可）
4. 对照章节检查是否包含验证命令与禁止项

## 验收

- [ ] `context-pack.yaml` 含 `goal`、`must_read`、`acceptance_commands`
- [ ] 设计要点不超过半页（见 `design-notes.md`）
- [ ] 列出 2 条本次返工原因（可写在 design-notes 末尾）

## 验收命令

```bash
# 校验 YAML 可读
python -c "import yaml; yaml.safe_load(open('context-pack.yaml'))"
```
