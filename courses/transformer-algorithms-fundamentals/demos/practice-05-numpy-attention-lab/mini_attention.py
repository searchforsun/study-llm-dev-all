"""NumPy mini scaled dot-product attention with optional causal mask."""

from __future__ import annotations

import numpy as np


def softmax(x: np.ndarray, axis: int = -1) -> np.ndarray:
    shifted = x - np.max(x, axis=axis, keepdims=True)
    exp = np.exp(shifted)
    return exp / np.sum(exp, axis=axis, keepdims=True)


def scaled_dot_product_attention(
    q: np.ndarray,
    k: np.ndarray,
    v: np.ndarray,
    mask: np.ndarray | None = None,
) -> tuple[np.ndarray, np.ndarray]:
    d_k = q.shape[-1]
    scores = q @ k.T / np.sqrt(d_k)
    if mask is not None:
        scores = np.where(mask, scores, -1e9)
    weights = softmax(scores, axis=-1)
    output = weights @ v
    return output, weights


def causal_mask(seq_len: int) -> np.ndarray:
    return np.tril(np.ones((seq_len, seq_len), dtype=bool))


def main() -> None:
    np.set_printoptions(precision=4, suppress=True, linewidth=120)

    seq_len, d_model = 4, 8
    rng = np.random.default_rng(42)
    x = rng.standard_normal((seq_len, d_model))

    w_q = rng.standard_normal((d_model, d_model)) * 0.1
    w_k = rng.standard_normal((d_model, d_model)) * 0.1
    w_v = rng.standard_normal((d_model, d_model)) * 0.1

    q, k, v = x @ w_q, x @ w_k, x @ w_v

    print("=== CorpAssist mini attention (no mask) ===")
    out_full, w_full = scaled_dot_product_attention(q, k, v)
    row_sums = w_full.sum(axis=1)
    print("Attention weights (rows should sum to 1):")
    print(w_full)
    print("Row sums:", row_sums)
    print("Output shape:", out_full.shape)

    print("\n=== Causal mask (decoder / GPT style) ===")
    mask = causal_mask(seq_len)
    out_causal, w_causal = scaled_dot_product_attention(q, k, v, mask=mask)
    print("Causal attention weights:")
    print(w_causal)
    print("Upper triangle (should be ~0):", w_causal[0, 1:].tolist())
    print("Row sums:", w_causal.sum(axis=1))
    print("Output shape:", out_causal.shape)

    assert np.allclose(row_sums, 1.0, atol=1e-5), "weights must sum to 1 per row"
    assert np.allclose(w_causal.sum(axis=1), 1.0, atol=1e-5), "causal weights must sum to 1"
    assert np.all(w_causal[np.triu_indices(seq_len, k=1)] < 1e-6), "future tokens must be masked"
    print("\nOK: all checks passed")


if __name__ == "__main__":
    main()
