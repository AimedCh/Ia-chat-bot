#!/bin/bash

# iaBot - Quick Start Script for Linux/Mac
# This script starts both backend and frontend servers

echo ""
echo "========================================"
echo "  iaBot Chatbot - Starting Application"
echo "========================================"
echo ""

# Check if we're in the right directory
if [ ! -d "backend" ]; then
    echo "Error: backend folder not found!"
    echo "Please run this script from the iaBot directory."
    exit 1
fi

if [ ! -d "frontend" ]; then
    echo "Error: frontend folder not found!"
    echo "Please run this script from the iaBot directory."
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on Ctrl+C
trap cleanup SIGINT

# Start Backend Server
echo ""
echo "[1/2] Starting Backend Server..."
echo "Backend will run on: http://localhost:8000"
echo ""
cd backend
php artisan serve &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start Frontend Server
echo ""
echo "[2/2] Starting Frontend Server..."
echo "Frontend will run on: http://localhost:5173"
echo ""
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "========================================"
echo "  Application Started Successfully!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the servers."
echo ""

# Wait for both processes
wait

