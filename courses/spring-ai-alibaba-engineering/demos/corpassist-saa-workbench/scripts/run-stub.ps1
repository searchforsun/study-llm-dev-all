$env:JAVA_HOME = if ($env:JAVA_HOME) { $env:JAVA_HOME } else { "C:\Program Files\Java\jdk-21" }
$env:SPRING_PROFILES_ACTIVE = "stub"
$env:CORPASSIST_DEMO_MODE = "stub"
Set-Location $PSScriptRoot\..
mvn spring-boot:run
