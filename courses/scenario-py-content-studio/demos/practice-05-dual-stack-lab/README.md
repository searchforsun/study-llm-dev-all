# Demo：双栈创作 API 联调

对应章节：[双栈创作 API 联调](../../index.html#ch-practice-05-dual-stack)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `app.py` | Python 生成服务 |
| `client.py` | Spring 端调用示例 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-content-studio/demos/practice-05-dual-stack-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-content-studio/demos/practice-05-dual-stack-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：Python 生成服务
实现 Python 侧内容生成服务，提供流式生成端点。
```bash
uvicorn app:app --reload --port 8000
```
**验收标准**：访问 `/generate` 端点返回流畅的流式 SSE 响应。

### 练习 2：Spring 编排调用
在 Spring 侧通过 WebClient 调用 Python 生成服务进行编排。
```bash
python client.py --spring-url http://localhost:8080 --prompt '写一篇通知'
```
**验收标准**：Spring 侧成功调用 Python 服务并返回整合后的结果。

### 练习 3：双栈流式贯通
实现从 Spring 入口到 Python 生成再到前端的完整流式链路。
**验收标准**：用户从浏览器看到逐字输出效果，端到端首字延迟 < 1s。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[生产坑：承诺、审核与记忆](../../index.html#ch-practice-06-production-pitfalls) · Demo：[生产坑：承诺、审核与记忆](../practice-06-production-pitfalls-lab/)
