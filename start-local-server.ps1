# SmartView Local Server Launcher
# This script starts a local web server to test the SmartView web app

Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     SmartView Local Server Launcher       ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$webappPath = Join-Path $PSScriptRoot "webapp"

if (-not (Test-Path $webappPath)) {
    Write-Host "Error: webapp folder not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this script from the Smartview root directory." -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "Starting web server..." -ForegroundColor Green
Write-Host "Location: $webappPath" -ForegroundColor Gray
Write-Host ""
Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  Server running at:                        ║" -ForegroundColor Green
Write-Host "║  http://localhost:8000                     ║" -ForegroundColor Yellow
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Try to open browser automatically
Start-Sleep -Seconds 2
Start-Process "http://localhost:8000"

# Start Python server
Set-Location $webappPath
python -m http.server 8000
