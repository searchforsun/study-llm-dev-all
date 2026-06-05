package com.corpassist.lab.vectorstore;

import java.util.List;

/** Lab 向量库端口；生产环境对应 Spring AI {@code VectorStore} SPI。 */
public interface VectorStorePort {

  void add(List<DocumentRecord> documents);

  List<DocumentRecord> similaritySearch(SearchRequest request);
}
