package com.corpassist.saa;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {"corpassist.demo.mode=stub", "spring.profiles.active=stub"})
@AutoConfigureMockMvc
class DualStackConfigControllerTest {

  @Autowired MockMvc mockMvc;

  @Test
  void dualStackConfig() throws Exception {
    mockMvc
        .perform(get("/api/dualstack/config"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.javaStack").value("spring-ai-alibaba-starter-dashscope"))
        .andExpect(jsonPath("$.demoMode").value("stub"));
  }
}
