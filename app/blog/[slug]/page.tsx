import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { notFound } from 'next/navigation';

// Mock Data Source
const posts: Record<string, { 
  title: string; 
  date: string; 
  category: string; 
  author: string;
  readTime: string;
  content: React.ReactNode 
}> = {
  'portfolio-redesign': {
    title: 'From Code to Product: Why I Killed My "Cool" Portfolio',
    date: 'December 2, 2025',
    category: 'Case Study',
    author: 'Taninwat Kaewpankan',
    readTime: '6 min read',
    content: (
      <>
        <p className="mb-8 font-medium text-xl text-zinc-500 dark:text-zinc-400">
          In product management, we often talk about "Product-Market Fit." But we rarely apply that same rigorous lens to our own careers. Here is how I treated my portfolio as a product, identified a churn problem, and pivoted for better conversion.
        </p>

        <h3 className="text-2xl font-bold mb-4 mt-12 text-zinc-900 dark:text-zinc-100">The "Genesis Block" Problem</h3>
        <p className="mb-6">
          My previous portfolio was technically impressive. It featured 3D interactive elements, a horizontal scroll system inspired by blockchain ledgers, and a heavy "Hacker/Crypto" aesthetic. It was cool. It was unique.
        </p>
        <p className="mb-6">
          <strong>But it had a fatal UX flaw:</strong> It prioritized "novelty" over "clarity."
        </p>
        <p className="mb-6">
          When I analyzed the user journey of a recruiter or a hiring manager, I realized they aren't looking for hidden easter eggs. They have about 30 seconds to answer three questions:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-8 marker:text-orange-500">
          <li>Can this person build scalable software?</li>
          <li>Do they understand business value?</li>
          <li>Are they professional enough to put in front of stakeholders?</li>
        </ul>

        <h3 className="text-2xl font-bold mb-4 mt-12 text-zinc-900 dark:text-zinc-100">The Pivot: FinTech Minimalism</h3>
        <p className="mb-6">
          I decided to refactor my personal brand. I moved away from the "Crypto Anarchist" vibe toward a "Product Engineer" aesthetic—clean, typographic, and data-driven. Think Stripe, Vercel, or Linear.
        </p>
        <div className="bg-zinc-100 dark:bg-zinc-900 border-l-4 border-orange-500 p-6 my-8 rounded-r-lg italic">
          "Good design is obvious. Great design is transparent. I wanted my portfolio to get out of the way and let the work speak for itself."
        </div>

        <h3 className="text-2xl font-bold mb-4 mt-12 text-zinc-900 dark:text-zinc-100">Technical Decisions & Trade-offs</h3>
        <p className="mb-6">
          Migrating from a client-side Vite app to <strong>Next.js 14</strong> wasn't just a trend-chasing move; it was a performance optimization strategy.
        </p>
        <ul className="space-y-4 mb-8">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></span>
            <span>
              <strong>SEO & Discovery:</strong> Moving to Server Side Rendering (SSR) ensures that search crawlers can index my case studies effectively.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></span>
            <span>
              <strong>Accessibility (a11y):</strong> I replaced the custom horizontal scroll hijacking with standard vertical scrolling. This respects user agency and native browser behaviors.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-500 mt-2.5"></span>
            <span>
              <strong>Performance:</strong> By removing heavy 3D libraries (Three.js), I reduced the First Contentful Paint (FCP) significantly, respecting the user's data and battery life.
            </span>
          </li>
        </ul>

        <h3 className="text-2xl font-bold mb-4 mt-12 text-zinc-900 dark:text-zinc-100">Conclusion</h3>
        <p className="mb-6">
          This redesign represents who I am today: A developer who can write complex code, but a Product Manager who knows when <em>not</em> to. It bridges the gap between my Economics background and my Frontend expertise.
        </p>
        <p>
          Welcome to v2.0. Let's build something that matters.
        </p>
      </>
    ),
  },
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts[resolvedParams.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/blog" className="font-bold text-xl tracking-tighter">
            TK<span className="text-orange-500">.</span>
          </Link>
          <Link href="/blog" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </nav>

      <article className="container mx-auto px-6 pt-32 pb-24 max-w-3xl">
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-zinc-900 dark:text-white">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                 {/* Fallback avatar if image fails or generic icon */}
                 <User size={16} /> 
              </div>
              <span className="font-medium text-zinc-900 dark:text-zinc-200">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}