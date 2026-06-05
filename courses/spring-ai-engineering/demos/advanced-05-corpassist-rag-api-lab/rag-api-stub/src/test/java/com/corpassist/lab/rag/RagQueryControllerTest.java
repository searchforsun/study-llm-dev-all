package com.corpassist.lab.rag;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class RagQueryControllerTest {

  @Autowired
  private MockMvc mvc;

  @Test
  void ragQuery_returnsSourcesAndAnswer() throws Exception {
    mvc.perform(post("/v1/rag/query")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"query\":\"年假如何申请？\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.sources[0].docId").value("pol-001"))
        .andExpect(jsonPath("$.answer").isNotEmpty())
        .andExpect(jsonPath("$.requestId").isNotEmpty());
  }
}
