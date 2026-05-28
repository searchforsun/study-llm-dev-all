#!/usr/bin/env python3
"""CorpAssist S1 容量粗算（教学用，数量级即可）."""

DAU = 5000
QUESTIONS_PER_USER_PER_DAY = 8
PEAK_FACTOR = 3
SECONDS_PER_DAY = 86400

AVG_PROMPT_TOKENS = 3500
AVG_COMPLETION_TOKENS = 400

daily_questions = DAU * QUESTIONS_PER_USER_PER_DAY
avg_qps = daily_questions / SECONDS_PER_DAY
peak_qps = avg_qps * PEAK_FACTOR

daily_prompt_tokens = daily_questions * AVG_PROMPT_TOKENS
daily_completion_tokens = daily_questions * AVG_COMPLETION_TOKENS

print(f"日均提问: {daily_questions}")
print(f"平均 QPS: {avg_qps:.2f}")
print(f"峰值 QPS (×{PEAK_FACTOR}): {peak_qps:.2f}")
print(f"日 prompt tokens: {daily_prompt_tokens:,}")
print(f"日 completion tokens: {daily_completion_tokens:,}")
