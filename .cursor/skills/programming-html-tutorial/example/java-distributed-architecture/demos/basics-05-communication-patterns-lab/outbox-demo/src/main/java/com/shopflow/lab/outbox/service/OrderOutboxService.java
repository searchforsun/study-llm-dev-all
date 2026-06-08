package com.shopflow.lab.outbox.service;

import com.shopflow.lab.outbox.domain.OrderEntity;
import com.shopflow.lab.outbox.domain.OutboxEventEntity;
import com.shopflow.lab.outbox.repo.OrderRepository;
import com.shopflow.lab.outbox.repo.OutboxRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderOutboxService {

  private final OrderRepository orderRepository;
  private final OutboxRepository outboxRepository;

  public OrderOutboxService(OrderRepository orderRepository, OutboxRepository outboxRepository) {
    this.orderRepository = orderRepository;
    this.outboxRepository = outboxRepository;
  }

  /** 同步写 orders + outbox，保证本地事务一致。 */
  @Transactional
  public OrderEntity createOrder(String orderId, String skuId, int quantity) {
    OrderEntity order = orderRepository.save(new OrderEntity(orderId, skuId, quantity));
    outboxRepository.save(new OutboxEventEntity(
        orderId,
        "OrderCreated",
        "{\"orderId\":\"" + orderId + "\",\"skuId\":\"" + skuId + "\",\"quantity\":" + quantity + "}"));
    return order;
  }
}
