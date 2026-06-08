package com.shopflow.inventory;

/** 对外门面：order 模块允许依赖此接口，禁止依赖 inventory 内部 entity。 */
public interface InventoryFacade {
  boolean reserve(String skuId, int quantity);
}
