"use client";

import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { useMode } from "../components/ModeContext";

export type FeaturedPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
};

/**
 * Picks which featured posts to show based on the active mode. Both sets are
 * resolved server-side (the parent reads MDX via fs) and passed in here, so the
 * filesystem stays on the server while the choice stays reactive on the client.
 */
export function GardenFeatured({
  pm,
  dev,
}: {
  pm: FeaturedPost[];
  dev: FeaturedPost[];
}) {
  const mode = useMode();
  const posts = mode === "pm" ? pm : dev;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: FeaturedPost }) {
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
