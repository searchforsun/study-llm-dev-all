package com.shopflow.lab.outbox.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "outbox")
public class OutboxEventEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String aggregateId;
  private String eventType;
  private String payload;
  private Instant createdAt;
  private boolean published;

  protected OutboxEventEntity() {}

  public OutboxEventEntity(String aggregateId, String eventType, String payload) {
    this.aggregateId = aggregateId;
    this.eventType = eventType;
    this.payload = payload;
    this.createdAt = Instant.now();
    this.published = false;
  }

  public Long getId() {
    return id;
  }

  public String getAggregateId() {
    return aggregateId;
  }

  public String getEventType() {
    return eventType;
  }

  public String getPayload() {
    return payload;
  }

  public boolean isPublished() {
    return published;
  }

  public void markPublished() {
    published = true;
  }
}
