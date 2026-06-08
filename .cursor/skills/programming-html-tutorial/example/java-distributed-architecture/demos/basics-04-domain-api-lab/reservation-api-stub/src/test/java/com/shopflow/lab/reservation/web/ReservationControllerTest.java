package com.shopflow.lab.reservation.web;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class ReservationControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void createReservation_returns201() throws Exception {
    mockMvc.perform(post("/api/v1/reservations")
            .header("Idempotency-Key", "idem-201")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"orderId":"ord-1","skuId":"sku-laptop-15","quantity":1}
                """))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.status").value("RESERVED"));
  }

  @Test
  void duplicateIdempotencyKey_returnsSameReservation() throws Exception {
    String body = """
        {"orderId":"ord-2","skuId":"sku-laptop-15","quantity":1}
        """;
    mockMvc.perform(post("/api/v1/reservations")
            .header("Idempotency-Key", "idem-dup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(body))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.reservationId").value("rsv-ord-2"));

    mockMvc.perform(post("/api/v1/reservations")
            .header("Idempotency-Key", "idem-dup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(body))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.reservationId").value("rsv-ord-2"));
  }

  @Test
  void insufficientStock_returns409() throws Exception {
    mockMvc.perform(post("/api/v1/reservations")
            .header("Idempotency-Key", "idem-409")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"orderId":"ord-3","skuId":"sku-laptop-15","quantity":999}
                """))
        .andExpect(status().isConflict())
        .andExpect(jsonPath("$.code").value("SF-INV-409"));
  }

  @Test
  void invalidBody_returns422() throws Exception {
    mockMvc.perform(post("/api/v1/reservations")
            .header("Idempotency-Key", "idem-422")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"orderId":"","skuId":"sku-laptop-15","quantity":0}
                """))
        .andExpect(status().isUnprocessableEntity())
        .andExpect(jsonPath("$.code").value("SF-COMMON-422"));
  }
}
