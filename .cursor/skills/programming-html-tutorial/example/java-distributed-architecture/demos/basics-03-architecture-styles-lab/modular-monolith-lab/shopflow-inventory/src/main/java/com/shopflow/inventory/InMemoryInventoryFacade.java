package com.shopflow.inventory;

/** Inventory 内部实现（不暴露给 order.domain）。 */
public class InMemoryInventoryFacade implements InventoryFacade {

  private int stock = 100;

  @Override
  public boolean reserve(String skuId, int quantity) {
    if (quantity <= 0 || stock < quantity) {
      return false;
    }
    stock -= quantity;
    return true;
  }

  public int stock() {
    return stock;
  }
}
