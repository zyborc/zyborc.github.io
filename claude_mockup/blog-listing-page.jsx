import React, { useState, useEffect } from 'react';
import { Terminal, Search, Calendar, Clock, Tag, ArrowUpRight } from 'lucide-react';

export default function BlogListingPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const blogPosts = [
    {
      title: "Dynamic Adaptive Cards in Copilot Studio",
      subtitle: "A Workaround for Unknown Form Fields",
      date: "Mar 8, 2026",
      readTime: "16 min",
      excerpt: "Building intelligent agents often requires handling dynamic, unpredictable data structures. Learn how to create dynamic Adaptive Cards as a workaround for unknown form fields in Copilot Studio.",
      tags: ["Copilot Studio", "Microsoft", "Jira", "Adaptive Cards", "Power Platform"],
      slug: "dynamic-adaptive-cards-copilot-studio"
    },
    {
      title: "Power Apps Code Apps: A Developer's Guide to Getting Started",
      subtitle: "",
      date: "Mar 7, 2026",
      readTime: "10 min",
      excerpt: "Power Apps Code Apps let you build full React+TypeScript applications that run inside the Power Platform with access to Dataverse, Copilot Studio, and Microsoft 365 connectors. Here is what the setup actually looks like.",
      tags: ["Power Apps", "React", "TypeScript", "Vite", "Microsoft 365"],
      slug: "power-apps-code-apps-getting-started"
    },
    {
      title: "Displaying SharePoint Version History in Power Apps",
      subtitle: "",
      date: "Sep 28, 2023",
      readTime: "5 min",
      excerpt: "How to retrieve SharePoint list item version history with the REST API, process it in Power Automate, and display only changed values inside Power Apps.",
      tags: ["SharePoint", "Power Apps", "Power Automate", "Microsoft 365"],
      slug: "displaying-sharepoint-version-history-power-apps"
    },
    {
      title: "Building Enterprise RAG Systems with OpenWebUI",
      subtitle: "Secure Knowledge Retrieval at Scale",
      date: "Jan 15, 2026",
      readTime: "14 min",
      excerpt: "A deep dive into architecting sovereign enterprise AI environments with secure retrieval over internal knowledge bases, embedding pipelines, and production deployment strategies.",
      tags: ["AI", "RAG", "OpenWebUI", "Azure AI Search", "Python"],
      slug: "enterprise-rag-openwebui"
    },
    {
      title: "Integrating Jira with Microsoft Teams via Power Automate",
      subtitle: "",
      date: "Nov 12, 2025",
      readTime: "8 min",
      excerpt: "Step-by-step guide to creating bidirectional sync between Jira issues and Microsoft Teams channels using Power Automate flows and custom connectors.",
      tags: ["Jira", "Microsoft Teams", "Power Automate", "Integration"],
      slug: "jira-teams-power-automate"
    },
    {
      title: "Graph API Best Practices for Power Platform",
      subtitle: "",
      date: "Aug 20, 2025",
      readTime: "12 min",
      excerpt: "Authentication strategies, rate limiting, batch requests, and error handling when working with Microsoft Graph API in Power Apps and Power Automate.",
      tags: ["Graph API", "Power Platform", "Microsoft 365", "Authentication"],
      slug: "graph-api-power-platform-best-practices"
    }
  ];

  // Extract all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))].sort();

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center">
                <Terminal className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="font-mono text-sm text-cyan-400">~/alexander-siedler</div>
                <div className="text-xs text-gray-500 font-mono">collab.ai.platform</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8 font-mono text-sm">
              <a href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">_home</a>
              <a href="/blog" className="text-cyan-400">_blog</a>
              <a href="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">_projects</a>
              <a href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">_about</a>
              <a href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">_contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="font-mono text-sm text-cyan-400 mb-4">// technical_writing</div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Blog
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Notes from delivery, architecture, and platform work. Practical insights from real implementations.
            </p>

            {/* Search */}
            <div className="relative">
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
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="font-mono text-sm text-gray-500">Filter by tag:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                !selectedTag
                  ? 'bg-cyan-500 text-black'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
              }`}
            >
              All posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  selectedTag === tag
                    ? 'bg-cyan-500 text-black'
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
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 font-mono">No posts found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post, idx) => (
                <a
                  key={idx}
                  href={`/blog/${post.slug}`}
                  className="group block"
                  style={{
                    animation: isLoaded ? `slideUp 0.6s ease-out ${0.1 + idx * 0.05}s both` : 'none'
                  }}
                >
                  <article className="relative border border-gray-900 hover:border-gray-800 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
                    {/* Gradient line accent */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-xl" />
                    
                    {/* Date and read time */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h2>

                    {/* Subtitle */}
                    {post.subtitle && (
                      <p className="text-lg text-gray-400 mb-4">{post.subtitle}</p>
                    )}

                    {/* Excerpt */}
                    <p className="text-gray-500 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read more indicator */}
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm group-hover:gap-3 transition-all">
                      <span>Read article</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </article>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
