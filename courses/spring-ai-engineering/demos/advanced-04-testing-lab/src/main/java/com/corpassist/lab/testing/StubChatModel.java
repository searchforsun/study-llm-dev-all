package com.corpassist.lab.testing;

import org.springframework.stereotype.Component;

@Component
public class StubChatModel implements ChatModelPort {

  @Override
  public String complete(String prompt) {
    return "依据制度，年假至少 5 天。";
  }
}
