#!/bin/bash

set -e  # Exit on error

echo "Starting TypeScript server fix..."

# Detect OS for proper paths
if [[ "$OSTYPE" == "darwin"* ]]; then
    VSCODE_CACHE_PATH="~/Library/Application Support/Code/Cache"
    VSCODE_APP="Visual Studio Code"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    VSCODE_CACHE_PATH="~/.config/Code/Cache"
    VSCODE_APP="code"
else
    echo "Unsupported operating system"
    exit 1
fi

# Verify VS Code installation
if ! command -v code &> /dev/null; then
    echo "VS Code is not installed or not in PATH"
    exit 1
fi

# Kill TypeScript server processes
echo "Stopping TypeScript server..."
pkill -f "TypeScript" || true

# Clear VS Code TypeScript cache
echo "Clearing TypeScript cache..."
rm -rf "$VSCODE_CACHE_PATH/typescript*" || true
rm -rf "$VSCODE_CACHE_PATH/CachedData/typescript*" || true

# Restart VS Code
echo "Restarting VS Code..."
pkill -f "Code" || true
sleep 2
open -a "$VSCODE_APP" || code || { echo "Failed to start VS Code"; exit 1; }

# Wait for VS Code to start
echo "Waiting for VS Code to initialize..."
sleep 5

# Select workspace TypeScript version
echo "Selecting TypeScript version..."
code --execute-command "typescript.selectTypeScriptVersion"

echo "TypeScript server fix completed!"