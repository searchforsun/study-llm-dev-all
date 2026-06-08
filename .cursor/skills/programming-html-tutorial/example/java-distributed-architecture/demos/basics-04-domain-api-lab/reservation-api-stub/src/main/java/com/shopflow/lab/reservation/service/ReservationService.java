package com.shopflow.lab.reservation.service;

import com.shopflow.lab.reservation.api.CreateReservationRequest;
import com.shopflow.lab.reservation.api.ReservationResponse;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {

  private final Map<String, String> idempotencyIndex = new ConcurrentHashMap<>();
  private final Map<String, ReservationResponse> reservations = new ConcurrentHashMap<>();
  private final Map<String, Integer> stock = new ConcurrentHashMap<>();

  public ReservationService() {
    stock.put("sku-laptop-15", 5);
  }

  public ReservationResponse create(String idempotencyKey, CreateReservationRequest request) {
    if (idempotencyIndex.containsKey(idempotencyKey)) {
      return reservations.get(idempotencyIndex.get(idempotencyKey));
    }
    int available = stock.getOrDefault(request.skuId(), 0);
    if (available < request.quantity()) {
      throw new InsufficientStockException("SF-INV-409", "库存不足");
    }
    stock.put(request.skuId(), available - request.quantity());
    ReservationResponse response = new ReservationResponse(
        "rsv-" + request.orderId(),
        request.orderId(),
        request.skuId(),
        request.quantity(),
        "RESERVED");
    idempotencyIndex.put(idempotencyKey, response.reservationId());
    reservations.put(response.reservationId(), response);
    return response;
  }

  public static class InsufficientStockException extends RuntimeException {
    private final String code;

    public InsufficientStockException(String code, String message) {
      super(message);
      this.code = code;
    }

    public String code() {
      return code;
    }
  }
}
