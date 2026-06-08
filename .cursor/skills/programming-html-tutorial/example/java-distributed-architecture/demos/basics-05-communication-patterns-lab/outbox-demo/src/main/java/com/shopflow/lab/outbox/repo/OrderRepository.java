package com.shopflow.lab.outbox.repo;

import com.shopflow.lab.outbox.domain.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {}
