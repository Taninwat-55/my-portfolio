import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPostData, type Post } from "../lib/posts";
import { GardenAnimator } from "./GardenAnimator";

// Curated post slugs — chosen to reinforce the case-studies arc:
// - Two case-study companions (Bevisly + Trailr)
// - One product-thinking essay (performance as strategy)
const FEATURED_SLUGS = [
  "bevisly",
  "shipping-at-trailr",
  "speed-as-strategy",
] as const;

export function Garden() {
  const featured = FEATURED_SLUGS.map((slug) => getPostData(slug)).filter(
    (p): p is Post => p !== null
  );

  return (
    <section
      id="garden"
      aria-label="Garden — interactive writing"
      className="relative py-32 md:py-40 border-t border-white/5 overflow-hidden"
    >
      {/* ambient glow, opposite side from previous sections for visual rhythm */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-[-10%] w-[640px] h-[480px] rounded-full bg-ice-700/8 blur-[120px]"
      />

      <div className="relative container mx-auto px-6 max-w-6xl">
        <GardenAnimator>
          {/* Section header */}
          <div className="max-w-2xl mb-16">
            <div className="font-mono text-[11px] tracking-[0.3em] uppercase text-ice-400 mb-5">
              04 / Garden
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] text-zinc-50 mb-5">
              Half engineering log,{" "}
              <span className="bg-gradient-to-r from-ice-200 via-ice-300 to-ice-500 bg-clip-text text-transparent">
                half live experiment.
              </span>
            </h2>
            <p className="text-base md:text-lg text-charcoal-300 leading-relaxed">
              A few pieces I&apos;ve been thinking through — some with interactive
              tools embedded right inside the post. The rest of the bench
              lives in the garden.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* CTA — explore the full garden */}
          <div className="flex justify-center md:justify-start">
            <Button asChild variant="outline" size="lg">
              <Link href="/garden" aria-label="Browse all garden notes">
                Enter the garden
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </GardenAnimator>
      </div>
    </section>
  );
}

// ─── Card ───────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/garden/${post.slug}`}
      aria-label={`Read: ${post.title}`}
      className="group relative flex flex-col h-full p-6 md:p-7 rounded-2xl border border-white/5 bg-charcoal-900/40 backdrop-blur-sm hover:border-ice-400/30 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ice-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-950"
    >
      {/* Top row: tag + exit arrow */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <Badge variant="ice">{post.category}</Badge>
        <span
          aria-hidden
          className="text-charcoal-500 group-hover:text-ice-300 transition-colors"
        >
          <ArrowUpRight size={18} />
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold tracking-tight leading-snug text-zinc-50 group-hover:text-ice-100 transition-colors mb-auto">
        {post.title}
      </h3>

      {/* Footer: read time */}
      <div className="mt-8 pt-5 border-t border-white/5 flex items-center gap-2 text-charcoal-400 font-mono text-[11px] tracking-wider uppercase">
        <Clock size={12} strokeWidth={1.5} />
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
