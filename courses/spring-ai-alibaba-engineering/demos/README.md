# Spring AI Alibaba 工程体系 · Demo 索引（13 章）

**统一可运行工程**：[`corpassist-saa-workbench/`](corpassist-saa-workbench/)

| 章节 | Lab | Workbench API |
|------|-----|---------------|
| basics-01-dashscope | `basics-01-dashscope-lab/` | `POST /api/agent/chat` |
| basics-02-starters | `basics-02-starters-lab/` | `GET /api/dualstack/config` |
| basics-03-extensions | `basics-03-extensions-lab/` | `POST /api/extensions/parse` |
| basics-04-vs-python | `basics-04-vs-python-lab/` | `dualstack_probe.py` |
| basics-05-embedding-rerank | `basics-05-embedding-rerank-lab/` | `POST /api/rag/embed`, `/rerank` |
| practice-01-admin | `practice-01-admin-lab/` | `GET /api/admin/dsl/sample` |
| practice-02-resilience | `practice-02-resilience-lab/` | `/actuator/circuitbreakers` |
| practice-03-obs | `practice-03-obs-lab/` | `X-Trace-Id` |
| practice-04-qps | `practice-04-qps-lab/` | `POST /api/qps/tasks` |
| practice-05-bailian-governance | `practice-05-bailian-governance-lab/` | `GET /api/governance/checklist` |
| advanced-01-interview | `advanced-01-interview-lab/` | 全 API 答辩演示 |
| advanced-02-langgraph-mapping | `advanced-02-langgraph-mapping-lab/` | `mapping-table.md` |
| advanced-03-s3-delivery | `advanced-03-s3-delivery-lab/` | `delivery-checklist.md` |

```bash
cd corpassist-saa-workbench
mvn test && mvn spring-boot:run
```
