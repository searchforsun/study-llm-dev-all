# Demo：typing 模式与静态检查

对应章节：[类型注解与代码规范](../../index.html#ch-basics-02-types-style)

## 目标

- 运行 TypedDict / Protocol 示例
- 理解 ruff 与 mypy 在 CorpAssist 中的角色

## 运行

```powershell
cd demos/basics-02-types-style-lab
python type_patterns_demo.py
```

## mypy 练习（可选，需安装 mypy）

```powershell
uv run --with mypy mypy type_patterns_demo.py
```

故意将 `role: Literal["system", "user", "assistant"]` 赋值为 `"admin"` 应产生类型错误。

## 验收

- [ ] 脚本输出截断后消息条数与 embedding 维度
- [ ] 能解释 Protocol 与 Java interface 的差异
- [ ] 完成章节测验
