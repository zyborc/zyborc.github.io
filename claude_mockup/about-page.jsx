import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Briefcase, GraduationCap, Award, Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react';

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const experience = [
    {
      period: "2020 - Present",
      role: "Manager Collaboration Platforms",
      company: "Pfeifer & Langen IT-Solutions KG",
      description: "Leading digital workplace transformation across Microsoft 365, Atlassian, and AI integration initiatives.",
      highlights: [
        "Architected enterprise RAG system with OpenWebUI",
        "Led Power Platform modernization program",
        "Designed Copilot Studio integration frameworks"
      ]
    },
    // Add more experience entries
  ];

  const skills = {
    "Platform Architecture": ["Microsoft 365", "Power Platform", "Atlassian", "SAP Integration"],
    "AI & Automation": ["OpenWebUI", "Azure AI Search", "Copilot Studio", "RAG Systems"],
    "Development": ["React", "TypeScript", "Python", "Power Apps Code Apps"],
    "Leadership": ["Technical Strategy", "Team Management", "Stakeholder Alignment"]
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Grain texture */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Navigation - same as home */}
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
              <a href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">_blog</a>
              <a href="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">_projects</a>
              <a href="/about" className="text-cyan-400">_about</a>
              <a href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">_contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero with Profile Picture */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Profile Picture Column */}
            <div className={`lg:col-span-4 transition-all duration-1000 ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="sticky top-32">
                <div className="relative">
                  {/* Gradient glow behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20" />

                  {/* Image container */}
                  <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-2">
                    <img
                      src="/images/profile/alexander-siedler.jpg"
                      alt="Alexander Siedler"
                      className="w-full aspect-square object-cover rounded-xl"
                    />
                  </div>

                  {/* Status badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-black border border-gray-800 rounded-full px-4 py-2 shadow-xl">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      <span className="text-sm font-mono text-gray-400">Available</span>
                    </div>
                  </div>
                </div>

                {/* Quick facts */}
                <div className="mt-12 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <div className="text-sm font-mono text-gray-500">Location</div>
                      <div className="text-gray-300">Germany</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <div className="text-sm font-mono text-gray-500">Current Role</div>
                      <div className="text-gray-300">Manager Collaboration Platforms</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <div className="text-sm font-mono text-gray-500">Experience</div>
                      <div className="text-gray-300">7+ years in enterprise tech</div>
                    </div>
                  </div>
                </div>

                {/* Social links */}
                <div className="mt-8 flex gap-3">
                  <a href="#" className="flex-1 h-12 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="flex-1 h-12 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="flex-1 h-12 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-8 transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
              <div className="font-mono text-sm text-cyan-400 mb-4">// about_me</div>
              <h1 className="text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                  Alexander Siedler
                </span>
              </h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  I design and deliver modern workplace systems that connect Microsoft 365, Atlassian, SAP,
                  and AI workflows without losing governance or operational clarity.
                </p>

                <p className="text-gray-400 leading-relaxed mb-6">
                  Over the past 7+ years, I've specialized in bridging the gap between enterprise platforms
                  and practical business needs. My work focuses on creating integration architectures that
                  actually work in production—not just on paper.
                </p>

                <p className="text-gray-400 leading-relaxed">
                  Currently, I'm leading the digital workplace transformation at Pfeifer & Langen, where
                  I architect solutions spanning Power Platform, Microsoft 365, and AI-powered automation.
                  Recent projects include deploying enterprise RAG systems, building Copilot Studio integrations,
                  and creating Power Apps Code Apps for complex business workflows.
                </p>
              </div>

              {/* Skills Grid */}
              <div className="mt-16">
                <div className="font-mono text-sm text-cyan-400 mb-6">// technical_expertise</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(skills).map(([category, items], idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-xl p-6"
                    >
                      <h3 className="text-lg font-bold text-white mb-4">{category}</h3>
                      <div className="space-y-2">
                        {items.map((skill, skillIdx) => (
                          <div key={skillIdx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                            <span className="text-gray-400 text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="mt-16">
                <div className="font-mono text-sm text-cyan-400 mb-6">// work_experience</div>
                <div className="space-y-8">
                  {experience.map((job, idx) => (
                    <div key={idx} className="relative pl-8 pb-8 border-l-2 border-gray-900 last:border-l-0 last:pb-0">
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 bg-cyan-400 rounded-full border-4 border-black" />

                      <div className="font-mono text-sm text-gray-500 mb-2">{job.period}</div>
                      <h3 className="text-xl font-bold text-white mb-1">{job.role}</h3>
                      <div className="text-cyan-400 mb-4">{job.company}</div>
                      <p className="text-gray-400 mb-4">{job.description}</p>

                      <div className="space-y-2">
                        {job.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2" />
                            <span className="text-sm text-gray-500">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Let's Work Together</h3>
                <p className="text-gray-400 mb-6">
                  I'm always open to share knowledge on enterprise platform integrations, AI automation,
                  and digital workplace strategy.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-mono text-sm transition-all"
                >
                  <span>Get in touch</span>
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
