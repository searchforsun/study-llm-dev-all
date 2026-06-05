# Demo：打包、版本与发布

对应章节：[打包、版本与发布](../../index.html#ch-advanced-03-packaging)

## 目标

- 核对 `pyproject.toml` 版本与 semver 约定
- 理解 Docker 镜像 tag 与 `info.version` 对齐

## 步骤

```powershell
cd demos/advanced-03-packaging-lab
python version_check.py
```

对照 `pyproject.snippet.toml` 中的 `[project].version` 字段。

## 验收

- [ ] `version_check.py` 输出当前版本且无报错
- [ ] 能说明 MINOR 与 MAJOR 发版各需更新哪些文件
- [ ] 完成章节测验
