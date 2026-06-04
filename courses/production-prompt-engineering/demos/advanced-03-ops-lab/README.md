# Demo：PromptOps 协作实验室

[返回章节](../../index.html#ch-advanced-03-ops)

## 目标

编写可评审的 prompt-spec JSON，演示 eval-binding 与 ci-prompt-gate 最小字段。

## 前置

- Python 3.10+
- 熟悉本章「产品-研发流程」「评测联动」

## 步骤

1. 复制 `prompt-spec.sample.json` 为 `prompt-spec.local.json`。
2. bump `semver` patch 并追加一条 `change_log`。
3. 将 `eval_binding.dataset_version` 改为你们评测集版本号。
4. 运行验收命令，确认门禁字段齐全。

## 预期

输出 `ci_prompt_gate=pass` 与 `eval_binding_ok=1`。

## 验收

验收命令：

```bash
python check_ops_gate.py
```

## 验收清单

- [ ] semver 与 change_log 非空
- [ ] dataset_version 已填写
- [ ] 验收命令通过
