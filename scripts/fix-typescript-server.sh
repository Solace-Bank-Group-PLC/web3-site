#!/usr/bin/env bash

# Description: Fix TypeScript server issues in VS Code
# Usage: ./scripts/fix-typescript-server.sh

set -e  # Exit on error
set -u  # Exit on undefined variables

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting TypeScript server fix..."

# Detect OS and set paths
case "$OSTYPE" in
    darwin*)
        VSCODE_CACHE_PATH="$HOME/Library/Application Support/Code/Cache"
        VSCODE_APP="Visual Studio Code"
        OPEN_CMD="open -a"
        ;;
    linux-gnu*)
        VSCODE_CACHE_PATH="$HOME/.config/Code/Cache"
        VSCODE_APP="code"
        OPEN_CMD="code"
        ;;
    *)
        log "Unsupported operating system: $OSTYPE"
        exit 1
        ;;
esac

# Verify VS Code installation
if ! command -v code &> /dev/null; then
    log "VS Code is not installed or not in PATH"
    exit 1
fi

# Function to kill process safely
kill_process() {
    pkill -f "$1" || true
    sleep 2
}

# Kill TypeScript server processes
log "Stopping TypeScript server..."
kill_process "TypeScript"

# Clear VS Code TypeScript cache
log "Clearing TypeScript cache..."
rm -rf "${VSCODE_CACHE_PATH}"/typescript* || true
rm -rf "${VSCODE_CACHE_PATH}"/CachedData/typescript* || true

# Restart VS Code
log "Restarting VS Code..."
kill_process "Code"

# Start VS Code based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    $OPEN_CMD "$VSCODE_APP" || { log "Failed to start VS Code"; exit 1; }
else
    $OPEN_CMD || { log "Failed to start VS Code"; exit 1; }
fi

# Wait for VS Code to initialize
log "Waiting for VS Code to initialize..."
sleep 5

# Select workspace TypeScript version
log "Selecting TypeScript version..."
code --execute-command "typescript.selectTypeScriptVersion"

log "TypeScript server fix completed successfully!"