package com.corpassist.saa.demo;

import com.corpassist.saa.config.CorpassistDemoProperties;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/demo")
public class DemoInfoController {

  private final CorpassistDemoProperties properties;
  private final Environment environment;

  public DemoInfoController(CorpassistDemoProperties properties, Environment environment) {
    this.properties = properties;
    this.environment = environment;
  }

  @GetMapping("/info")
  public Map<String, Object> info() {
    Map<String, Object> m = new LinkedHashMap<>();
    m.put("course", "spring-ai-alibaba-engineering");
    m.put("mode", properties.getMode());
    m.put("profiles", environment.getActiveProfiles());
    m.put("endpoints", Map.of(
        "chat", "POST /api/agent/chat",
        "stream", "POST /api/agent/chat/stream",
        "embed", "POST /api/rag/embed",
        "rerank", "POST /api/rag/rerank",
        "governance", "GET /api/governance/checklist",
        "adminDsl", "GET /api/admin/dsl/sample",
        "parse", "POST /api/extensions/parse",
        "dualstack", "GET /api/dualstack/config",
        "asyncTask", "POST /api/qps/tasks"));
    return m;
  }
}
