package com.shopflow.lab.partialfailure;

/** 命令行演示：运行 {@code mvn -q exec:java} 查看三种部分失败场景。 */
public final class PartialFailureDemo {

  private PartialFailureDemo() {}

  public static void main(String[] args) {
    InventoryReserveService inventory = new InventoryReserveService();
    OrderReserveClient client = new OrderReserveClient(inventory);

    System.out.println("=== ShopFlow basics-01 · 部分失败模拟 ===");

    OrderReserveClient.ReserveResult lost = client.reserveWithLostResponse("key-1", "ord-001", 2);
    System.out.printf("1) 响应丢失: 调用方=%s, 服务端预留数=%d%n", lost.view(), inventory.reservationCount());

    OrderReserveClient.ReserveResult retry = client.retryAfterTimeout("key-1", "ord-001", 2);
    System.out.printf("   幂等重试: 调用方=%s, reservationId=%s, 服务端预留数=%d%n",
        retry.view(), retry.reservationId().orElse("N/A"), inventory.reservationCount());

    OrderReserveClient.ReserveResult ok = client.reserveOnce("key-2", "ord-002", 1);
    System.out.printf("2) 正常成功: 调用方=%s, reservationId=%s%n", ok.view(), ok.reservationId().orElse("N/A"));

    System.out.println("3) 练习：在笔记中补全「处理慢导致超时」的应对策略（查询状态 / 补偿）。");
  }
}
