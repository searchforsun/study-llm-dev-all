if (-not $env:AI_DASHSCOPE_API_KEY) {
  Write-Error "请先设置 AI_DASHSCOPE_API_KEY"
  exit 1
}
$env:JAVA_HOME = if ($env:JAVA_HOME) { $env:JAVA_HOME } else { "C:\Program Files\Java\jdk-21" }
$env:SPRING_PROFILES_ACTIVE = "live"
$env:CORPASSIST_DEMO_MODE = "live"
Set-Location $PSScriptRoot\..
mvn spring-boot:run -Plive "-Dspring-boot.run.profiles=live"
