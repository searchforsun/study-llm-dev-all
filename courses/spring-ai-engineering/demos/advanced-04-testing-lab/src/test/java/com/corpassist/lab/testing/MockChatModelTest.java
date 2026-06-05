package com.corpassist.lab.testing;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class MockChatModelTest {

  @Autowired
  private MockMvc mvc;

  @MockBean
  private ChatModelPort chatModel;

  @Test
  void ragQuery_returnsCitation() throws Exception {
    when(chatModel.complete(anyString())).thenReturn("依据 [pol-001]，年假至少 5 天。");

    mvc.perform(post("/v1/rag/query")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"query\":\"年假制度\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.sources[0].id").value("pol-001"));
  }

  @Test
  void ragQuery_returnsAnswer() throws Exception {
    when(chatModel.complete(anyString())).thenReturn("固定测试答案");

    mvc.perform(post("/v1/rag/query")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"query\":\"测试\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.answer").value("固定测试答案"));
  }
}
