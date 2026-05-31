# Demo：仓库问答 API 与代码引用

[章节](../../index.html#ch-practice-02-qa-api)

## 实验目标

1. 实现检索+生成管线
2. 构建标准引用格式
3. 实现 SSE 流式控制器

## 步骤一：运行 QA 服务

```python
qa = RepoQAService(vector_store, llm_client, embed_model)
result = await qa.answer("如何实现用户认证？", repo_id="payment-service")
print(result["answer"])
for c in result["citations"]:
    print(f"  → {c['file']}:{c['start_line']}")
```

## 步骤二：构建引用格式

生成带 IDE 跳转链接的引用：

```json
{
  "citations": [
    {
      "file": "AuthService.java",
      "start_line": 42,
      "end_line": 58,
      "snippet": "public User authenticate(...)",
      "symbol": "authenticate",
      "type": "method"
    }
  ]
}
```

## 步骤三：SSE 流式端点

```java
@PostMapping("/v1/qa/stream")
public SseEmitter streamAnswer(@RequestBody QARequest req) {
    // 返回 SseEmitter 事件流
}
```

## 验证标准

- 回答包含至少 1 个引用代码块
- 引用格式包含 file:startLine:endLine
- 流式输出首 token < 500ms
