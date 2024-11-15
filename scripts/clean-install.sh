#!/bin/bash

set -e  # Exit on error

echo "Starting clean installation process..."

# Remove existing node_modules and lock files
echo "Cleaning existing files..."
rm -rf node_modules package-lock.json pnpm-lock.yaml

# Clear npm cache
echo "Clearing npm cache..."
npm cache clean --force

# Install pnpm if not present
if ! command -v pnpm &> /dev/null; then
    echo "Installing pnpm..."
    npm install -g pnpm || { echo "Failed to install pnpm"; exit 1; }
fi

# Setup pnpm environment
export PNPM_HOME="${PNPM_HOME:-$HOME/.local/share/pnpm}"
export PATH="$PNPM_HOME:$PATH"

# Install dependencies
echo "Installing project dependencies..."
pnpm install --no-frozen-lockfile || { echo "Failed to install dependencies"; exit 1; }

# Install TypeScript globally if not present
if ! command -v tsc &> /dev/null; then
    echo "Installing TypeScript globally..."
    pnpm add -g typescript || { echo "Failed to install TypeScript"; exit 1; }
fi

# Run type check
echo "Running type check..."
pnpm typecheck || { echo "Type check failed"; exit 1; }

# Run security audit
echo "Running security audit..."
pnpm audit || { echo "Security audit failed but continuing..."; }

echo "Clean installation completed successfully!"