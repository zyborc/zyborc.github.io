import React, { useState, useEffect } from 'react';
import { Terminal, Calendar, Clock, Share2, Bookmark, ArrowLeft, ArrowUpRight, Code2, Copy, Check } from 'lucide-react';

export default function BlogPostPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const post = {
    title: "Dynamic Adaptive Cards in Copilot Studio",
    subtitle: "A Workaround for Unknown Form Fields",
    date: "Mar 8, 2026",
    readTime: "16 min",
    author: "Alexander Siedler",
    tags: ["Copilot Studio", "Microsoft", "Jira", "Adaptive Cards", "Power Platform"]
  };

  const tableOfContents = [
    { id: "introduction", title: "Introduction" },
    { id: "the-challenge", title: "The Challenge" },
    { id: "solution-architecture", title: "Solution Architecture" },
    { id: "implementation", title: "Implementation" },
    { id: "code-examples", title: "Code Examples" },
    { id: "conclusion", title: "Conclusion" }
  ];

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const exampleCode = `// Dynamic Adaptive Card generation
const generateAdaptiveCard = (fields) => {
  const body = fields.map(field => ({
    type: "Input.Text",
    id: field.id,
    label: field.label,
    placeholder: field.placeholder,
    isRequired: field.required
  }));

  return {
    type: "AdaptiveCard",
    version: "1.5",
    body: body
  };
};`;

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

      {/* Article Header */}
      <article className="pt-32 pb-20">
        {/* Back button */}
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <a href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blog</span>
          </a>
        </div>

        {/* Hero */}
        <header className="max-w-4xl mx-auto px-6 mb-16">
          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            {/* Meta */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 font-mono">
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
            <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-2xl text-gray-400 mb-8">{post.subtitle}</p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-mono text-cyan-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-8 border-t border-gray-900">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-all font-mono text-sm">
                <Bookmark className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of Contents - Sticky */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <div className="font-mono text-sm text-cyan-400 mb-4">// contents</div>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm py-1 border-l-2 pl-4 transition-all ${
                        activeSection === item.id
                          ? 'border-cyan-400 text-cyan-400'
                          : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <div className="prose prose-invert prose-lg max-w-none">
                {/* Introduction */}
                <section id="introduction" className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded" />
                    Introduction
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Building intelligent agents in Copilot Studio often requires handling dynamic, unpredictable data structures. 
                    Traditional form approaches break down when you don't know the fields in advance. This article explores a 
                    practical workaround using dynamic Adaptive Card generation.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    We'll walk through a real-world scenario: integrating Jira with Copilot Studio where issue types have 
                    custom fields that vary by project and configuration.
                  </p>
                </section>

                {/* The Challenge */}
                <section id="the-challenge" className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded" />
                    The Challenge
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    When building forms in Copilot Studio, you typically define fields statically. But what happens when:
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5" />
                      <span>Different Jira projects have different custom fields</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5" />
                      <span>Field configurations change without code updates</span>
                    </li>
                    <li className="flex items-start gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5" />
                      <span>You need to support hundreds of field variations</span>
                    </li>
                  </ul>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="text-yellow-400 font-mono text-sm mt-1">⚠️</div>
                      <div>
                        <div className="text-yellow-400 font-bold mb-2">The Problem</div>
                        <p className="text-gray-300 text-sm">
                          Static form definitions can't handle dynamic schemas. You'd need to create separate 
                          topics for each variation—completely unmaintainable at scale.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Solution Architecture */}
                <section id="solution-architecture" className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded" />
                    Solution Architecture
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    The solution leverages Adaptive Cards' flexibility combined with Power Automate's processing capabilities:
                  </p>
                  <div className="bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-xl p-8 mb-6">
                    <div className="space-y-4 font-mono text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded flex items-center justify-center text-cyan-400">1</div>
                        <span className="text-gray-300">User requests form in Copilot Studio</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded flex items-center justify-center text-cyan-400">2</div>
                        <span className="text-gray-300">Power Automate fetches field metadata from API</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded flex items-center justify-center text-cyan-400">3</div>
                        <span className="text-gray-300">Generate Adaptive Card JSON dynamically</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded flex items-center justify-center text-cyan-400">4</div>
                        <span className="text-gray-300">Return card to Copilot Studio for display</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/20 rounded flex items-center justify-center text-cyan-400">5</div>
                        <span className="text-gray-300">Process submitted values back to source system</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Code Examples */}
                <section id="code-examples" className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded" />
                    Code Examples
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Here's how to generate an Adaptive Card dynamically in JavaScript/TypeScript:
                  </p>
                  
                  {/* Code block */}
                  <div className="relative group mb-8">
                    <div className="absolute top-0 right-0 p-4">
                      <button
                        onClick={() => copyToClipboard(exampleCode, 'code-1')}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-gray-800 hover:border-cyan-500 rounded-lg text-gray-400 hover:text-cyan-400 transition-all text-sm"
                      >
                        {copiedCode === 'code-1' ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-950 border border-gray-900 rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-800">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span className="font-mono text-xs text-gray-500">adaptive-card-generator.js</span>
                      </div>
                      <pre className="p-6 overflow-x-auto">
                        <code className="font-mono text-sm text-gray-300">
                          {exampleCode}
                        </code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <div className="text-cyan-400 font-mono text-sm mt-1">💡</div>
                      <div>
                        <div className="text-cyan-400 font-bold mb-2">Pro Tip</div>
                        <p className="text-gray-300 text-sm">
                          Cache field metadata to avoid repeated API calls. Update the cache when field 
                          configurations change in your source system.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Conclusion */}
                <section id="conclusion" className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded" />
                    Conclusion
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Dynamic Adaptive Cards provide a powerful workaround for handling unknown form fields in Copilot Studio. 
                    While this approach requires more setup than static forms, it scales beautifully across varying schemas.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    This pattern works for any scenario where form fields are determined at runtime: CRM systems, ticketing 
                    platforms, dynamic workflows, and more.
                  </p>
                </section>

                {/* Related Posts */}
                <div className="mt-20 pt-12 border-t border-gray-900">
                  <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a href="#" className="group block bg-gradient-to-br from-gray-950 to-black border border-gray-900 hover:border-gray-800 rounded-xl p-6 transition-all">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        Power Apps Code Apps Guide
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">Building React apps in Power Platform</p>
                      <div className="flex items-center gap-2 text-cyan-400 text-sm">
                        <span>Read more</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                    <a href="#" className="group block bg-gradient-to-br from-gray-950 to-black border border-gray-900 hover:border-gray-800 rounded-xl p-6 transition-all">
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        Enterprise RAG Systems
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">Secure AI with OpenWebUI</p>
                      <div className="flex items-center gap-2 text-cyan-400 text-sm">
                        <span>Read more</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
