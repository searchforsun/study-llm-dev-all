#!/usr/bin/env bash
BASE="${AGENT_BASE_URL:-http://localhost:8080}"
curl -s "$BASE/actuator/health"
curl -s -X POST "$BASE/api/agent/run" -H "Content-Type: application/json" \
  -d '{"sessionId":"demo-s1","message":"查询我的待办工单"}'
