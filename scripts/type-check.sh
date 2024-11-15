#!/usr/bin/env bash

# Description: Type checking and development server script
# Usage: ./scripts/type-check.sh

set -e  # Exit on error
set -u  # Exit on undefined variables

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting type checking and development server..."

# Function to check if port is in use
check_port() {
    lsof -i:"$1" >/dev/null 2>&1
    return $?
}

# Function to cleanup processes
cleanup() {
    log "Cleaning up processes..."
    kill "$TSC_PID" 2>/dev/null || true
    kill "$NEXT_PID" 2>/dev/null || true
    exit 0
}

# Setup trap for cleanup
trap cleanup SIGINT SIGTERM EXIT

# Check if required ports are available
for port in 3000 3001; do
    if check_port "$port"; then
        log "Port $port is already in use. Please free up the port first."
        exit 1
    fi
done

# Start TypeScript compiler in watch mode
log "Starting TypeScript compiler in watch mode..."
pnpm tsc --watch --noEmit &
TSC_PID=$!

# Verify TypeScript compiler started with timeout
TIMEOUT=30
for ((i=1; i<=TIMEOUT; i++)); do
    if ps -p "$TSC_PID" > /dev/null; then
        break
    fi
    if [ "$i" -eq "$TIMEOUT" ]; then
        log "Failed to start TypeScript compiler after ${TIMEOUT}s"
        cleanup
        exit 1
    fi
    sleep 1
done

# Start Next.js development server
log "Starting Next.js development server..."
pnpm next dev &
NEXT_PID=$!

# Verify Next.js server started with timeout
for ((i=1; i<=TIMEOUT; i++)); do
    if ps -p "$NEXT_PID" > /dev/null; then
        break
    fi
    if [ "$i" -eq "$TIMEOUT" ]; then
        log "Failed to start Next.js server after ${TIMEOUT}s"
        cleanup
        exit 1
    fi
    sleep 1
done

log "Both processes started successfully!"
log "TypeScript compiler PID: $TSC_PID"
log "Next.js server PID: $NEXT_PID"
log "Press Ctrl+C to stop both processes"

# Wait for processes with timeout
timeout 28800 tail --pid="$TSC_PID" -f /dev/null || {
    log "Process timeout after 8 hours"
    cleanup
    exit 1
} 