package com.corpassist.saa.rag;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rag")
public class EmbeddingRerankController {

  @PostMapping("/embed")
  public Map<String, Object> embed(@RequestBody EmbedRequest request) {
    int dim = 1024;
    return Map.of(
        "model", "text-embedding-v3-stub",
        "dimensions", dim,
        "text", request.text(),
        "vectorPreview", List.of(0.12, -0.34, 0.56),
        "hint", "live 模式使用 DashScope Embedding API");
  }

  @PostMapping("/rerank")
  public Map<String, Object> rerank(@RequestBody RerankRequest request) {
    return Map.of(
        "model", "gte-rerank-stub",
        "query", request.query(),
        "results",
        request.documents().stream()
            .map(
                doc ->
                    Map.of(
                        "docId", doc.id(),
                        "score", doc.id().hashCode() % 100 / 100.0,
                        "snippet", doc.text().substring(0, Math.min(80, doc.text().length()))))
            .toList(),
        "hint", "生产使用 DashScope Rerank 对初筛 Top-K 重排");
  }

  public record EmbedRequest(String text, String tenantId) {}

  public record RerankRequest(String query, List<Doc> documents) {}

  public record Doc(String id, String text) {}
}
