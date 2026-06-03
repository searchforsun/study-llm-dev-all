package com.corpassist.saa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {"corpassist.demo.mode=stub", "spring.profiles.active=stub"})
@AutoConfigureMockMvc
class AgentChatControllerTest {

  @Autowired MockMvc mockMvc;

  @Test
  void chatReturnsStubReply() throws Exception {
    mockMvc
        .perform(
            post("/api/agent/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"message\":\"查询年假政策\"}")
                .header("X-CorpAssist-Tenant", "tenant-demo"))
        .andExpect(status().isOk())
        .andExpect(header().string("X-Trace-Id", notNullValue()))
        .andExpect(jsonPath("$.reply").value(containsString("[stub]")))
        .andExpect(jsonPath("$.mode").value("stub"));
  }

  @Test
  void demoInfoListsEndpoints() throws Exception {
    mockMvc
        .perform(get("/api/demo/info"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.mode").value("stub"));
  }

  @Test
  void adminDslSample() throws Exception {
    mockMvc
        .perform(get("/api/admin/dsl/sample"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.dsl").value(containsString("corpassist-s3-office")));
  }

  @Test
  void documentParseChunks() throws Exception {
    mockMvc
        .perform(
            post("/api/extensions/parse")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"filename\":\"leave.pdf\",\"content\":\"员工年假不少于10天\",\"tenantId\":\"t1\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.chunks[0].text").value(containsString("chunk-0")));
  }

  @Test
  void embedAndRerank() throws Exception {
    mockMvc
        .perform(
            post("/api/rag/embed")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"text\":\"年假制度\",\"tenantId\":\"t1\"}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.model").value("text-embedding-v3-stub"));
    mockMvc
        .perform(
            post("/api/rag/rerank")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    "{\"query\":\"年假\",\"documents\":[{\"id\":\"d1\",\"text\":\"员工年假不少于10天\"},{\"id\":\"d2\",\"text\":\"报销流程\"}]}"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.results").isArray());
  }

  @Test
  void governanceChecklist() throws Exception {
    mockMvc
        .perform(get("/api/governance/checklist"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.recommended").isArray());
  }

  @Test
  void asyncTaskAccepted() throws Exception {
    mockMvc
        .perform(
            post("/api/qps/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"prompt\":\"生成月度报销摘要\"}"))
        .andExpect(status().isAccepted())
        .andExpect(jsonPath("$.taskId").exists());
  }
}
