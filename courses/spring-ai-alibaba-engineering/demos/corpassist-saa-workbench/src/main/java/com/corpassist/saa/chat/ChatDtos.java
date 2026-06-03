package com.corpassist.saa.chat;

public final class ChatDtos {

  private ChatDtos() {}

  public record ChatRequest(String message) {}

  public record ChatResponseBody(String reply, String mode, String model, String traceId) {}
}
