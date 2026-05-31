# Demo: vLLM 使用

关联章节: [vLLM 使用](../chapters/basics-03-vllm.html)

## 场景
启动 vLLM 验证 OpenAI 兼容 API。

## 文件
- `start-vllm.sh` — 启动脚本
- `curl-test.sh` — API 验证脚本

## 验证
```bash
bash start-vllm.sh
bash curl-test.sh
```
models 端点返回 200, stream SSE 有 data 行。
