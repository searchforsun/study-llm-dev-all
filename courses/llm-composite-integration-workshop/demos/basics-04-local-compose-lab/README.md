# Demo：docker-compose 联调环境

[章节](../../index.html#ch-basics-04-local-compose)

## 目标

编写 CorpAssist 本地开发栈的 docker-compose.yml，正确配置启动顺序依赖。

## 操作步骤

### 1. 编写 docker-compose.yml

包含以下 10 个服务：

| 服务名 | 镜像/构建 | 端口 | 依赖 |
|--------|-----------|------|------|
| redis | redis:7-alpine | 6379 | - |
| postgres | postgres:16-alpine | 5432 | - |
| etcd | quay.io/coreos/etcd | 2379 | - |
| minio | minio/minio | 9000 | - |
| milvus | milvusdb/milvus:2.4 | 19530 | etcd, minio |
| rabbitmq | rabbitmq:3-management | 5672 | - |
| python-rag | Dockerfile.rag | 8001 | milvus, redis |
| python-agent | Dockerfile.agent | 8002 | milvus, redis |
| spring-bff | Dockerfile.bff | 8081 | python-rag, redis |
| spring-gateway | Dockerfile.gateway | 8080 | spring-bff |

### 2. 配置启动顺序

```yaml
services:
  spring-bff:
    depends_on:
      python-rag: { condition: service_healthy }
      redis: { condition: service_healthy }
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8081/actuator/health"]
```

### 3. 验证启动

```bash
docker compose up -d
docker compose ps
curl localhost:8080/actuator/health
```

## 验收标准

- [ ] 编写包含 10 个服务的完整 docker-compose.yml
- [ ] 每个关键服务配置了 healthcheck
- [ ] 启动顺序依赖正确配置

## 参考资料

- [Docker Compose File](https://docs.docker.com/compose/compose-file/)
- [Milvus Docker Deploy](https://milvus.io/docs/install_standalone-docker.md)
