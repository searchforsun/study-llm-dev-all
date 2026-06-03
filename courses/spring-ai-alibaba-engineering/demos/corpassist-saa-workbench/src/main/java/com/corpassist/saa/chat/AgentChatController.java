package com.corpassist.saa.chat;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
@RequestMapping("/api/agent")
public class AgentChatController {

  private final AgentChatService chatService;
  private final org.springframework.ai.chat.client.ChatClient chatClient;
  private final ExecutorService streamExecutor = Executors.newCachedThreadPool();

  public AgentChatController(
      AgentChatService chatService, org.springframework.ai.chat.client.ChatClient chatClient) {
    this.chatService = chatService;
    this.chatClient = chatClient;
  }

  @PostMapping("/chat")
  public ChatDtos.ChatResponseBody chat(@RequestBody ChatDtos.ChatRequest request) {
    return chatService.chat(request.message());
  }

  @PostMapping(value = "/chat/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public SseEmitter stream(@RequestBody ChatDtos.ChatRequest request) {
    SseEmitter emitter = new SseEmitter(60_000L);
    streamExecutor.execute(
        () -> {
          try {
            chatClient
                .prompt()
                .user(request.message())
                .stream()
                .content()
                .doOnNext(
                    chunk -> {
                      try {
                        emitter.send(SseEmitter.event().data(chunk));
                      } catch (IOException e) {
                        emitter.completeWithError(e);
                      }
                    })
                .doOnComplete(emitter::complete)
                .doOnError(emitter::completeWithError)
                .blockLast();
          } catch (Exception ex) {
            emitter.completeWithError(ex);
          }
        });
    return emitter;
  }

  @GetMapping("/health")
  public Map<String, String> health() {
    return Map.of("status", "ok", "module", "corpassist-s3-agent");
  }
}
