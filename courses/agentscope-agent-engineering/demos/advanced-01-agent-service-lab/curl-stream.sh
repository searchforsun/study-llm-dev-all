#!/usr/bin/env bash
curl -N -X POST http://localhost:8080/v1/chat/stream \
  -H "X-Tenant-Id: demo" \
  -H "Content-Type: application/json" \
  -d '{"session_id":"s1","message":"查年假制度"}'
