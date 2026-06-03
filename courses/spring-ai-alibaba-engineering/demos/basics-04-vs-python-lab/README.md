# Demo：与 Python 通义 SDK 对照

对应章节：[双栈对照](../../index.html#ch-basics-04-vs-python)

**可运行工程**：[`../corpassist-saa-workbench/`](../corpassist-saa-workbench/)

## 运行

```bash
cd ../corpassist-saa-workbench
mvn spring-boot:run &
sleep 8
python ../basics-04-vs-python-lab/scripts/dualstack_probe.py
```

## 验收

- [ ] Java `GET /api/dualstack/config` 与 Python 脚本输出模型名一致
- [ ] 阅读 `capability-matrix.md` 完成 3 项「仅 Java / 仅 Python」标注
- [ ] 双栈共用 `CORPASSIST_AGENT_MODEL` 环境变量
