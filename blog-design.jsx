import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Zap, Clock, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';

export default function TechBlog() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const blogPosts = [
    {
      title: "Dynamic Adaptive Cards in Copilot Studio",
      subtitle: "A Workaround for Unknown Form Fields",
      date: "Mar 8, 2026",
      readTime: "16 min",
      tags: ["Copilot Studio", "Microsoft", "Jira", "Adaptive Cards"],
      color: "from-emerald-400 to-teal-500"
    },
    {
      title: "Power Apps Code Apps",
      subtitle: "A Developer's Guide to Getting Started",
      date: "Mar 7, 2026",
      readTime: "10 min",
      tags: ["Power Apps", "React", "TypeScript", "Vite"],
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "SharePoint Version History in Power Apps",
      subtitle: "Displaying Changed Values with REST API",
      date: "Sep 28, 2023",
      readTime: "5 min",
      tags: ["SharePoint", "Power Apps", "Power Automate"],
      color: "from-purple-400 to-pink-500"
    }
  ];

  const featuredProject = {
    title: "Enterprise AI (OpenWebUI & RAG)",
    description: "An internal ChatGPT alternative with secure RAG architecture for company knowledge.",
    period: "10.2024 – Present",
    role: "IT Project Manager & Developer",
    tags: ["Azure AI Search", "Python", "Docker", "PostgreSQL"]
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-x-hidden">
      {/* Animated gradient mesh background */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.15), transparent 50%)`
        }}
      />

      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
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
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">_blog</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">_projects</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">_about</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">_contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left column - Text */}
            <div className={`lg:col-span-7 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-cyan-400">always open to share know</span>
                </div>
              </div>

              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Building the
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  AI-powered
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  workplace
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl leading-relaxed">
                I architect integration systems connecting <span className="text-cyan-400 font-mono">Microsoft 365</span>,
                <span className="text-blue-400 font-mono"> Atlassian</span>,
                <span className="text-purple-400 font-mono"> SAP</span>, and
                <span className="text-emerald-400 font-mono"> AI workflows</span> —
                maintaining governance without sacrificing velocity.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#" className="group inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-mono text-sm transition-all">
                  <span>Read latest posts</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a href="#" className="inline-flex items-center gap-2 border border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 px-6 py-3 rounded-lg font-mono text-sm transition-all">
                  <span>View projects</span>
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-12">
                <a href="#" className="w-10 h-10 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right column - Visual element */}
            <div className={`lg:col-span-5 transition-all duration-1000 delay-500 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
              <div className="relative">
                {/* Terminal window mockup */}
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="ml-4 font-mono text-xs text-gray-500">~/current-focus.sh</div>
                  </div>
                  <div className="p-6 font-mono text-sm space-y-2">
                    <div className="text-gray-500">$ ./current-focus.sh</div>
                    <div className="text-emerald-400">✓ Power Platform architecture</div>
                    <div className="text-cyan-400">→ Copilot Studio integrations</div>
                    <div className="text-blue-400">◆ Enterprise RAG systems</div>
                    <div className="text-purple-400">⚡ AI workflow automation</div>
                    <div className="text-gray-500 mt-4">
                      <span className="text-cyan-400">manager@collaboration</span>
                      <span className="text-gray-600">:</span>
                      <span className="text-blue-400">~/pfeifer-langen</span>
                      <span className="text-gray-400">$</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>

                {/* Floating accent elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl opacity-20 blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl opacity-20 blur-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Writing Section */}
      <section className="py-20 px-6 border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="font-mono text-sm text-cyan-400 mb-2">// latest_writing</div>
              <h2 className="text-4xl font-bold text-white">Recent Posts</h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-mono text-sm transition-colors">
              <span>View all</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {blogPosts.map((post, idx) => (
              <a
                key={idx}
                href="#"
                className="group block"
                style={{
                  animation: isLoaded ? `slideUp 0.8s ease-out ${0.6 + idx * 0.1}s both` : 'none'
                }}
              >
                <div className="relative border border-gray-900 hover:border-gray-800 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
                  {/* Gradient line accent */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${post.color} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-xl`} />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Date column */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="text-xs text-gray-600 font-mono mt-1">{post.readTime} read</div>
                    </div>

                    {/* Content column */}
                    <div className="lg:col-span-8">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{post.subtitle}</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow column */}
                    <div className="lg:col-span-2 flex justify-end">
                      <div className="w-12 h-12 rounded-full border border-gray-800 group-hover:border-cyan-500 flex items-center justify-center transition-all">
                        <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm text-cyan-400 mb-2">// featured_project</div>
          <h2 className="text-4xl font-bold text-white mb-12">Current Focus</h2>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-mono text-emerald-400">{featuredProject.period}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4">{featuredProject.title}</h3>
                  <div className="text-sm font-mono text-gray-500 mb-6">{featuredProject.role}</div>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    {featuredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-mono text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href="#" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors">
                    <span>View project details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-full h-64 bg-gray-950 border border-gray-800 rounded-xl flex items-center justify-center">
                    <Code2 className="w-24 h-24 text-gray-800" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="font-mono text-sm text-cyan-400 mb-4">_contact</div>
              <a href="mailto:alex.siedler@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                alex.siedler@gmail.com
              </a>
            </div>
            <div>
              <div className="font-mono text-sm text-cyan-400 mb-4">_location</div>
              <p className="text-gray-400">Pfeifer & Langen IT-Solutions</p>
              <p className="text-gray-500 text-sm">Manager Collaboration Platforms</p>
            </div>
            <div>
              <div className="font-mono text-sm text-cyan-400 mb-4">_built_with</div>
              <p className="text-gray-400 text-sm">React × TypeScript × Tailwind</p>
              <p className="text-gray-500 text-xs mt-2">Designed for the modern web</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-900 text-center">
            <p className="text-gray-600 font-mono text-sm">
              © 2026 Alexander Siedler ·
              <span className="text-cyan-400/50"> Crafting digital experiences</span>
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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
