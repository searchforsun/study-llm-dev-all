package com.shopflow.lab.partialfailure;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PartialFailureLabTest {

  private InventoryReserveService inventory;
  private OrderReserveClient client;

  @BeforeEach
  void setUp() {
    inventory = new InventoryReserveService();
    client = new OrderReserveClient(inventory);
  }

  @Test
  void lostResponse_serverCommitted_clientRetriesIdempotently() {
    OrderReserveClient.ReserveResult lost = client.reserveWithLostResponse("idem-1", "ord-100", 3);
    assertEquals(ClientView.TIMEOUT, lost.view());
    assertTrue(lost.reservationId().isEmpty());
    assertEquals(1, inventory.reservationCount());

    OrderReserveClient.ReserveResult retry = client.retryAfterTimeout("idem-1", "ord-100", 3);
    assertEquals(ClientView.SUCCESS, retry.view());
    assertEquals("rsv-ord-100", retry.reservationId().orElseThrow());
    assertEquals(1, inventory.reservationCount());
  }

  @Test
  void duplicateSubmit_returnsSameReservationWithoutDoubleDeduct() {
    OrderReserveClient.ReserveResult first = client.reserveOnce("idem-2", "ord-200", 1);
    OrderReserveClient.ReserveResult second = client.reserveOnce("idem-2", "ord-200", 1);
    assertEquals(first.reservationId(), second.reservationId());
    assertEquals(1, inventory.reservationCount());
  }
}
