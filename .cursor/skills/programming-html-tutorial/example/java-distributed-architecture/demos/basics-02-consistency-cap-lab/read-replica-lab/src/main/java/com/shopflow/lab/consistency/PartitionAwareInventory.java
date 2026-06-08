package com.shopflow.lab.consistency;

/**
 * 分区模拟：CP 路径拒绝写入；AP 路径接受写入但可能短暂不一致。
 */
public class PartitionAwareInventory {

  private int stock;
  private boolean partitioned;

  public void simulatePartition(boolean on) {
    partitioned = on;
  }

  /** CP：分区时拒绝 reserve，保证不会不确定扣减。 */
  public boolean reserveCp(int quantity) {
    if (partitioned) {
      throw new UnavailableException("CP: reject write during partition");
    }
    if (stock < quantity) {
      return false;
    }
    stock -= quantity;
    return true;
  }

  /** AP：分区时仍接受（教学简化），可能后续对账。 */
  public boolean reserveAp(int quantity) {
    if (stock < quantity && !partitioned) {
      return false;
    }
    stock -= quantity;
    return true;
  }

  public int stock() {
    return stock;
  }

  public void setStock(int value) {
    stock = value;
  }

  public static class UnavailableException extends RuntimeException {
    public UnavailableException(String message) {
      super(message);
    }
  }
}
