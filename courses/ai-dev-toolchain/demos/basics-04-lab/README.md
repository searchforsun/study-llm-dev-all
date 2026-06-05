# Demo：项目级 Rules 与 pre-commit

对应章节：[规则与约定驱动开发](../../index.html#ch-basics-04)

## 目标

在迷你仓库中编写 `.cursor/rules` 片段与 `pre-commit` 配置，使 AI 生成代码与人写代码走同一门禁。

## 步骤

1. 阅读 `rules/corpassist-python.mdc.example`
2. 复制为 `rules/corpassist-python.mdc` 并补全 `acceptance_commands`
3. 安装并运行 `pre-commit`（见 `.pre-commit-config.yaml`）
4. 对 `sample_bad.py` 运行 ruff，确认可自动修复项

## 验收

- [ ] `rules/corpassist-python.mdc` 含 pytest/ruff 可执行命令
- [ ] `pre-commit run --all-files` 通过或仅剩需人工项
- [ ] 记录 1 条「Rules 与代码脱节」的预防做法

## 验收命令

```bash
pip install pre-commit ruff
pre-commit run --all-files
ruff check sample_bad.py
```
