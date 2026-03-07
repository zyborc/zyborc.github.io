import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, PORTFOLIO_GROUPS } from '../constants';

const Projects: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Strategic Portfolio
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Thematic grouping of my work as a Strategic Manager and Technical Innovator, focusing on AI-driven transformation and digital ecosystems.
        </p>
      </div>

      {/* AI Transformation Focus Banner */}
      <section className="mb-24 p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <span className="inline-flex items-center gap-2 py-1 px-3 bg-blue-500/20 text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/30">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
              Core Innovation Focus
            </span>
            <h2 className="text-3xl font-bold mb-6">AI & Automation Transformation</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Leading the shift towards intelligent workflows. My current work centers on leveraging Large Language Models (LLMs) and advanced automation to redefine corporate productivity.
            </p>
            <div className="flex flex-wrap gap-2">
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300">Azure OpenAI</span>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300">RAG Architecture</span>
               <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-300">Copilot Agents</span>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 hover:border-blue-500/40 transition-all group">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-blue-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-sm mb-3">Enterprise AI</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Developing secure, localized LLM systems to unlock massive internal knowledge silos using Azure AI Search and RAG architecture.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 hover:border-blue-500/40 transition-all group">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-indigo-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.67 2.67 0 0 0 21 17.25l-5.83-5.83M11.42 15.17l2.46-2.46a2.67 2.67 0 0 0-3.77-3.77l-2.46 2.46m3.77 3.77-3.77-3.77M11.42 15.17l-5.83 5.83A2.67 2.67 0 1 1 1.82 17.25l5.83-5.83m3.77-3.77-5.83-5.83A2.67 2.67 0 0 0 1.82 5.58l5.83 5.83m3.77-3.77 2.46-2.46a2.67 2.67 0 0 1 3.77 3.77l-2.46 2.46" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-sm mb-3">Strategic Jira ITSM Expansion</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Holistic optimization of ITSM using AI-supported ticket routing and automated asset management within the Atlassian ecosystem.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-[2rem] border border-white/10 hover:border-blue-500/40 transition-all group">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-purple-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.59 8.37m6 6a14.98 14.98 0 0 1-12.12 6.16 14.98 14.98 0 0 1 6.16-12.12" />
                </svg>
              </div>
              <h4 className="text-white font-bold text-sm mb-3">Copilot Agents</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">Architecting specialized Copilot Agents in M365 to handle complex department-specific decision logic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {PORTFOLIO_GROUPS.map((group, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{group.title}</h3>
                <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">{group.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-4">
              {group.items.map((item, i) => (
                <li key={i} className={`p-4 rounded-2xl transition-all ${item.highlight ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-slate-50'}`}>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Individual Projects List */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Detailed Project Log</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <Link to={`/projects/${project.id}`} className="block relative aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl || 'https://picsum.photos/seed/placeholder/800/450'} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {project.period}
                  </span>
                </div>
              </Link>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    <Link to={`/projects/${project.id}`}>{project.title}</Link>
                  </h3>
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">{project.role}</p>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="bg-slate-50 text-slate-500 border border-slate-100 px-3 py-1 rounded-lg text-[10px] font-bold">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && <span className="text-[10px] text-slate-400 font-bold self-center">+{project.technologies.length - 4} more</span>}
                </div>
                
                <Link 
                  to={`/projects/${project.id}`}
                  className="w-full text-center bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-[0.98]"
                >
                  Explore Documentation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;