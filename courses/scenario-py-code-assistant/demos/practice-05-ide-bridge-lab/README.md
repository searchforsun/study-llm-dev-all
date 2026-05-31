# Demo：IDE 集成概念验证

对应章节：[IDE 集成概念验证](../../index.html#ch-practice-05-ide-bridge)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `bridge.py` | IDE 桥接服务 |
| `proxy.py` | 本地/云端代理 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-code-assistant/demos/practice-05-ide-bridge-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-code-assistant/demos/practice-05-ide-bridge-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：本地/云端代理
实现代理服务，支持在本地小模型和云端大模型之间路由。
```bash
python proxy.py --mode hybrid
```
**验收标准**：简单补全由本地模型处理（< 500ms），复杂问答路由到云端。

### 练习 2：插件通信协议
定义 IDE 插件与后端间的 JSON-RPC 通信协议。
```bash
python bridge.py --listen 127.0.0.1:8765
```
**验收标准**：协议涵盖 textDocument/completion、textDocument/hover、textDocument/codeAction。

### 练习 3：隐私过滤
实现代码脱敏模块，在发送到云端前移除敏感信息。
**验收标准**：API Key、密码、内网 IP 等敏感信息被正确定位并替换为占位符。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生产坑：上下文、FIM 与工具环](../../index.html#ch-practice-06-production-pitfalls) · Demo：[生产坑：上下文、FIM 与工具环](../practice-06-production-pitfalls-lab/)
