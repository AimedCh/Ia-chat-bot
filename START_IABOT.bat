@echo off
REM iaBot - Quick Start Script for Windows
REM This script starts both backend and frontend servers

echo.
echo ========================================
echo   iaBot Chatbot - Starting Application
echo ========================================
echo.

REM Check if we're in the right directory
if not exist "backend" (
    echo Error: backend folder not found!
    echo Please run this script from the iaBot directory.
    pause
    exit /b 1
)

if not exist "frontend" (
    echo Error: frontend folder not found!
    echo Please run this script from the iaBot directory.
    pause
    exit /b 1
)

REM Start Backend Server
echo.
echo [1/2] Starting Backend Server...
echo Backend will run on: http://localhost:8000
echo.
start cmd /k "cd backend && php artisan serve"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend Server
echo.
echo [2/2] Starting Frontend Server...
echo Frontend will run on: http://localhost:5173
echo.
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Application Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press Ctrl+C in each terminal to stop the servers.
echo.
pause

