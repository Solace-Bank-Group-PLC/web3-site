import { resolve } from 'path';
import { existsSync } from 'fs';

export const resolveModule = (modulePath: string): string | null => {
  try {
    // Check if module exists in node_modules
    const nodeModulePath = resolve(process.cwd(), 'node_modules', modulePath);
    if (existsSync(nodeModulePath)) {
      return nodeModulePath;
    }

    // Check if module exists in local path
    const localPath = resolve(process.cwd(), modulePath);
    if (existsSync(localPath)) {
      return localPath;
    }

    return null;
  } catch (error) {
    console.error(`Error resolving module ${modulePath}:`, error);
    return null;
  }
}; 