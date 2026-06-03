package com.corpassist.saa.extensions;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/extensions")
public class DocumentParseController {

  /**
   * 模拟 spring-ai-alibaba-extensions 文档解析输出（无需真实 Tika/百炼文档 API）。
   */
  @PostMapping("/parse")
  public Map<String, Object> parse(@RequestBody ParseRequest request) {
    String preview =
        request.content() == null
            ? ""
            : request.content().length() > 200
                ? request.content().substring(0, 200) + "…"
                : request.content();
    return Map.of(
        "source", request.filename(),
        "mime", request.mimeType() != null ? request.mimeType() : "text/plain",
        "chunks",
        List.of(
            Map.of("index", 0, "text", "【chunk-0】" + preview),
            Map.of("index", 1, "text", "【chunk-1】制度库索引元数据: tenant=" + request.tenantId())),
        "parser", "stub-tika-compatible",
        "hint", "生产环境替换为 extensions 文档解析 Starter");
  }

  public record ParseRequest(String filename, String mimeType, String content, String tenantId) {}
}
