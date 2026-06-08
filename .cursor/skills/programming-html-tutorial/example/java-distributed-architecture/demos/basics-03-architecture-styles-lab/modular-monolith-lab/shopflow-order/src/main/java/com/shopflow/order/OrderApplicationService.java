package com.shopflow.order;

import com.shopflow.inventory.InventoryFacade;
import com.shopflow.order.domain.Order;

/** Order 模块编排：仅通过 inventory 门面协作。 */
public class OrderApplicationService {

  private final InventoryFacade inventoryFacade;

  public OrderApplicationService(InventoryFacade inventoryFacade) {
    this.inventoryFacade = inventoryFacade;
  }

  public boolean placeOrder(Order order) {
    return inventoryFacade.reserve(order.skuId(), order.quantity());
  }
}
