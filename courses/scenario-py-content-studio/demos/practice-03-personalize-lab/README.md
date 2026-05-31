# Demo：千人千面个性化

对应章节：[千人千面个性化](../../index.html#ch-practice-03-personalize)

## 前置

- Python 3.10+
- `pip install uv`（推荐）或 pip
- OpenAI API Key 或 DashScope API Key（通义千问）
- Docker Desktop（可选，用于 Milvus/Qdrant 等基础设施）

## 文件

| 文件 | 说明 |
|------|------|
| `personalize.py` | 个性化生成引擎 |
| `profiler.py` | 用户画像管理 |
| `app.py` | FastAPI 服务 |
| `requirements.txt` | Python 依赖 |

## 快速开始

### Windows PowerShell
```powershell
cd courses/scenario-py-content-studio/demos/practice-03-personalize-lab
uv venv
uv pip install -r requirements.txt
copy .env.example .env
notepad .env
```

### macOS / Linux
```bash
cd courses/scenario-py-content-studio/demos/practice-03-personalize-lab
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt
cp .env.example .env
vim .env
```

## 练习

### 练习 1：用户画像管理
实现用户画像 CRUD API，存储行业、偏好、历史风格等信息。
```bash
uvicorn app:app --reload --port 8000
```
**验收标准**：API 支持创建、读取、更新用户画像，数据持久化到 Redis/PostgreSQL。

### 练习 2：动态 Prompt 拼装
根据用户画像动态组装 System Prompt，实现千人千面。
```bash
python personalize.py --user-id user_001 --prompt '写一封商务邮件'
```
**验收标准**：不同画像的用户生成内容在语气、长度、术语上呈现明显差异。

### 练习 3：A/B 测试对比
设置 A/B 实验组，对比个性化与非个性化生成的效果指标。
**验收标准**：个性化组的点击率/通过率相比对照组提升 >= 10%。

## 验收

- [ ] 项目依赖安装成功，虚拟环境激活正常
- [ ] 所有指定场景的 Demo 可运行并输出预期结果
- [ ] 单元测试全部通过
- [ ] 完成对应章节测验

## 下一章

[内容质量评估](../../index.html#ch-practice-04-eval) · Demo：[内容质量评估](../practice-04-eval-lab/)
