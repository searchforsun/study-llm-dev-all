# Demo：CorpAssist Prompt 毕业套件实验室

[返回章节](../../index.html#ch-advanced-04-capstone)

## 目标

组装 capstone-bundle：三套场景模板登记到 prompt-registry，并生成 eval-manifest 交付物。

## 前置

- Python 3.10+
- 已完成本课 practice 阶段 RAG/Agent/JSON 章节

## 步骤

1. 检查 `prompt-registry.json` 中 s1-rag / s2-agent / s3-json 的 hash。
2. 编辑 `eval-manifest.json` 使 `prompt_version` 与 registry semver 一致。
3. 填写 `dataset_version` 指向毕业评测集。
4. 运行验收命令验证三套模板与 manifest 对齐。

## 预期

输出 `capstone_bundle=ok` 与 `graduation_checklist=3/3 templates`。

## 验收

验收命令：

```bash
python check_capstone.py
```

## 验收清单

- [ ] 三套模板均在 registry
- [ ] eval-manifest 版本对齐
- [ ] 验收命令通过
