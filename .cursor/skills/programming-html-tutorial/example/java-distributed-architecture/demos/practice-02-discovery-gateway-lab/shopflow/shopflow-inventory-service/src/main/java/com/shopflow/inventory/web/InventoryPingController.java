package com.shopflow.inventory.web;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/inventory")
public class InventoryPingController {

  @GetMapping("/ping")
  public Map<String, String> ping() {
    return Map.of("service", "inventory-service", "status", "ok");
  }
}
