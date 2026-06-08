package com.shopflow.lab.outbox;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.shopflow.lab.outbox.repo.OutboxRepository;
import com.shopflow.lab.outbox.service.OutboxPoller.InMemoryEventBus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class OutboxDemoIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private OutboxRepository outboxRepository;

  @Autowired
  private InMemoryEventBus eventBus;

  @BeforeEach
  void setUp() {
    eventBus.clear();
    outboxRepository.deleteAll();
  }

  @Test
  void createOrder_writesOutbox_andPollerPublishesEvent() throws Exception {
    mockMvc.perform(post("/orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content("""
                {"orderId":"ord-outbox-1","skuId":"sku-1","quantity":2}
                """))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.status").value("CREATED"));

    assertThat(outboxRepository.count()).isEqualTo(1);

    Thread.sleep(800);

    assertThat(eventBus.consumedEvents()).anyMatch(s -> s.startsWith("OrderCreated:"));
    assertThat(outboxRepository.findAll()).allMatch(e -> e.isPublished());
  }
}
