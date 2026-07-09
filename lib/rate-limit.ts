// In-memory per-IP rate limiter for the form API routes.
// State lives in the function instance, so counts reset on cold start —
// acceptable for abuse throttling at this traffic level (SECURITY-AUDIT.md #1).

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;
const MAX_TRACKED_IPS = 10_000;

const hits = new Map<string, number[]>();

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();

  if (hits.size >= MAX_TRACKED_IPS) {
    for (const [k, timestamps] of hits) {
      if (timestamps[timestamps.length - 1] < now - WINDOW_MS) hits.delete(k);
    }
  }

  const recent = (hits.get(key) ?? []).filter((t) => t > now - WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  return false;
}
