package com.shopflow.lab.consistency;

/** 命令行演示：{@code mvn -q exec:java} */
public final class ConsistencyCapDemo {

  private ConsistencyCapDemo() {}

  public static void main(String[] args) {
    System.out.println("=== ShopFlow basics-02 · 一致性与 CAP ===");

    MasterReplicaInventory inv = new MasterReplicaInventory();
    inv.writeMaster(0);
    System.out.printf("写主库 stock=0，读从库=%d（滞后，用户仍可能看到「有货」旧值 10 需在测试中设定）%n", inv.readReplica());

    inv.writeMaster(10);
    System.out.printf("写主库 stock=10，复制未完成时读从库=%d%n", inv.readReplica());
    inv.syncReplica();
    System.out.printf("复制完成后读从库=%d%n", inv.readReplica());

    PartitionAwareInventory cpAp = new PartitionAwareInventory();
    cpAp.setStock(5);
    cpAp.simulatePartition(true);
    try {
      cpAp.reserveCp(1);
    } catch (PartitionAwareInventory.UnavailableException ex) {
      System.out.println("CP 分区: " + ex.getMessage());
    }
    System.out.printf("AP 分区仍扣减后 stock=%d（需业务对账）%n", cpAp.reserveAp(1) ? cpAp.stock() : -1);
  }
}
