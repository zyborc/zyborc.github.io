import { useMemo, useState } from 'react';
import BlogCard from '../components/BlogCard';
import SEOHead from '../components/SEOHead';
import { useBlogPosts } from '../hooks/useBlogPosts';

const BlogList = () => {
  const posts = useBlogPosts();
  const tags = useMemo(() => [...new Set(posts.flatMap((post) => post.tags))], [posts]);
  const [activeTag, setActiveTag] = useState<string>('All');
  const filteredPosts = activeTag === 'All' ? posts : posts.filter((post) => post.tags.includes(activeTag));

  return (
    <section className="section">
      <SEOHead title="Blog | Alexander Siedler" description="Writing on AI, collaboration, and process automation." />
      <div className="shell section__header">
        <div>
          <p className="eyebrow">Blog</p>
          <h1>Writing about enterprise AI, collaboration, and delivery.</h1>
        </div>
      </div>
      <div className="shell filter-row">
        {['All', ...tags].map((tag) => (
          <button
            key={tag}
            type="button"
            className={`filter-chip${activeTag === tag ? ' filter-chip--active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="shell card-grid">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
