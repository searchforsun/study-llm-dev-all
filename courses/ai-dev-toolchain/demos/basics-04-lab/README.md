# basics-04-lab: 规则与约定驱动开发

## 实验目标
编写项目级 Rules 文件、配置代码自动格式化、使用 OpenAPI Schema 驱动代码生成、实施双层 Code Review。

## 准备工作
- Python 3.12+ 项目
- 安装 Black 代码格式化器
- 安装 Prism CLI (`npm install -g @stoplight/prism-cli`)
- 访问项目的 /openapi.json 端点

## 实验步骤

### 1. 编写 Rules 文件
在项目根目录创建 CLAUDE.md，使用四要素模板（DO/DONT/EXAMPLE/FALLBACK）：
- DO: 10-15 条正向行为指示
- DONT: 5-10 条禁止陷阱
- EXAMPLE: 2-3 个高质量代码示例或文件路径
- FALLBACK: 3-5 条兜底策略

运行 AI 生成一段代码，验证 Rules 遵循率。

### 2. 配置 Black 自动格式化
在 pyproject.toml 配置 Black（line-length=100, target-version=py312）。
配置 pre-commit hook 自动运行 black。
运行 `black --check app/` 验证格式一致性。

### 3. OpenAPI Schema 验证
从 FastAPI 的 /openapi.json 获取 Schema。
编写一个 Pydantic 请求体模型和一个路由函数。
运行 `prism validate openapi.json` 验证 Schema 合规性。

### 4. 双层 Review 流程
设计 AI 预审 CLI 命令，包含：
- Blocking 级别：安全漏洞、编译错误
- Non-Blocking 级别：性能问题
- Warning 级别：代码风格建议

## 验收标准
- [ ] Rules 文件 >=150 行，覆盖全部四要素
- [ ] AI 生成代码遵循率 >=90%
- [ ] Black 格式化后风格评论减少 >=80%
- [ ] Prism 验证通过
- [ ] 双层 Review 流程可运行
