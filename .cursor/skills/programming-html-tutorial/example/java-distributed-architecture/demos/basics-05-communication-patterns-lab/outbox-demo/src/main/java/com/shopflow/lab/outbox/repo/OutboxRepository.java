package com.shopflow.lab.outbox.repo;

import com.shopflow.lab.outbox.domain.OutboxEventEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutboxRepository extends JpaRepository<OutboxEventEntity, Long> {

  List<OutboxEventEntity> findTop10ByPublishedFalseOrderByIdAsc();
}
