package com.shopflow.inventory.api;

/** 预留库存请求 DTO。 */
public record ReserveInventoryRequest(String orderId, String skuId, int quantity) {}
