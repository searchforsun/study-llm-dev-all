package com.corpassist.saa.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "corpassist.demo")
public class CorpassistDemoProperties {

  /** stub = 离线演示；live = 使用百炼 DashScope */
  private String mode = "stub";

  public String getMode() {
    return mode;
  }

  public void setMode(String mode) {
    this.mode = mode;
  }

  public boolean isStub() {
    return "stub".equalsIgnoreCase(mode);
  }
}
