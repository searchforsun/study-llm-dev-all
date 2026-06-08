package com.shopflow.lab.outbox.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class OrderEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String orderId;
  private String skuId;
  private int quantity;

  protected OrderEntity() {}

  public OrderEntity(String orderId, String skuId, int quantity) {
    this.orderId = orderId;
    this.skuId = skuId;
    this.quantity = quantity;
  }

  public Long getId() {
    return id;
  }

  public String getOrderId() {
    return orderId;
  }

  public String getSkuId() {
    return skuId;
  }

  public int getQuantity() {
    return quantity;
  }
}
