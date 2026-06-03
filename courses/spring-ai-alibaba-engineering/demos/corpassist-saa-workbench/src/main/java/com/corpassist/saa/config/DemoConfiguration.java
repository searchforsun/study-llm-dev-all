package com.corpassist.saa.config;

import com.corpassist.saa.chat.StubChatModel;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
@EnableConfigurationProperties(CorpassistDemoProperties.class)
public class DemoConfiguration {

  @Bean
  @ConditionalOnProperty(name = "corpassist.demo.mode", havingValue = "stub", matchIfMissing = true)
  @Primary
  ChatModel stubChatModel() {
    return new StubChatModel();
  }

  @Bean
  ChatClient chatClient(ChatModel chatModel) {
    return ChatClient.builder(chatModel).build();
  }
}
