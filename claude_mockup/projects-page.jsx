import React, { useState, useEffect } from 'react';
import { Terminal, Code2, ExternalLink, Github, Calendar, Users, Layers, ArrowUpRight, Filter } from 'lucide-react';

export default function ProjectsPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const projects = [
    {
      title: "Enterprise AI (OpenWebUI & RAG)",
      period: "10.2024 – Present",
      status: "Active",
      role: "IT Project Manager & Developer",
      description: "Sovereign enterprise AI environment with secure retrieval over internal SharePoint knowledge, Python-based chunking and embedding pipelines, Azure Prompt Flow integration.",
      tags: ["Azure AI Search", "Python", "Docker", "PostgreSQL", "RAG"],
      category: "AI & Automation",
      image: "project-ai.jpg",
      metrics: {
        users: "500+",
        queries: "10k+/month",
        accuracy: "94%"
      }
    },
    {
      title: "Power Apps Code Apps Framework",
      period: "03.2026 – Present",
      status: "Active",
      role: "Lead Developer",
      description: "Full React+TypeScript applications running inside Power Platform with access to Dataverse, Copilot Studio, and Microsoft 365 connectors.",
      tags: ["React", "TypeScript", "Vite", "Power Platform", "Dataverse"],
      category: "Platform Development",
      image: "project-code-apps.jpg",
      metrics: {
        apps: "12",
        developers: "8",
        deployments: "45+"
      }
    },
    {
      title: "Copilot Studio Integration Hub",
      period: "01.2026 – Present",
      status: "Active",
      role: "Solution Architect",
      description: "Unified integration framework connecting Copilot Studio with Jira, SharePoint, SAP, and custom business systems via dynamic Adaptive Cards.",
      tags: ["Copilot Studio", "Adaptive Cards", "Jira", "SharePoint", "Microsoft 365"],
      category: "Integration",
      image: "project-copilot.jpg",
      metrics: {
        integrations: "15",
        automation: "80%",
        time_saved: "120h/month"
      }
    },
    {
      title: "SharePoint Governance Platform",
      period: "2023 – 2024",
      status: "Completed",
      role: "Technical Lead",
      description: "Automated governance and compliance framework for SharePoint Online with version control, audit trails, and automated policy enforcement.",
      tags: ["SharePoint", "Power Automate", "Graph API", "Compliance"],
      category: "Governance",
      image: "project-sharepoint.jpg",
      metrics: {
        sites: "200+",
        policies: "30+",
        compliance: "100%"
      }
    },
    {
      title: "Atlassian-M365 Sync Engine",
      period: "2022 – 2023",
      status: "Completed",
      role: "Integration Architect",
      description: "Bidirectional synchronization between Jira/Confluence and Microsoft 365 (Teams, Planner, SharePoint) with conflict resolution.",
      tags: ["Jira", "Confluence", "Microsoft 365", "Node.js", "Azure Functions"],
      category: "Integration",
      image: "project-atlassian.jpg",
      metrics: {
        sync_items: "50k+",
        uptime: "99.8%",
        teams: "25"
      }
    },
    {
      title: "SAP Integration Layer",
      period: "2021 – 2022",
      status: "Completed",
      role: "Senior Developer",
      description: "REST API layer enabling Power Platform and custom applications to interact with SAP business processes and data.",
      tags: ["SAP", "REST API", "Power Platform", "C#", ".NET"],
      category: "Integration",
      image: "project-sap.jpg",
      metrics: {
        endpoints: "40+",
        requests: "100k+/day",
        systems: "3"
      }
    }
  ];

  const categories = ['all', 'AI & Automation', 'Platform Development', 'Integration', 'Governance'];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

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
              <a href="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors">_blog</a>
              <a href="/projects" className="text-cyan-400">_projects</a>
              <a href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">_about</a>
              <a href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">_contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="font-mono text-sm text-cyan-400 mb-4">// portfolio</div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Projects & Work
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl">
              Enterprise platforms, AI systems, and integration architectures I've designed and delivered.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-gray-500">
              <Filter className="w-4 h-4" />
              <span className="font-mono text-sm">Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                  selectedFilter === category
                    ? 'bg-cyan-500 text-black'
                    : 'bg-gray-900 border border-gray-800 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  animation: isLoaded ? `slideUp 0.8s ease-out ${0.2 + idx * 0.1}s both` : 'none'
                }}
              >
                <div className="h-full bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-2xl overflow-hidden hover:border-gray-800 transition-all duration-300">
                  {/* Project Image/Placeholder */}
                  <div className="relative h-48 bg-gray-900 border-b border-gray-800">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Layers className="w-16 h-16 text-gray-800" />
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${
                        project.status === 'Active' 
                          ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                          : 'bg-gray-800/80 border border-gray-700 text-gray-400'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'Active' ? 'bg-emerald-400' : 'bg-gray-500'}`} />
                        <span>{project.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="font-mono text-xs text-gray-500 mb-2">{project.period}</div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <div className="text-sm text-cyan-400 mb-4">{project.role}</div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-900">
                      {Object.entries(project.metrics).map(([key, value], mIdx) => (
                        <div key={mIdx}>
                          <div className="text-2xl font-bold text-cyan-400">{value}</div>
                          <div className="text-xs text-gray-500 font-mono capitalize">{key.replace('_', ' ')}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <a 
                        href="#" 
                        className="flex-1 flex items-center justify-center gap-2 bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-400 px-4 py-2 rounded-lg font-mono text-sm transition-all"
                      >
                        <span>View details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <button className="w-10 h-10 border border-gray-800 hover:border-cyan-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all">
                        <Github className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
