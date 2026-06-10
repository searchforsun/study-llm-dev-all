param([string]$Case = "event-disconnect")
switch ($Case) {
  "event-disconnect" { Write-Host "检查 SSE 超时与 cancellation token" }
  "tool-deny" { Write-Host "检查 tools.json allowlist 与 HITL 审批状态" }
  "session-lost" { Write-Host "检查 Redis session 键 TTL 与 tenant 前缀" }
  "sub-agent-deadlock" { Write-Host "检查 Sub-agent 同步/后台模式与超时" }
  default { Write-Host "usage: diagnose.ps1 <case>" }
}
