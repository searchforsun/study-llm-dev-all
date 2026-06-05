package com.corpassist.lab.testing.web;

import com.corpassist.lab.testing.RagQueryService;
import com.corpassist.lab.testing.api.RagQueryRequest;
import com.corpassist.lab.testing.api.RagResponse;
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
  public RagResponse query(@RequestBody RagQueryRequest request) {
    return ragQueryService.query(request);
  }
}
