package com.shopflow.lab.partialfailure;

import java.util.Optional;

/** order-service 侧客户端：封装超时、重试与幂等键。 */
public class OrderReserveClient {

  public record ReserveResult(ClientView view, Optional<String> reservationId) {}

  private final InventoryReserveService inventory;

  public OrderReserveClient(InventoryReserveService inventory) {
    this.inventory = inventory;
  }

  /** 正常成功路径。 */
  public ReserveResult reserveOnce(String idempotencyKey, String orderId, int quantity) {
    Optional<String> id = inventory.reserve(idempotencyKey, orderId, quantity);
    return new ReserveResult(ClientView.SUCCESS, id);
  }

  /**
   * 模拟「响应在网络中丢失」：服务端已成功，调用方看到 TIMEOUT。
   * 架构应对：带幂等键重试或查询预留状态。
   */
  public ReserveResult reserveWithLostResponse(String idempotencyKey, String orderId, int quantity) {
    inventory.reserve(idempotencyKey, orderId, quantity);
    return new ReserveResult(ClientView.TIMEOUT, Optional.empty());
  }

  /** 幂等重试：第二次应返回同一 reservationId，视图 SUCCESS。 */
  public ReserveResult retryAfterTimeout(String idempotencyKey, String orderId, int quantity) {
    Optional<String> id = inventory.reserve(idempotencyKey, orderId, quantity);
    return new ReserveResult(ClientView.SUCCESS, id);
  }
}
