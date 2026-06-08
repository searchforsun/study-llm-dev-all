#!/usr/bin/env bash
# 本地启动辅助脚本（macOS / Linux）
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SHOPFLOW="$ROOT/shopflow"

usage() {
  cat <<'EOF'
用法（4 个终端按顺序）：
  ./scripts/start-local.sh discovery
  ./scripts/start-local.sh inventory
  ./scripts/start-local.sh order
  ./scripts/start-local.sh gateway

编译：cd shopflow && mvn -q verify
EOF
}

SERVICE="${1:-}"
if [[ -z "$SERVICE" ]]; then usage; exit 0; fi

run_module() {
  local dir="$1"
  cd "$SHOPFLOW/$dir"
  mvn spring-boot:run -Dspring-boot.run.profiles=local
}

case "$SERVICE" in
  discovery) run_module shopflow-discovery-server ;;
  inventory) run_module shopflow-inventory-service ;;
  order)     run_module shopflow-order-service ;;
  gateway)   run_module shopflow-gateway ;;
  *) echo "未知服务: $SERVICE"; usage; exit 1 ;;
esac
