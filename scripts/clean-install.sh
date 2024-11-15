#!/usr/bin/env bash

# Description: Clean installation script for project setup
# Usage: ./scripts/clean-install.sh

set -e  # Exit on error
set -u  # Exit on undefined variables

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting clean installation process..."

# Remove existing node_modules and lock files
log "Cleaning existing files..."
rm -rf node_modules package-lock.json pnpm-lock.yaml

# Install specific pnpm version if not present or version mismatch
check_pnpm_version() {
    local required_version="9.13.2"
    
    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        log "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v pnpm &> /dev/null || [[ $(pnpm -v) != "$required_version" ]]; then
        log "Installing pnpm version $required_version..."
        # Use npm for initial pnpm installation
        npm install -g pnpm@$required_version || {
            log "Failed to install pnpm using npm"
            exit 1
        }
        
        # Verify installation
        if [[ $(pnpm -v) != "$required_version" ]]; then
            log "Failed to install correct pnpm version"
            exit 1
        fi
    fi
}

check_pnpm_version

# Clear package manager cache
log "Clearing pnpm cache..."
pnpm store prune

# Install dependencies
log "Installing project dependencies..."
pnpm install --no-frozen-lockfile || { log "Failed to install dependencies"; exit 1; }

# Run type check
log "Running type check..."
pnpm typecheck || { log "Type check failed"; exit 1; }

# Run security audit
log "Running security audit..."
pnpm audit || { log "Security audit failed but continuing..."; }

log "Clean installation completed successfully!"