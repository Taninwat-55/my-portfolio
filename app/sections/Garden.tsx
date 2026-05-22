import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { getPostData, type Post } from "../lib/posts";
import { GardenAnimator } from "./GardenAnimator";

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
      aria-label="Garden — writing"
      className="relative py-24 md:py-32 border-t border-border bg-sand-200"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <GardenAnimator>
          {/* Header */}
          <div className="max-w-xl mb-14">
            <p className="text-sm font-medium text-clay-500 tracking-widest uppercase mb-5">
              Garden
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-ink-900 mb-4">
              Things I&apos;ve been thinking through.
            </h2>
            <p className="text-base text-ink-500 leading-relaxed">
              A few pieces on building, shipping, and the decisions in between. Some have interactive tools embedded inside.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* CTA */}
          <div>
            <Link
              href="/garden"
              aria-label="Browse all garden notes"
              className="inline-flex items-center gap-2 text-sm font-medium text-clay-500 hover:text-clay-600 transition-colors group"
            >
              Browse all
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </GardenAnimator>
      </div>
    </section>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/garden/${post.slug}`}
      aria-label={`Read: ${post.title}`}
      className="group flex flex-col h-full p-6 rounded-xl border border-border bg-sand-50 hover:border-clay-300 transition-colors"
    >
      <div className="flex items-start justify-between gap-3 mb-5">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-clay-100 text-clay-600">
          {post.category}
        </span>
        <span aria-hidden className="text-ink-300 group-hover:text-clay-500 transition-colors">
          <ArrowUpRight size={16} />
        </span>
      </div>

      <h3 className="text-base font-semibold leading-snug text-ink-900 group-hover:text-clay-600 transition-colors mb-auto">
        {post.title}
      </h3>

      <div className="mt-6 pt-5 border-t border-border flex items-center gap-2 text-ink-300 text-xs">
        <Clock size={11} strokeWidth={1.5} />
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
