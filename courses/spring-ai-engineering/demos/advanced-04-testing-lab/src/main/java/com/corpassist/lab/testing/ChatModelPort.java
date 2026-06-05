package com.corpassist.lab.testing;

/**
 * Lab 简化接口；生产环境对应 Spring AI {@code org.springframework.ai.chat.model.ChatModel}。
 */
public interface ChatModelPort {

  String complete(String prompt);
}
