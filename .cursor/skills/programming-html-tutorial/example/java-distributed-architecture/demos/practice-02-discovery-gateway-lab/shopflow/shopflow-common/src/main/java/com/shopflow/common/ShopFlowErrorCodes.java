package com.shopflow.common;

/** ShopFlow 统一错误码（跨上下文前缀约定）。 */
public enum ShopFlowErrorCodes {
  ORDER_NOT_FOUND("SF-ORDER-404", "订单不存在"),
  INVENTORY_INSUFFICIENT("SF-INV-409", "库存不足"),
  IDEMPOTENT_REPLAY("SF-INV-200", "幂等重放，返回已有预留"),
  VALIDATION_FAILED("SF-COMMON-422", "参数校验失败");

  private final String code;
  private final String defaultMessage;

  ShopFlowErrorCodes(String code, String defaultMessage) {
    this.code = code;
    this.defaultMessage = defaultMessage;
  }

  public String code() {
    return code;
  }

  public String defaultMessage() {
    return defaultMessage;
  }
}
