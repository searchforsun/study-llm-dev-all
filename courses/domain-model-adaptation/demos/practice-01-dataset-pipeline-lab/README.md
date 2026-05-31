# Demo：数据集构建管线实战

[章节](../../index.html#ch-practice-01-dataset-pipeline)

## 目标
跑通从 JSONL 语料到 LoRA adapter 的完整训练流水线。

## 前置条件
- Python 3.10+, `pip install -r requirements.txt`
- 访问 Hugging Face Hub 或本地模型文件

## 文件说明
- `train_lora.py` — 完整的 SFTTrainer + LoRA 训练脚本
- `lora_config.yaml` — LoRA 超参配置
- `train.sh` — 训练启动命令

## 操作步骤
1. 准备 JSONL 语料（参考 ../basics-02-dataset-lab/sample.jsonl）
2. 修改 lora_config.yaml 中的模型路径和数据集路径
3. 运行 `bash train.sh`
4. 观察 W&B 训练曲线
5. 产物保存在 ./outputs/ 目录

## 验收标准
- [ ] 训练无报错完成
- [ ] adapter_config.json + adapter_model.safetensors 已生成
- [ ] W&B 曲线显示 loss 下降
