package com.corpassist.saa.chat;

import com.corpassist.saa.config.CorpassistDemoProperties;
import com.corpassist.saa.obs.TraceContext;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AgentChatService {

  private final ChatClient chatClient;
  private final CorpassistDemoProperties demoProperties;

  @Value("${spring.ai.dashscope.chat.options.model:qwen-plus}")
  private String modelName;

  public AgentChatService(ChatClient chatClient, CorpassistDemoProperties demoProperties) {
    this.chatClient = chatClient;
    this.demoProperties = demoProperties;
  }

  @CircuitBreaker(name = "dashscopeChat", fallbackMethod = "fallbackReply")
  public ChatDtos.ChatResponseBody chat(String message) {
    String reply =
        chatClient.prompt().user(message).call().content();
    return new ChatDtos.ChatResponseBody(
        reply, demoProperties.getMode(), modelName, TraceContext.currentTraceId());
  }

  @SuppressWarnings("unused")
  private ChatDtos.ChatResponseBody fallbackReply(String message, Throwable ex) {
    return new ChatDtos.ChatResponseBody(
        "[fallback] 模型暂不可用，请稍后重试。原因: " + ex.getClass().getSimpleName(),
        demoProperties.getMode(),
        modelName,
        TraceContext.currentTraceId());
  }
}
