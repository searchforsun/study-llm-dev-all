package com.shopflow.lab.outbox.service;

import com.shopflow.lab.outbox.domain.OutboxEventEntity;
import com.shopflow.lab.outbox.repo.OutboxRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/** 模拟 Kafka 投递器：轮询 outbox 并「发布」到内存总线。 */
@Component
public class OutboxPoller {

  private final OutboxRepository outboxRepository;
  private final InMemoryEventBus eventBus;

  public OutboxPoller(OutboxRepository outboxRepository, InMemoryEventBus eventBus) {
    this.outboxRepository = outboxRepository;
    this.eventBus = eventBus;
  }

  @Scheduled(fixedDelay = 500)
  @Transactional
  public void pollAndPublish() {
    List<OutboxEventEntity> pending = outboxRepository.findTop10ByPublishedFalseOrderByIdAsc();
    for (OutboxEventEntity event : pending) {
      eventBus.publish(event.getEventType(), event.getPayload());
      event.markPublished();
    }
  }

  /** 内存事件总线（代替 Kafka，便于本地演示）。 */
  @Component
  public static class InMemoryEventBus {

    private final List<String> consumed = new CopyOnWriteArrayList<>();

    public void publish(String type, String payload) {
      consumed.add(type + ":" + payload);
    }

    public List<String> consumedEvents() {
      return new ArrayList<>(consumed);
    }

    public void clear() {
      consumed.clear();
    }
  }
}
