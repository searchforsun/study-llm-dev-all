# Demo: 容器化 LLM 服务

关联章节: [容器化 LLM 服务](../chapters/basics-02-docker.html)

## 场景
用 Docker Compose 启动带 GPU 调度的 vLLM。

## 文件
- `compose-gpu.yaml` — GPU Compose 配置模板

## 验证
```bash
docker compose -f compose-gpu.yaml up -d
docker compose exec vllm nvidia-smi
curl localhost:8000/v1/models
```
