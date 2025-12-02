import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const posts = [
  {
    slug: 'portfolio-redesign',
    title: 'From Code to Product: Redesigning My Portfolio',
    date: 'December 2, 2025',
    category: 'Case Study',
    excerpt: 'How I pivoted my personal brand from "Crypto Enthusiast" to "Product Engineer" using Next.js and a user-centric design approach.',
  },
];

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tighter">
            TK<span className="text-orange-500">.</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Writing</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
          Thoughts on frontend engineering, product strategy, and the intersection of business and technology.
        </p>

        <div className="space-y-12">
          {posts.map((post) => (
            <article key={post.slug} className="group cursor-pointer">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
                  <h2 className="text-2xl font-bold group-hover:text-orange-500 transition-colors">
                    {post.title}
                  </h2>
                  <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">
                    {post.date}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-500">
                    {post.category}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-4 text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Read Article &rarr;
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}