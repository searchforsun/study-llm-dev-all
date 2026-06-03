#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
export SPRING_PROFILES_ACTIVE=stub
export CORPASSIST_DEMO_MODE=stub
mvn spring-boot:run
