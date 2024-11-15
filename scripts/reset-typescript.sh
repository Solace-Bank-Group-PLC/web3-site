#!/bin/bash

set -e  # Exit on error

echo "Starting TypeScript reset process..."

# Backup existing configuration
if [ -f tsconfig.json ]; then
    echo "Backing up existing tsconfig.json..."
    cp tsconfig.json tsconfig.json.backup
fi

# Remove TypeScript-related files
echo "Removing TypeScript files..."
rm -rf tsconfig.json tsconfig.node.json

# Clear VS Code TypeScript server
echo "Clearing TypeScript server cache..."
rm -rf .vscode/.tsbuildinfo .vscode/ts-cache

# Restart VS Code TypeScript server
echo "Restarting TypeScript server..."
code --kill-typescript-server || true

# Remove and reinstall TypeScript dependencies
echo "Reinstalling TypeScript dependencies..."
pnpm remove typescript @types/react @types/react-dom @types/node || true
pnpm add -D typescript@latest @types/react@latest @types/react-dom@latest @types/node@latest || { 
    echo "Failed to install dependencies"
    exit 1
}

# Generate new tsconfig
echo "Generating new TypeScript configuration..."
pnpm tsc --init || { echo "Failed to initialize TypeScript config"; exit 1; }

# Apply custom configuration
echo "Applying custom TypeScript configuration..."
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

# Run type check
echo "Running type check..."
pnpm typecheck || { echo "Type check failed"; exit 1; }

echo "TypeScript reset completed successfully!"