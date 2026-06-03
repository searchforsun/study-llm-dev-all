package com.corpassist.saa.admin;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminDslController {

  @GetMapping("/dsl/sample")
  public Map<String, Object> sampleDsl() throws IOException {
    String yaml =
        StreamUtils.copyToString(
            new ClassPathResource("admin/s3-office-agent.dsl.yaml").getInputStream(),
            StandardCharsets.UTF_8);
    return Map.of(
        "appId", "corpassist-s3-office",
        "version", "draft-1",
        "format", "yaml",
        "dsl", yaml,
        "note", "Studio 发布后将 DSL 同步到 Git，CI 做 diff 与 golden 回归");
  }
}
