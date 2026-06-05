package com.corpassist.lab.testing;

import com.corpassist.lab.testing.api.Citation;
import com.corpassist.lab.testing.api.RagQueryRequest;
import com.corpassist.lab.testing.api.RagResponse;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class RagQueryService {

  private final ChatModelPort chatModel;

  public RagQueryService(ChatModelPort chatModel) {
    this.chatModel = chatModel;
  }

  public RagResponse query(RagQueryRequest request) {
    String answer = chatModel.complete("context:pol-001\nquestion:" + request.query());
    return new RagResponse(answer, List.of(new Citation("pol-001", "年假制度片段")));
  }
}
