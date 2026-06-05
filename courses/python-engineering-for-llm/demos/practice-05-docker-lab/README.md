# Demo：容器化与本地 compose

对应章节：[容器化与本地 compose](../../index.html#ch-practice-05-docker)

## 目标

- 用 Dockerfile + docker-compose 启动 CorpAssist Python 服务骨架
- 验证 `/health` 探针与 non-root 运行约定

## 验收命令

```powershell
cd demos/practice-05-docker-lab
docker compose up --build -d
docker compose ps          # 等待 STATUS 为 healthy
```

另开终端（PowerShell）：

```powershell
Invoke-RestMethod http://localhost:8000/health
# 或 curl.exe -s http://localhost:8000/health
```

> build context 为课程根目录（`../..`），与正文 compose 示例一致；healthcheck 使用 Python `urllib`（slim 镜像无 curl）。

## 验收

- [ ] `docker compose up --build` 构建成功且容器 Running
- [ ] `curl /health` 返回 200 与 JSON 健康状态
- [ ] 完成章节测验
