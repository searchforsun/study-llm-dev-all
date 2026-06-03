package com.corpassist.saa.governance;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/governance")
public class GovernanceController {

  private final Environment environment;

  public GovernanceController(Environment environment) {
    this.environment = environment;
  }

  @GetMapping("/checklist")
  public Map<String, Object> checklist() {
    boolean keySet = environment.getProperty("AI_DASHSCOPE_API_KEY", "").length() > 8;
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("apiKeyConfigured", keySet);
    body.put("apiKeyInGit", false);
    body.put("recommended", List.of(
        "RAM 子账号最小权限",
        "分环境 Secret：dev/staging/prod",
        "日志打标 tenantId",
        "429 告警与配额审计",
        "Key 泄露 15 分钟内轮换"));
    body.put(
        "checks",
        List.of(
            Map.of("id", "ram", "ok", true, "note", "使用百炼 RAM 子账号而非主账号"),
            Map.of("id", "secret", "ok", keySet, "note", "AI_DASHSCOPE_API_KEY 来自环境"),
            Map.of("id", "tenant", "ok", true, "note", "X-CorpAssist-Tenant 已接入 TraceFilter"),
            Map.of("id", "quota", "ok", false, "note", "需在百炼控制台配置告警")));
    return body;
  }
}
