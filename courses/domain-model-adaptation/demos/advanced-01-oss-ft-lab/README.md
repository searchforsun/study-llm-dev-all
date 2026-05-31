# Demo：开源模型微调（LLaMA-Factory）

[章节](../../index.html#ch-advanced-01-oss-ft)

## 目标
用 LLaMA-Factory 完成 LoRA 训练、评测和导出。

## 前置条件
- Python 3.10+, `pip install llamafactory`
- 已安装 LLaMA-Factory：`git clone https://github.com/hiyouga/LLaMA-Factory.git`

## 文件说明
- `corpassist_lora.yaml` — LoRA 训练配置
- `corpassist_eval.yaml` — 评测配置
- `corpassist_export.yaml` — 导出配置
- `dataset_info.json` — 数据集注册

## 操作步骤
1. 在 LLaMA-Factory 的 data/ 目录中放置 JSONL 语料
2. 将 dataset_info.json 合并到 LLaMA-Factory 的配置中
3. 运行 `llamafactory-cli train corpassist_lora.yaml`
4. 运行 `llamafactory-cli eval corpassist_eval.yaml`
5. 运行 `llamafactory-cli export corpassist_export.yaml`

## 验收标准
- [ ] 训练无报错完成
- [ ] eval 子命令输出评测分数
- [ ] export 子命令输出合并后的完整模型
