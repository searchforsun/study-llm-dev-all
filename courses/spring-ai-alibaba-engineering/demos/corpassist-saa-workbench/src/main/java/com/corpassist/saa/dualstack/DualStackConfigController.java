package com.corpassist.saa.dualstack;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dualstack")
public class DualStackConfigController {

  private final Environment environment;

  @Value("${spring.ai.dashscope.chat.options.model:qwen-plus}")
  private String javaModel;

  public DualStackConfigController(Environment environment) {
    this.environment = environment;
  }

  @GetMapping("/config")
  public Map<String, Object> config() {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("javaStack", "spring-ai-alibaba-starter-dashscope");
    body.put("javaModel", javaModel);
    body.put("javaApiKeyEnv", "AI_DASHSCOPE_API_KEY");
    body.put("pythonStack", "dashscope-sdk + FastAPI (see basics-04-vs-python-lab/scripts)");
    body.put("sharedEnv", Map.of(
        "CORPASSIST_AGENT_MODEL", System.getenv().getOrDefault("CORPASSIST_AGENT_MODEL", javaModel),
        "CORPASSIST_LLM_BASE_URL", System.getenv().getOrDefault("CORPASSIST_LLM_BASE_URL", "(optional gateway)")));
    body.put("demoMode", environment.getProperty("corpassist.demo.mode", "stub"));
    body.put("activeProfiles", environment.getActiveProfiles());
    return body;
  }
}
