#!/usr/bin/env bash

# Description: Reset TypeScript configuration and dependencies
# Usage: ./scripts/reset-typescript.sh

set -e  # Exit on error
set -u  # Exit on undefined variables

# Log function
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting TypeScript reset process..."

# Create backup directory if it doesn't exist
BACKUP_DIR=".typescript-backups"
mkdir -p "$BACKUP_DIR"

# Backup existing configuration with timestamp
if [ -f tsconfig.json ]; then
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    log "Backing up existing tsconfig.json..."
    cp tsconfig.json "${BACKUP_DIR}/tsconfig.json.${TIMESTAMP}.backup"
    # Keep only last 5 backups
    ls -t "${BACKUP_DIR}"/tsconfig.json.*.backup | tail -n +6 | xargs rm -f 2>/dev/null || true
fi

# Remove TypeScript-related files
log "Removing TypeScript files..."
rm -rf tsconfig.json tsconfig.node.json

# Clear VS Code TypeScript server
log "Clearing TypeScript server cache..."
rm -rf .vscode/.tsbuildinfo .vscode/ts-cache

# Restart VS Code TypeScript server
log "Restarting TypeScript server..."
code --kill-typescript-server || true

# Remove and reinstall TypeScript dependencies
log "Reinstalling TypeScript dependencies..."
pnpm remove typescript @types/react @types/react-dom @types/node || true
pnpm add -D typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest || { 
    log "Failed to install dependencies"
    exit 1
}

# Generate new tsconfig
log "Generating new TypeScript configuration..."
pnpm tsc --init || { log "Failed to initialize TypeScript config"; exit 1; }

# Apply custom configuration
log "Applying custom TypeScript configuration..."
cat > tsconfig.json << 'EOL'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
EOL

# Verify configuration
if ! pnpm tsc --noEmit; then
    log "TypeScript configuration verification failed"
    exit 1
fi

log "TypeScript reset completed successfully!"