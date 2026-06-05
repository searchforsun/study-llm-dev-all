package com.corpassist.lab.vectorstore;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

public final class SampleDocumentLoader {

  private static final ObjectMapper MAPPER = new ObjectMapper();

  private SampleDocumentLoader() {}

  public static List<DocumentRecord> loadFromClasspath() throws IOException {
    try (InputStream in =
        SampleDocumentLoader.class.getResourceAsStream("/sample-documents.json")) {
      if (in == null) {
        throw new IOException("classpath:/sample-documents.json not found");
      }
      List<Map<String, Object>> raw =
          MAPPER.readValue(in, new TypeReference<>() {});
      return raw.stream()
          .map(
              row ->
                  new DocumentRecord(
                      String.valueOf(row.get("id")),
                      String.valueOf(row.get("text")),
                      castMetadata(row.get("metadata"))))
          .toList();
    }
  }

  @SuppressWarnings("unchecked")
  private static Map<String, Object> castMetadata(Object metadata) {
    return (Map<String, Object>) metadata;
  }
}
