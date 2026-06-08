package com.shopflow.lab.partialfailure;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

/**
 * 内存版 inventory-service：演示「调用方不确定是否成功」的三种典型情形。
 *
 * <p>对应 basics-01 练习 2：响应丢失、处理慢、重复提交。
 */
public class InventoryReserveService {

  private final Map<String, String> idempotencyIndex = new HashMap<>();
  private final Map<String, Integer> reservations = new HashMap<>();

  public Optional<String> reserve(String idempotencyKey, String orderId, int quantity) {
    if (idempotencyIndex.containsKey(idempotencyKey)) {
      return Optional.of(idempotencyIndex.get(idempotencyKey));
    }
    if (quantity <= 0) {
      throw new IllegalArgumentException("quantity must be positive");
    }
    String reservationId = "rsv-" + orderId;
    idempotencyIndex.put(idempotencyKey, reservationId);
    reservations.put(reservationId, quantity);
    return Optional.of(reservationId);
  }

  public boolean hasReservation(String reservationId) {
    return reservations.containsKey(reservationId);
  }

  public int reservationCount() {
    return reservations.size();
  }
}
