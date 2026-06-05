package com.corpassist.lab.rag.web;

import com.corpassist.lab.rag.RagQueryService;
import com.corpassist.lab.rag.api.RagQueryRequest;
import com.corpassist.lab.rag.api.RagQueryResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/rag")
public class RagQueryController {

  private final RagQueryService ragQueryService;

  public RagQueryController(RagQueryService ragQueryService) {
    this.ragQueryService = ragQueryService;
  }

  @PostMapping("/query")
  public RagQueryResponse query(@RequestBody RagQueryRequest request) {
    return ragQueryService.query(request);
  }
}
