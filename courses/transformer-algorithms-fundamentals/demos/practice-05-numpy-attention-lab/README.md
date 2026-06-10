# practice-05-numpy-attention-lab

NumPy 实现 **Scaled Dot-Product Attention** 与 **Causal Mask**，对应课程 `practice-05-numpy-attention-lab` 动手章。

## 环境

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
```

## 运行

```bash
python mini_attention.py
```

## 期望输出要点

- 打印两段：`no mask` 与 `Causal mask (decoder / GPT style)`。
- 注意力权重矩阵每**行**求和为 `1.0`（softmax 性质）。
- 因果 mask 下，上三角（未来 token）权重接近 `0`。
- 末尾一行：`OK: all checks passed`。

## 对照学习

1. 对照章节公式 `softmax(QK^T / sqrt(d_k)) V` 阅读 `scaled_dot_product_attention`。
2. 修改 `seq_len` 为 6，观察权重矩阵形状变化。
3. 可选：与 PyTorch `F.scaled_dot_product_attention` 同输入对比数值（需安装 torch）。

## 验收

在 lab 目录执行上方「运行」小节的命令（python + mini_attention.py），无报错且出现 OK: all checks passed 即通过。
