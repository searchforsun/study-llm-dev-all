if (Select-String -Path "selection-matrix.md" -Pattern "推荐" -Quiet) { Write-Host "matrix OK" } else { exit 1 }
