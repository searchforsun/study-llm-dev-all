package com.shopflow.lab.consistency;

/** 读写分离库存：演示 replica 滞后与读主一致性。 */
public class MasterReplicaInventory {

  private int masterStock;
  private int replicaStock;
  private boolean replicaSynced = true;

  public void writeMaster(int stock) {
    masterStock = stock;
    replicaSynced = false;
  }

  /** 模拟异步复制完成。 */
  public void syncReplica() {
    replicaStock = masterStock;
    replicaSynced = true;
  }

  public int readMaster() {
    return masterStock;
  }

  public int readReplica() {
    return replicaStock;
  }

  public boolean isReplicaSynced() {
    return replicaSynced;
  }
}
