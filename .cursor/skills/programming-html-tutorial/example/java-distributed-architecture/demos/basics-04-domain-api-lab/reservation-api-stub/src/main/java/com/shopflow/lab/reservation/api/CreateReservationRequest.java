package com.shopflow.lab.reservation.api;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record CreateReservationRequest(
    @NotBlank String orderId,
    @NotBlank String skuId,
    @Min(1) int quantity) {}
