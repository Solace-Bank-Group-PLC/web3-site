export class SecurityService {
  private readonly allowedDomains: string[] = [];
  private readonly rateLimiter: Map<string, number> = new Map();

  validateRequest(origin: string, method: string): boolean {
    // Check domain allowlist
    if (!this.allowedDomains.includes(origin)) {
      throw new Error('Unauthorized domain');
    }

    // Rate limiting
    const key = `${origin}:${method}`;
    const now = Date.now();
    const lastRequest = this.rateLimiter.get(key) || 0;
    
    if (now - lastRequest < 1000) { // 1 request per second
      throw new Error('Rate limit exceeded');
    }
    
    this.rateLimiter.set(key, now);
    return true;
  }

  // Add HTTPS-only validation
  validateConnection(provider: BrowserProvider): boolean {
    const connection = provider.connection;
    if (!connection.url.startsWith('https://')) {
      throw new Error('HTTPS connection required');
    }
    return true;
  }
}
