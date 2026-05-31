# Demo：灰度与双栈切换

[章节](../../index.html#ch-advanced-01-gray)

## 目标

实现 Feature Flag 灰度发布方案，写出回滚触发条件和自动化回滚脚本。

## 操作步骤

### 1. 实现 Feature Flag 系统

Spring BFF 中实现 FeatureFlagService（基于配置中心），支持按租户百分比灰度。

### 2. 回滚触发条件

| 指标 | 阈值 | 动作 |
|------|------|------|
| 错误率 | > 基线 + 1% | 自动回滚 |
| P95 延迟 | > 基线 + 50% | 自动告警 + 手动回滚 |
| 业务流程成功率 | < 99% | 自动回滚 |
| 用户投诉 | > 3 起/小时 | 手动回滚 |

### 3. 回滚脚本

```bash
#!/bin/bash
# 关闭 Feature Flag
curl -X PUT config.corpassist.com/config/feature-flags \
  -d '{"new-python-rag-pipeline": {"enabled": false}}'
# 调整路由权重
curl -X PUT gateway-admin/routes \
  -d '{"v1_weight": 100, "v2_weight": 0}'
# 验证
curl -f http://localhost:8080/actuator/health
```

## 验收标准

- [ ] Feature Flag 系统实现（Spring 配置中心）
- [ ] 列出至少 3 个回滚触发条件
- [ ] 编写了自动化回滚脚本
- [ ] 演示灰度→发现异常→回滚的完整过程

## 参考资料

- [Feature Flags (Martin Fowler)](https://martinfowler.com/articles/feature-flags.html)
- [Spring Cloud Gateway Weight](https://docs.spring.io/spring-cloud-gateway/reference/#gatewayfilter-factories)
