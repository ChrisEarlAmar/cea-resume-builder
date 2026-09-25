@echo off
setlocal EnableExtensions

rem Always run from this repository, even when launched by double-clicking.
set "REPOSITORY_ROOT=%~dp0"
set "APP_DIRECTORY=%REPOSITORY_ROOT%app"

where npm >nul 2>&1
if errorlevel 1 (
  echo.
  echo Node.js and npm are required to build this site.
  echo Install the current Node.js LTS release, then run this file again.
  echo.
  if not defined CI pause
  exit /b 1
)

if not exist "%APP_DIRECTORY%\package.json" (
  echo.
  echo The React project was not found at:
  echo   %APP_DIRECTORY%
  echo.
  if not defined CI pause
  exit /b 1
)

pushd "%APP_DIRECTORY%"

if not exist "node_modules\" (
  echo Installing project dependencies...
  call npm ci
  if errorlevel 1 goto :build_failed
)

echo.
echo Building the GitHub Pages site...
call npm run build
if errorlevel 1 goto :build_failed

popd

echo Syncing static files to the repository root...
copy /Y "%APP_DIRECTORY%\dist\index.html" "%REPOSITORY_ROOT%index.html" >nul
if errorlevel 1 goto :sync_failed

rem /MIR only affects the generated root assets directory and removes stale hashed bundles.
robocopy "%APP_DIRECTORY%\dist\assets" "%REPOSITORY_ROOT%assets" /MIR /NFL /NDL /NJH /NJS >nul
if errorlevel 8 goto :sync_failed

copy /Y "%APP_DIRECTORY%\dist\.nojekyll" "%REPOSITORY_ROOT%.nojekyll" >nul
if errorlevel 1 goto :sync_failed

echo.
echo Build complete.
echo GitHub Pages files are ready at the repository root:
echo   %REPOSITORY_ROOT%index.html
echo   %REPOSITORY_ROOT%assets\
echo.
echo Commit and push the generated root files to main to publish with free GitHub Pages.
echo.
if not defined CI pause
exit /b 0

:build_failed
popd
echo.
echo The build did not complete. Review the error above and try again.
echo.
if not defined CI pause
exit /b 1

:sync_failed
echo.
echo The React app built, but its static files could not be synchronized to the repository root.
echo.
if not defined CI pause
exit /b 1
