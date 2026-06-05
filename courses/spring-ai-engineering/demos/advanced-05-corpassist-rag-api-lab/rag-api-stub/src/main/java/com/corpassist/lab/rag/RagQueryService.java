package com.corpassist.lab.rag;

import com.corpassist.lab.rag.api.RagQueryRequest;
import com.corpassist.lab.rag.api.RagQueryResponse;
import com.corpassist.lab.rag.api.Source;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;

@Service
public class RagQueryService {

  public RagQueryResponse query(RagQueryRequest request) {
    String requestId = "req-" + UUID.randomUUID().toString().substring(0, 8);
    return new RagQueryResponse(
        "依据 [pol-001]，年假至少 5 天...",
        List.of(new Source("pol-001", "年假制度：正式员工每年至少 5 天带薪年假。")),
        requestId);
  }
}
