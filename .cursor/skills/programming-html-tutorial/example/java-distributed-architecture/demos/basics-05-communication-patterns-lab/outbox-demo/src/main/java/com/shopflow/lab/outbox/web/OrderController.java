package com.shopflow.lab.outbox.web;

import com.shopflow.lab.outbox.domain.OrderEntity;
import com.shopflow.lab.outbox.service.OrderOutboxService;
import com.shopflow.lab.outbox.service.OutboxPoller.InMemoryEventBus;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderController {

  private final OrderOutboxService orderOutboxService;
  private final InMemoryEventBus eventBus;

  public OrderController(OrderOutboxService orderOutboxService, InMemoryEventBus eventBus) {
    this.orderOutboxService = orderOutboxService;
    this.eventBus = eventBus;
  }

  @PostMapping
  public Map<String, Object> create(@RequestBody CreateOrderBody body) {
    OrderEntity saved = orderOutboxService.createOrder(body.orderId(), body.skuId(), body.quantity());
    return Map.of("orderId", saved.getOrderId(), "status", "CREATED");
  }

  @GetMapping("/events")
  public Map<String, Object> events() {
    return Map.of("consumed", eventBus.consumedEvents());
  }

  public record CreateOrderBody(String orderId, String skuId, int quantity) {}
}
