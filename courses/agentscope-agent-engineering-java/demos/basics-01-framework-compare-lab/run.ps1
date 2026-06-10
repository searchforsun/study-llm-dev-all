Set-Location $PSScriptRoot
javac FrameworkCompareDemo.java
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
java FrameworkCompareDemo
