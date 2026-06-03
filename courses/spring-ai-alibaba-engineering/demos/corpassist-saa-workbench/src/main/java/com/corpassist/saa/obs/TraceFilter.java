package com.corpassist.saa.obs;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class TraceFilter extends OncePerRequestFilter {

  @Value("${corpassist.s3.tenant-header:X-CorpAssist-Tenant}")
  private String tenantHeader;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String traceId = request.getHeader("traceparent");
    if (traceId == null || traceId.isBlank()) {
      traceId = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
    } else if (traceId.length() > 32) {
      traceId = traceId.substring(0, 32);
    }
    String tenant = request.getHeader(tenantHeader);
    TraceContext.set(traceId, tenant);
    response.setHeader("X-Trace-Id", traceId);
    try {
      filterChain.doFilter(request, response);
    } finally {
      TraceContext.clear();
    }
  }
}
