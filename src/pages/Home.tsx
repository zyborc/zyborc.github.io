import { ArrowUpRight, Github, Linkedin, Mail, Code2, Zap, Clock } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { personal } from '../data/personal';
import { projects } from '../data/projects';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { Link } from 'react-router-dom';

const Home = () => {
  const posts = useBlogPosts().slice(0, 3);
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <>
      <SEOHead title={`${personal.name} | Blog & Portfolio`} description={personal.tagline} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left column - Text */}
            <div className="lg:col-span-7 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="inline-block mb-6">
                <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-cyan-400">always open to share knowledge</span>
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
                <Link to="/blog" className="group inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-mono text-sm transition-all">
                  <span>Read latest posts</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
                <Link to="/projects" className="inline-flex items-center gap-2 border border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400 px-6 py-3 rounded-lg font-mono text-sm transition-all">
                  <span>View projects</span>
                </Link>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 mt-12">
                <a href={personal.github} target="_blank" rel="noreferrer" className="w-10 h-10 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                  <Github className="w-5 h-5" />
                </a>
                <a href={personal.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={`mailto:${personal.email}`} className="w-10 h-10 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right column - Visual element */}
            <div className="lg:col-span-5 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="relative">
                {/* Terminal window mockup */}
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-2xl relative z-10">
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
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-cyan-500/20 rounded-2xl blur-2xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-2xl blur-2xl" />
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
            <Link to="/blog" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-cyan-400 font-mono text-sm transition-colors">
              <span>View all</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {posts.map((post, idx) => {
              const defaultColor = idx % 2 === 0 ? "from-emerald-400 to-teal-500" : "from-blue-400 to-cyan-500";
              const tagArray = post.tags ? post.tags : [];
              return (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block animate-slide-up"
                  style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
                >
                  <div className="relative border border-gray-900 hover:border-gray-800 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5">
                    {/* Gradient line accent */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${defaultColor} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-xl`} />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      {/* Date column */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 text-gray-500 font-mono text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        {post.readingTimeMinutes && <div className="text-xs text-gray-600 font-mono mt-1">{post.readingTimeMinutes} min read</div>}
                      </div>

                      {/* Content column */}
                      <div className="lg:col-span-8">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h3>
                        {post.summary && <p className="text-gray-400 mb-4">{post.summary}</p>}
                        <div className="flex flex-wrap gap-2">
                          {tagArray.map((tag: string, tagIdx: number) => (
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
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm text-cyan-400 mb-2">// featured_project</div>
          <h2 className="text-4xl font-bold text-white mb-12">Current Focus</h2>

          <div className="relative">
            <div className="absolute inset-0 bg-transparent lg:bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-mono text-emerald-400">Featured</span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4">{featuredProject.title}</h3>
                  <div className="text-sm font-mono text-gray-500 mb-6">{featuredProject.period}</div>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">
                    {featuredProject.fullDescription || featuredProject.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(featuredProject.technologies || []).map((tag: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-sm font-mono text-cyan-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to={`/projects/${featuredProject.id}`} className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm transition-colors">
                    <span>View project details</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
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
    </>
  );
};

export default Home;
