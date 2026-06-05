// CorpAssist · 从 advanced-04-testing 章复制到本地 Spring Boot 测试模块后使用
// 依赖：spring-boot-starter-test、@MockBean ChatModel

/*
@SpringBootTest
@AutoConfigureMockMvc
class MockChatModelTest {

  @Autowired MockMvc mvc;
  @MockBean ChatModel chatModel;

  @Test
  void ragQuery_returnsCitation() throws Exception {
    // when(chatModel.call(any())).thenReturn(fixedResponseWithPol001());
    // mvc.perform(post("/v1/rag/query")...).andExpect(jsonPath("$.sources[0].id").value("pol-001"));
  }

  @Test
  void streamChat_emitsDoneEvent() { }

  @Test
  void guardrail_blocksInjectionPattern() { }
}
*/
