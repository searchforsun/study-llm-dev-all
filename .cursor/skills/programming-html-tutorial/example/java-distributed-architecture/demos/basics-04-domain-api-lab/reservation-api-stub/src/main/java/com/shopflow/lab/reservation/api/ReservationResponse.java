package com.shopflow.lab.reservation.api;

public record ReservationResponse(
    String reservationId, String orderId, String skuId, int quantity, String status) {}
