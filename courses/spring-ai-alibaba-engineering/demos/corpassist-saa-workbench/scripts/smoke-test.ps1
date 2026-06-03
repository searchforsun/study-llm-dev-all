$base = "http://localhost:8080"
$tests = @(
  @{ Name = "demo-info"; Url = "$base/api/demo/info" },
  @{ Name = "chat"; Method = "POST"; Url = "$base/api/agent/chat"; Body = '{"message":"年假政策"}' },
  @{ Name = "admin-dsl"; Url = "$base/api/admin/dsl/sample" },
  @{ Name = "dualstack"; Url = "$base/api/dualstack/config" }
)
foreach ($t in $tests) {
  if ($t.Method -eq "POST") {
    $r = Invoke-RestMethod -Uri $t.Url -Method Post -ContentType "application/json" -Body $t.Body
  } else {
    $r = Invoke-RestMethod -Uri $t.Url
  }
  Write-Host "[ok] $($t.Name)" -ForegroundColor Green
}
Write-Host "smoke test passed"
