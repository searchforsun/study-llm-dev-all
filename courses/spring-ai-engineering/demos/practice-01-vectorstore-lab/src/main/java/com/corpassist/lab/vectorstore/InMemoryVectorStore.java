package com.corpassist.lab.vectorstore;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * 内存向量库：用关键词重叠模拟 similaritySearch，聚焦 metadata filter 下推语义。
 * 生产环境换 {@code SimpleVectorStore} / {@code PgVectorStore}，检索 API 不变。
 */
public class InMemoryVectorStore implements VectorStorePort {

  private final List<DocumentRecord> store = new ArrayList<>();

  @Override
  public void add(List<DocumentRecord> documents) {
    store.addAll(documents);
  }

  @Override
  public List<DocumentRecord> similaritySearch(SearchRequest request) {
    return store.stream()
        .filter(doc -> request.deptFilter().equals(String.valueOf(doc.metadata().get("dept"))))
        .map(doc -> new Scored(doc, score(doc.text(), request.query())))
        .filter(scored -> scored.score > 0)
        .sorted(Comparator.comparingDouble(Scored::score).reversed())
        .limit(request.topK())
        .map(Scored::doc)
        .toList();
  }

  private static double score(String text, String query) {
    if (text.contains(query)) {
      return 10.0;
    }
    long overlap =
        query.chars().distinct().filter(ch -> text.indexOf(ch) >= 0).count();
    return overlap;
  }

  private record Scored(DocumentRecord doc, double score) {}
}
