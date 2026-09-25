@echo off
setlocal EnableExtensions

rem Always run from this repository, even when launched by double-clicking.
cd /d "%~dp0"

where npm >nul 2>&1
if errorlevel 1 (
  echo.
  echo Node.js and npm are required to build this site.
  echo Install the current Node.js LTS release, then run this file again.
  echo.
  if not defined CI pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing project dependencies...
  call npm ci
  if errorlevel 1 goto :build_failed
)

echo.
echo Building the GitHub Pages site...
call npm run build
if errorlevel 1 goto :build_failed

echo.
echo Build complete.
echo GitHub Pages files are ready in:
echo   %CD%\dist
echo.
echo Commit and push your changes to main to trigger the GitHub Pages workflow.
echo.
if not defined CI pause
exit /b 0

:build_failed
echo.
echo The build did not complete. Review the error above and try again.
echo.
if not defined CI pause
exit /b 1
