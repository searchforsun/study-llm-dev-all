package com.shopflow.order.domain;

/** Order 聚合（inventory 不得直接依赖此包）。 */
public record Order(String orderId, String skuId, int quantity) {}
