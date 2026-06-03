package com.corpassist.saa.obs;

import org.slf4j.MDC;

public final class TraceContext {

  public static final String TRACE_ID = "traceId";
  public static final String TENANT_ID = "tenantId";

  private TraceContext() {}

  public static String currentTraceId() {
    return MDC.get(TRACE_ID);
  }

  public static void set(String traceId, String tenantId) {
    MDC.put(TRACE_ID, traceId);
    if (tenantId != null) {
      MDC.put(TENANT_ID, tenantId);
    }
  }

  public static void clear() {
    MDC.remove(TRACE_ID);
    MDC.remove(TENANT_ID);
  }
}
