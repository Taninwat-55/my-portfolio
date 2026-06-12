import { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { getPostData, getSortedPostsData } from "../../lib/posts";
import { Navbar } from "../../components/Navbar";
import { SkipLink } from "../../components/SkipLink";
import { SatsConverter } from "../../components/post-tools/SatsConverter";

// ─── Static params + metadata ──────────────────────────────────────────────

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) return { title: "Post Not Found" };

  const url = `https://taninwatkaewpankan.xyz/garden/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ─── MDX components map ─────────────────────────────────────────────────────
// Built-in markdown elements get site-themed styling here. JSX components
// embedded directly inside .mdx posts (like <SatsConverter />) are also
// resolved through this map.

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl md:text-3xl font-medium tracking-tight text-frost mt-16 mb-5 scroll-mt-24"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl md:text-2xl font-medium tracking-tight text-frost mt-12 mb-4 scroll-mt-24"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-medium text-frost mt-10 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-[17px] md:text-[18px] text-frost/75 font-light leading-[1.75] mb-7"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-6 space-y-3 mb-8 marker:text-clay-500 text-frost/75 font-light text-[17px] md:text-[18px] leading-[1.7]"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 space-y-3 mb-8 marker:text-clay-500 text-frost/75 font-light text-[17px] md:text-[18px] leading-[1.7]"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="pl-1" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium text-frost" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-frost/80 italic" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 pl-5 border-l-2 border-clay-500/60 bg-clay-500/5 py-3 pr-4 rounded-r-md text-frost/70 italic [&>p]:text-frost/70 [&>p]:mb-0"
      {...props}
    />
  ),
  a: ({ href, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-clay-300 underline decoration-clay-500/40 underline-offset-4 hover:decoration-clay-500 hover:text-clay-500 transition-colors"
        {...rest}
      />
    );
  },
  code: ({
    className,
    children,
    ...rest
  }: React.HTMLAttributes<HTMLElement> & { className?: string }) => {
    const isInline = !className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-white/6 border border-frost/10 text-clay-300"
          {...rest}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-8 p-5 rounded-xl bg-night-800 border border-frost/10 overflow-x-auto font-mono text-sm leading-relaxed text-frost"
      {...props}
    />
  ),
  hr: () => <hr className="my-14 border-0 h-px bg-frost/10" />,
  img: ({ alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ""}
      className="my-8 w-full rounded-xl border border-frost/10"
      {...rest}
    />
  ),

  // ── Garden tools — embeddable inside any post ────────────────────────────
  SatsConverter,
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function GardenPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://taninwatkaewpankan.xyz",
    },
    datePublished: post.date,
    publisher: {
      "@type": "Person",
      name: "Taninwat Kaewpankan",
      url: "https://taninwatkaewpankan.xyz",
    },
  };

  return (
    <div className="min-h-screen bg-night-900 text-frost">
      <SkipLink />
      <Navbar backLinkHref="/garden" backLinkText="Back to the Garden" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <main id="main-content" className="relative">
        <article className="relative container mx-auto px-6 pt-32 md:pt-40 pb-24 max-w-3xl">
          {/* ── Header ─────────────────────────────────────────────── */}
          <header className="mb-14 md:mb-20">
            <div className="mb-6">
              <span className="inline-block text-clay-500 bg-clay-500/10 rounded-full text-xs uppercase tracking-wider px-3 py-1">
                {post.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-[1.05] tracking-tight text-frost">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-frost/70 font-light leading-relaxed mb-10 max-w-2xl">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 border-t border-frost/10 text-[11px] tracking-wider uppercase text-frost/40">
              <span className="text-clay-500">{post.author}</span>
              <span className="inline-flex items-center gap-2">
                <Calendar size={12} strokeWidth={1.5} />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={12} strokeWidth={1.5} />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* ── Body (MDX) ─────────────────────────────────────────── */}
          <div className="article-body">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }}
            />
          </div>

          {/* ── Footer ─────────────────────────────────────────────── */}
          <footer className="mt-20 pt-10 border-t border-frost/10 flex items-center justify-between gap-4 flex-wrap">
            <Link
              href="/garden"
              className="group inline-flex items-center gap-2 text-sm font-medium text-frost/70 hover:text-clay-300 transition-colors"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to the Garden
            </Link>

            <Link
              href="/"
              className="text-sm uppercase tracking-wider text-frost/40 hover:text-clay-300 transition-colors"
            >
              taninwatkaewpankan.xyz
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
