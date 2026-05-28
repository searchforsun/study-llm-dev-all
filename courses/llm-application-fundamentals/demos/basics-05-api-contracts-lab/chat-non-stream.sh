#!/usr/bin/env bash
set -euo pipefail
: "${CORPASSIST_LLM_BASE_URL:?set CORPASSIST_LLM_BASE_URL}"
: "${CORPASSIST_LLM_KEY:?set CORPASSIST_LLM_KEY}"
MODEL="${CORPASSIST_LLM_MODEL:-qwen-plus}"
curl -s "${CORPASSIST_LLM_BASE_URL%/}/chat/completions" \
  -H "Authorization: Bearer ${CORPASSIST_LLM_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"${MODEL}\",\"stream\":false,\"messages\":[{\"role\":\"user\",\"content\":\"用一句话解释 RAG\"}]}"
