#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
javac EventStreamDemo.java
java EventStreamDemo
