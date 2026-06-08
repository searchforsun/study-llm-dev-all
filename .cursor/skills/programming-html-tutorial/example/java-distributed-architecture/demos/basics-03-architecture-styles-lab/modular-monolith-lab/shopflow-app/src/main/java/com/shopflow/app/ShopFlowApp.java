package com.shopflow.app;

import com.shopflow.inventory.InMemoryInventoryFacade;
import com.shopflow.order.OrderApplicationService;
import com.shopflow.order.domain.Order;

/** 模块化单体启动器：单进程内组装各上下文。 */
public final class ShopFlowApp {

  private ShopFlowApp() {}

  public static void main(String[] args) {
    var inventory = new InMemoryInventoryFacade();
    var orders = new OrderApplicationService(inventory);
    boolean ok = orders.placeOrder(new Order("ord-demo", "sku-1", 2));
    System.out.printf("ShopFlow modular monolith demo: placeOrder=%s, remainingStock=%d%n", ok, inventory.stock());
  }
}
