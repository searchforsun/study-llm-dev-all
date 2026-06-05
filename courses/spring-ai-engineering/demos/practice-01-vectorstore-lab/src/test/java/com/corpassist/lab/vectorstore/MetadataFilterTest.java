package com.corpassist.lab.vectorstore;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MetadataFilterTest {

  private PolicySearchService searchService;

  @BeforeEach
  void setUp() throws Exception {
    VectorStorePort vectorStore = new InMemoryVectorStore();
    searchService = new PolicySearchService(vectorStore);
    vectorStore.add(SampleDocumentLoader.loadFromClasspath());
  }

  @Test
  void hrFilter_annualLeave_returnsPol001() {
    var results = searchService.searchForDept("年假", "HR", 1);

    assertEquals(1, results.size());
    assertEquals("pol-001", results.getFirst().id());
  }

  @Test
  void finFilter_annualLeave_excludesHrPolicy() {
    var results = searchService.searchForDept("年假", "FIN", 1);

    assertTrue(results.stream().noneMatch(doc -> "pol-001".equals(doc.id())));
  }
}
