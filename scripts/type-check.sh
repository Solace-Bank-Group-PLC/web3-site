#!/bin/bash

set -e  # Exit on error

echo "Starting type checking and development server..."

# Function to check if port is in use
check_port() {
    lsof -i:3000 >/dev/null 2>&1
    return $?
}

# Function to cleanup processes
cleanup() {
    echo "Cleaning up processes..."
    kill $TSC_PID 2>/dev/null || true
    kill $NEXT_PID 2>/dev/null || true
    exit 0
}

# Setup trap for cleanup
trap cleanup SIGINT SIGTERM

# Check if port 3000 is already in use
if check_port; then
    echo "Port 3000 is already in use. Please free up the port first."
    exit 1
fi

# Start TypeScript compiler in watch mode
echo "Starting TypeScript compiler in watch mode..."
pnpm tsc --watch --noEmit &
TSC_PID=$!

# Verify TypeScript compiler started
if ! ps -p $TSC_PID > /dev/null; then
    echo "Failed to start TypeScript compiler"
    cleanup
    exit 1
fi

# Start Next.js development server
echo "Starting Next.js development server..."
pnpm next dev &
NEXT_PID=$!

# Verify Next.js server started
if ! ps -p $NEXT_PID > /dev/null; then
    echo "Failed to start Next.js server"
    cleanup
    exit 1
fi

echo "Both processes started successfully!"
echo "TypeScript compiler PID: $TSC_PID"
echo "Next.js server PID: $NEXT_PID"
echo "Press Ctrl+C to stop both processes"

# Wait for both processes
wait 