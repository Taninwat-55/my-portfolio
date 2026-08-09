/**
 * Best-effort caller identity for rate limiting.
 *
 * The obvious implementation — first entry of x-forwarded-for — is wrong, and
 * wrong in a way that silently disables rate limiting rather than breaking
 * loudly. XFF is a list the *client* can seed: a caller sending
 * `x-forwarded-for: 203.0.113.1` gets that value treated as their identity, and
 * the proxy appends the real address after it. Rotating that header then buys a
 * fresh quota on every request. This was confirmed against production: four
 * forged addresses each got a fresh bucket instead of the expected 429.
 *
 * So, in order:
 *   1. x-nf-client-connection-ip — set by Netlify's edge from the actual TCP
 *      connection. A client cannot forge it, because the edge overwrites it.
 *   2. The LAST entry of x-forwarded-for. Each proxy appends, so the rightmost
 *      value is the one written by the proxy nearest to us rather than anything
 *      the caller supplied. Never take the first.
 *   3. x-real-ip, then a constant.
 *
 * Note this is still a throttling key and never an authentication one. The
 * enquiry route pairs it with a global cap precisely so that getting this
 * exactly right is not the only thing standing between a stranger and the
 * mail quota.
 */
export function getClientIp(request: Request): string {
  const edgeIp = request.headers.get("x-nf-client-connection-ip")?.trim();
  if (edgeIp) return edgeIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean);
    const nearest = hops[hops.length - 1];
    if (nearest) return nearest;
  }

  return request.headers.get("x-real-ip")?.trim() || "anonymous";
}
