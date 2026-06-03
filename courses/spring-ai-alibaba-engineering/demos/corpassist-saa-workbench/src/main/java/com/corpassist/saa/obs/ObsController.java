package com.corpassist.saa.obs;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/obs")
public class ObsController {

  @GetMapping("/trace-context")
  public Map<String, String> traceContext() {
    return Map.of(
        "traceId", TraceContext.currentTraceId() != null ? TraceContext.currentTraceId() : "",
        "hint", "调用任意 API 时检查响应头 X-Trace-Id 与日志中的 traceId");
  }
}
