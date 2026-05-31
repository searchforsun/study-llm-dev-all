# Demo：坏例归因方法论

[章节](../../index.html#ch-practice-04-root-cause)

## 内容
- `root_cause_demo.py` — 归因分析脚本
- `case_library.jsonl` — 案例库

## 验收标准
1. trace 分析能区分检索/生成/Prompt 失败
2. 案例库至少 1 条记录

## 操作步骤
1. 运行 `python root_cause_demo.py` 分析 sample trace
2. 识别 retrieval failure 模式的 2 个特征
3. 向案例库添加一条归因案例
