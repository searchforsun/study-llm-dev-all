#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
javac TicketTools.java MockMcp.java ToolsMcpDemo.java
java ToolsMcpDemo
