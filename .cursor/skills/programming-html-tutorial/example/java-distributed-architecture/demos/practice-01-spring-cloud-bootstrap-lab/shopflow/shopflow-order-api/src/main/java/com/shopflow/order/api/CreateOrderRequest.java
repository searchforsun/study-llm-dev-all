package com.shopflow.order.api;

/** 创建订单请求 DTO（api 模块，无 Spring 运行时依赖）。 */
public record CreateOrderRequest(String skuId, int quantity) {}
