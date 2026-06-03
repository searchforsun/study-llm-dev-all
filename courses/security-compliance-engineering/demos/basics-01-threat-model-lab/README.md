# Demo：LLM 应用威胁模型

[章节](../../index.html#ch-basics-01-threat-model)

## 目标

在 CorpAssist 客服场景完成威胁登记表与 trust boundary 标注。

## 步骤

1. 打开 `threat-list.md`，为四条模板威胁各补充：检测信号、负责角色、首道防线。
2. 对照正文「注入、越权与泄露」数据流，在纸上标出 3 处 attack surface。
3. 列出 CorpAssist 四条 sec baseline 边界（入站/出站/工具/审计）。

## 验收命令

```bash
# 确认四条威胁均已填写（每行非空且含检测/角色描述）
grep -E "检测|角色|防线" threat-list.md | wc -l
# 期望：≥ 4
```

## 验收标准

- [ ] threat-list.md 四条威胁各含检测信号与负责角色
- [ ] 能口述 3 处 attack surface 与对应 trust boundary
