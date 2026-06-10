Set-Location $PSScriptRoot
javac EventStreamDemo.java
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
java EventStreamDemo
