# Demo：安全规则引擎与质量检测

[章节](../../index.html#ch-basics-04-quality)

## 实验目标

1. 实现 SQL 注入和硬编码密钥检测规则
2. 运行 RuleEngine 分析代码
3. 理解质量门禁配置

## 步骤一：运行规则引擎

```python
engine = RuleEngine()
code = """
public User login(String name, String pwd) {
    String sql = "SELECT * FROM users WHERE name='"
               + name + "' AND pwd='" + pwd + "'";
    String secret = "sk-abc123def456";
    return query(sql);
}
"""
for f in engine.analyze(code):
    print(f"[{f['severity']}] L{f['line']}: {f['message']}")
```

## 步骤二：配置质量门禁

编写门禁阈值配置：

```yaml
quality_gates:
  static_analysis: { critical: 0, high: 0, medium: 5 }
  ai_review: { high_issues: 0 }
  test_coverage: { min_pct: 80 }
  security_scan: { critical: 0 }
```

## 步骤三：提取修复建议

为每条检测到的问题输出修复建议。

## 验证标准

- SQL 拼接被正确检测
- 硬编码密钥被识别
- 门禁阈值配置完整
