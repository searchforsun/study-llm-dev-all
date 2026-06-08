package com.shopflow.lab.consistency;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class ConsistencyCapLabTest {

  @Test
  void readReplica_lagsBehindMaster_afterWrite() {
    MasterReplicaInventory inv = new MasterReplicaInventory();
    inv.writeMaster(10);
    assertEquals(10, inv.readMaster());
    assertEquals(0, inv.readReplica());
    assertTrue(!inv.isReplicaSynced());
  }

  @Test
  void readMaster_afterWrite_isConsistent() {
    MasterReplicaInventory inv = new MasterReplicaInventory();
    inv.writeMaster(10);
    assertEquals(10, inv.readMaster());
    inv.syncReplica();
    assertEquals(10, inv.readReplica());
  }

  @Test
  void cpPath_rejectsWriteDuringPartition() {
    PartitionAwareInventory inv = new PartitionAwareInventory();
    inv.setStock(10);
    inv.simulatePartition(true);
    assertThrows(
        PartitionAwareInventory.UnavailableException.class,
        () -> inv.reserveCp(1));
  }

  @Test
  void apPath_acceptsWriteDuringPartition() {
    PartitionAwareInventory inv = new PartitionAwareInventory();
    inv.setStock(10);
    inv.simulatePartition(true);
    assertTrue(inv.reserveAp(3));
    assertEquals(7, inv.stock());
  }
}
