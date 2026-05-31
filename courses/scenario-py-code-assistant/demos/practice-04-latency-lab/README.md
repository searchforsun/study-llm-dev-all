# Demo：延迟优化

对应章节：[延迟优化](../../index.html#ch-practice-04-latency)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `optimizer.py` | 缓存与路由优化 |
| `benchmark.py` | 性能基准测试 |
| `config.py` | 配置项 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-code-assistant/demos/practice-04-latency-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-code-assistant/demos/practice-04-latency-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：缓存策略实现
实现语义缓存（精确 + 相似度），测量缓存命中率与延迟改善。
```bash
python optimizer.py --cache semantic --cache-ttl 3600
```
**验收标准**：缓存命中率 >= 30%，命中时响应时间 < 200ms。

### 练习 2：小模型路由
为简单查询路由到轻量模型（如 Qwen2.5-7B），复杂查询使用全量模型。
```bash
python optimizer.py --router --light-model qwen2.5-7b
```
**验收标准**：70% 的简单查询由轻量模型处理，P99 延迟降低 50%。

### 练习 3：性能基准测试
使用 locust 或自建工具进行压测，记录不同并发下的 P99 延迟。
```bash
python benchmark.py --concurrency 10 50 100 --duration 60
```
**验收标准**：输出吞吐量 vs 延迟曲线，100 并发时 P99 < 3s。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[IDE 集成概念验证](../../index.html#ch-practice-05-ide-bridge) · Demo：[IDE 集成概念验证](../practice-05-ide-bridge-lab/)
