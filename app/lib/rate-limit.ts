const requests = new Map<string, { count: number; resetAt: number }>();

// Prune expired entries to prevent unbounded memory growth.
// Runs on every 500th call — cheap enough to be inline, effective enough for production.
let callCount = 0;
function pruneExpired() {
  if (++callCount % 500 !== 0) return;
  const now = Date.now();
  for (const [key, entry] of requests) {
    if (now > entry.resetAt) requests.delete(key);
  }
}

export function rateLimit(
  identifier: string,
  limit: number,
  windowSeconds: number
): { success: boolean; remaining: number } {
  pruneExpired();

  const now = Date.now();
  const entry = requests.get(identifier);

  if (!entry || now > entry.resetAt) {
    requests.set(identifier, {
      count: 1,
      resetAt: now + windowSeconds * 1000,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 };
  }

  entry.count++;
  return { success: true, remaining: limit - entry.count };
}
