package com.corpassist.lab.vectorstore;

import java.util.List;

/** 对应章节 {@code PolicySearchService}：filter 下推到 VectorStore，而非检索后内存过滤。 */
public class PolicySearchService {

  private final VectorStorePort vectorStore;

  public PolicySearchService(VectorStorePort vectorStore) {
    this.vectorStore = vectorStore;
  }

  public List<DocumentRecord> searchForDept(String question, String dept, int topK) {
    SearchRequest request = new SearchRequest(question, topK, dept);
    return vectorStore.similaritySearch(request);
  }

  public void ingestPolicy(DocumentRecord doc) {
    vectorStore.add(List.of(doc));
  }
}
