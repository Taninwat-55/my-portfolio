/**
 * Best-effort caller identity for rate limiting.
 *
 * Netlify — and every proxy in front of it — sets x-forwarded-for as a
 * comma-separated chain where the first entry is the original client. A caller
 * can forge the header, so this is a throttling key and never an authentication
 * one.
 *
 * The `||` chain is load-bearing. The previous inline version used `??`, which
 * meant a present-but-blank x-forwarded-for produced "" — not nullish, so the
 * fallbacks never ran and every such caller shared a single rate-limit bucket.
 *
 * Typed against Request rather than NextRequest so both route handlers can pass
 * whichever they already have (NextRequest extends Request).
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;

  return request.headers.get("x-real-ip")?.trim() || "anonymous";
}
