Set-Location $PSScriptRoot
javac TicketTools.java MockMcp.java ToolsMcpDemo.java
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
java ToolsMcpDemo
