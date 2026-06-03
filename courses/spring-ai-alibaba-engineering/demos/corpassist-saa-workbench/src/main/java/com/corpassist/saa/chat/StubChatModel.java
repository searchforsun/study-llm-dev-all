package com.corpassist.saa.chat;

import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.MessageType;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import reactor.core.publisher.Flux;

import java.util.ArrayList;
import java.util.List;

/**
 * 无 API Key 时可运行的离线 ChatModel，用于课程 Demo 与 CI 测试。
 */
public class StubChatModel implements ChatModel {

  @Override
  public ChatResponse call(Prompt prompt) {
    String userText = extractUserText(prompt);
    String reply =
        "[stub] CorpAssist S3 演示：已处理「"
            + truncate(userText, 80)
            + "」。导出 AI_DASHSCOPE_API_KEY 并设置 CORPASSIST_DEMO_MODE=live 可切换百炼真模型。";
    return new ChatResponse(List.of(new Generation(new AssistantMessage(reply))));
  }

  @Override
  public Flux<ChatResponse> stream(Prompt prompt) {
    String full = call(prompt).getResult().getOutput().getText();
    List<ChatResponse> chunks = new ArrayList<>();
    int step = Math.max(6, full.length() / 5);
    for (int i = 0; i < full.length(); i += step) {
      String part = full.substring(i, Math.min(i + step, full.length()));
      chunks.add(new ChatResponse(List.of(new Generation(new AssistantMessage(part)))));
    }
    return Flux.fromIterable(chunks);
  }

  private static String extractUserText(Prompt prompt) {
    return prompt.getInstructions().stream()
        .filter(m -> m.getMessageType() == MessageType.USER)
        .map(Message::getText)
        .findFirst()
        .orElse("(empty)");
  }

  private static String truncate(String s, int max) {
    if (s == null) {
      return "";
    }
    return s.length() <= max ? s : s.substring(0, max) + "…";
  }
}
