import Link from 'next/link';
import { ArrowLeft, Search, Clock } from 'lucide-react';
import { getSortedPostsData } from '../lib/posts'; // Import our new "API"

export default function BlogIndex() {
  const allPosts = getSortedPostsData(); // Fetch real posts from files!

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-orange-500/30">
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

      <main className="container mx-auto px-6 pt-32 pb-20 max-w-5xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Blog</h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Exploring the intersection of frontend engineering, product strategy, and business value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allPosts.map((post) => (
            <article 
              key={post.slug} 
              className="group cursor-pointer flex flex-col h-full bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-orange-500/50 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock size={12} />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800/50 mt-auto">
                  <span className="text-xs font-mono text-zinc-400">{post.date}</span>
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-500 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowLeft className="rotate-180" size={16} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}