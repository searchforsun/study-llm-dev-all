**S**ituation：CorpAssist S1 上线 rag-prompt-v2.3 后 cite_coverage 降至 0.61。

**T**ask：在不升高幻觉的前提下恢复 cite，48h 内 hotfix。

**A**ction：trace 排除空检索；System 增加 cite 格式句（单变量）；golden + 12 badcase 回归。

**R**esult：cite 0.80（+0.19），refusal +0.02，已 tag v2.4.1。

**P**rompt：见 prompt-diff.txt 与 metric-delta.yaml。
