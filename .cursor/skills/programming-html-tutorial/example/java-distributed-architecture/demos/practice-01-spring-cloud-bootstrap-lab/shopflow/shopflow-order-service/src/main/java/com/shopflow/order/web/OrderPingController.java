package com.shopflow.order.web;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrderPingController {

  @GetMapping("/ping")
  public Map<String, String> ping() {
    return Map.of("service", "order-service", "status", "ok");
  }
}
