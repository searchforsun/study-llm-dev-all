# 本地启动辅助脚本（Windows PowerShell）
# 用法：在 4 个终端分别运行对应段落，或使用 -Service 参数单启一项

param(
  [ValidateSet("discovery", "inventory", "order", "gateway", "all")]
  [string]$Service = "all"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Shopflow = Join-Path $Root "shopflow"

if (-not $env:JAVA_HOME) {
  $candidate = "C:\Program Files\Java\jdk-21"
  if (Test-Path $candidate) { $env:JAVA_HOME = $candidate }
}

function Start-Module([string]$Name, [string]$ModuleDir) {
  Write-Host ">>> Starting $Name ..."
  Push-Location (Join-Path $Shopflow $ModuleDir)
  mvn spring-boot:run "-Dspring-boot.run.profiles=local"
  Pop-Location
}

switch ($Service) {
  "discovery" { Start-Module "discovery-server" "shopflow-discovery-server" }
  "inventory" { Start-Module "inventory-service" "shopflow-inventory-service" }
  "order"     { Start-Module "order-service" "shopflow-order-service" }
  "gateway"   { Start-Module "api-gateway" "shopflow-gateway" }
  default {
    Write-Host @"
请按顺序在 4 个终端执行：
  1. .\scripts\start-local.ps1 -Service discovery
  2. .\scripts\start-local.ps1 -Service inventory
  3. .\scripts\start-local.ps1 -Service order
  4. .\scripts\start-local.ps1 -Service gateway

编译：cd shopflow && mvn -q verify
"@
  }
}
