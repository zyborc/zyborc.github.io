import { useMemo, useState } from 'react';
import BlogCard from '../components/BlogCard';
import SEOHead from '../components/SEOHead';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { Search, Tag } from 'lucide-react';

const BlogList = () => {
  const posts = useBlogPosts();
  const tags = useMemo(() => [...new Set(posts.flatMap((post) => post.tags))].sort(), [posts]);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = !activeTag || post.tags.includes(activeTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <SEOHead title="Blog | Alexander Siedler" description="Writing on AI, collaboration, and process automation." />
      
      {/* Hero */}
      <section className="pt-16 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-slide-up">
            <div className="font-mono text-sm text-cyan-400 mb-4">// technical_writing</div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
              Notes from delivery, architecture, and platform work. Practical insights from real implementations.
            </p>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search posts by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-950 border border-gray-900 rounded-lg pl-12 pr-4 py-4 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="py-8 px-6 bg-black/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="font-mono text-sm text-gray-500">Filter by tag:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                !activeTag
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
              }`}
            >
              All posts
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  activeTag === tag
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                    : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-gray-800 rounded-2xl">
              <div className="font-mono text-sm text-gray-500 mb-2">// null_result</div>
              <h3 className="text-xl text-gray-400">No posts found matching your criteria.</h3>
              <button 
                  onClick={() => {setActiveTag(null); setSearchQuery('');}}
                  className="mt-6 px-4 py-2 border border-gray-800 bg-gray-900 text-gray-300 rounded hover:border-cyan-500 hover:text-cyan-400 transition-colors font-mono text-sm"
                >
                  Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogList;
