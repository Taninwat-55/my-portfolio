import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSortedPostsData } from "../lib/posts";
import { FadeIn } from "../components/FadeIn";

export function Garden() {
  const posts = getSortedPostsData().slice(0, 3);

  return (
    <section
      id="garden"
      className="relative z-10 bg-night-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-20"
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Garden
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p className="text-frost/50 font-light text-center text-sm tracking-widest uppercase mt-4 mb-16 sm:mb-20">
          thoughts on product, coordination, and building
        </p>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post, i) => (
          <FadeIn key={post.slug} delay={i * 0.12} y={30}>
            <Link
              href={`/garden/${post.slug}`}
              className="block h-full rounded-2xl p-6 md:p-7 bg-white/3 border border-frost/10 hover:border-frost/25 hover:scale-[1.01] transition-all duration-200 ease-out"
            >
              <span className="inline-block text-crystal-500 bg-crystal-500/10 rounded-full text-xs uppercase tracking-wider px-3 py-1 mb-3">
                {post.category}
              </span>
              <h3 className="text-frost font-medium text-lg leading-snug mb-2">
                {post.title}
              </h3>
              <p className="text-frost/40 text-xs font-light uppercase tracking-wider mb-3">
                {post.date}
              </p>
              <p className="text-frost/60 text-sm font-light leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3} y={20}>
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            href="/garden"
            className="inline-flex items-center gap-2 text-frost/60 hover:text-frost transition-colors text-sm tracking-wider uppercase"
          >
            All posts
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
