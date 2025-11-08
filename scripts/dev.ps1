
param([string]$App = "ussd")
Write-Host "Starting dev for $App"
switch ($App) {
  "ussd" { Set-Location ../apps/ussd; pnpm dev }
  "mobile" { Set-Location ../apps/mobile; pnpm start }
  "web" { Set-Location ../apps/web; pnpm dev }
  default { Write-Host "Apps: ussd | mobile | web" }
}
