package com.corpassist.lab.rag;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RagParityTest {

    @Autowired
    private TestRestTemplate rest;

    @Test
    void sameQuestionReturnsSourcesWithDocId() {
        ResponseEntity<Map> resp = rest.postForEntity(
            "/v1/rag/ask",
            Map.of("question", "年假几天", "tenantId", "corp-a"),
            Map.class
        );
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().get("answer")).isNotNull();

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> sources = (List<Map<String, Object>>) resp.getBody().get("sources");
        assertThat(sources).isNotEmpty();
        assertThat(sources.get(0).get("doc_id")).isEqualTo("hr-policy-2024");
    }

    @Test
    void matchesPythonStubDocId() {
        SpringRagDemo.AskResponse spring = SpringRagDemo.ask(
            new SpringRagDemo.AskRequest("年假", "corp-a")
        );
        assertThat(spring.sources().get(0).docId()).isEqualTo("hr-policy-2024");
    }
}
