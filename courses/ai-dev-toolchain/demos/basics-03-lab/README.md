# basics-03-lab: AI 生成代码的质量管控

## 实验目标
通过配置静态检查工具链和 LLM-as-Judge 审查流程，掌握 AI 生成代码的三层质量防护体系。

## 准备工作
- Python 3.12+ 项目（可使用 CorpAssist 项目）
- 安装 ruff / mypy / bandit
- 安装 pre-commit

## 实验步骤

### 1. 配置静态检查工具链
创建 `.pre-commit-config.yaml`，集成 ruff/mypy/bandit 三个工具：
- ruff: 选择 I/D/UP/F/B 规则集，line-length=100
- mypy: strict 模式，python-version=3.12
- bandit: 排除 tests/ 目录

运行 `pre-commit run --all-files` 观察输出。

### 2. 识别七大缺陷
准备一段包含以下缺陷的 AI 生成代码：
- 幻觉 API（调用不存在的函数参数）
- 硬编码密钥
- SQL 注入拼接

运行 ruff/mypy/bandit 检查，记录工具检出率。

### 3. LLM-as-Judge 审查
对同一段代码运行 LLM-as-Judge 四维度评分（正确性/安全性/性能/可维护性），比较 AI 审查与静态检查的检出差异。

### 4. 覆盖率门禁配置
配置 pytest-cov --cov-branch，设定 fail-under=80，运行测试后观察通过/失败行为。

## 验收标准
- [ ] ruff/mypy/bandit 全部通过，无阻塞问题
- [ ] 至少拦截 3 个不同类型的 AI 代码缺陷
- [ ] LLM-as-Judge 输出四维度评分报告
- [ ] 分支覆盖率 >=80%
