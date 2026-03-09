import ProjectCard from '../components/ProjectCard';
import SEOHead from '../components/SEOHead';
import { portfolioGroups, projects } from '../data/projects';
import { Target, Lightbulb, Bot, CheckCircle2 } from 'lucide-react';

const focusCards = [
  {
    title: 'Enterprise AI',
    description:
      'Developing secure, localized LLM systems to unlock massive internal knowledge silos using Azure AI Search and RAG architecture.',
    tone: 'from-blue-500/20 to-cyan-500/20',
    icon: <Bot className="w-6 h-6 text-cyan-400" />,
  },
  {
    title: 'Strategic Jira ITSM Expansion',
    description:
      'Holistic optimization of ITSM using AI-supported ticket routing and automated asset management within the Atlassian ecosystem.',
    tone: 'from-indigo-500/20 to-purple-500/20',
    icon: <Target className="w-6 h-6 text-indigo-400" />,
  },
  {
    title: 'Copilot Agents',
    description:
      'Architecting specialized Copilot Agents in Microsoft 365 to handle complex department-specific decision logic.',
    tone: 'from-emerald-500/20 to-teal-500/20',
    icon: <Lightbulb className="w-6 h-6 text-emerald-400" />,
  },
] as const;

const Projects = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <SEOHead title="Projects | Alexander Siedler" description="Selected projects across enterprise AI, process automation, and collaboration platforms." />
      
      {/* Header section */}
      <section className="py-20 px-6 border-b border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-sm text-cyan-400 mb-6">// strategic_portfolio</div>
          <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight text-white mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Execution</span> & Strategy
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Thematic grouping of my work as a Strategic Manager and Technical Innovator, 
            focusing on AI-driven transformation and digital ecosystems.
          </p>
        </div>
      </section>

      {/* Strategic Spotlight */}
      <section className="py-24 px-6 border-b border-gray-900/50 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full font-mono text-xs mb-6">// core_innovation_focus</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">AI & Automation Transformation</h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              Leading the shift towards intelligent workflows. My current work centers on leveraging Large Language Models (LLMs) and advanced automation to redefine corporate productivity.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm font-mono text-gray-300">Azure OpenAI</span>
              <span className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm font-mono text-gray-300">RAG Architecture</span>
              <span className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm font-mono text-gray-300">Copilot Agents</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {focusCards.map((card, idx) => (
              <div key={card.title} className="bg-black border border-gray-900 rounded-2xl p-8 hover:border-gray-800 transition-colors animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.tone} flex items-center justify-center mb-6`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Groups */}
      <section className="py-24 px-6 border-b border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {portfolioGroups.map((group, index) => (
              <div key={group.title} className="bg-gray-950 border border-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 font-mono text-6xl font-bold text-gray-900/50 select-none">
                  0{index + 1}
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-white mb-2">{group.title}</h2>
                  <p className="text-cyan-400 font-mono text-sm mb-12">{group.subtitle}</p>
                  
                  <ul className="space-y-6">
                    {group.items.map((item) => (
                      <li key={item.name} className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${item.highlight ? 'bg-cyan-950/20 border border-cyan-900/50' : 'hover:bg-gray-900/50 border border-transparent hover:border-gray-800'}`}>
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${item.highlight ? 'text-cyan-400' : 'text-gray-600'}`} />
                        <div>
                          <h4 className="text-white font-medium mb-1">{item.name}</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Project Log Grid */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="font-mono text-sm text-gray-500 mb-6">// detailed_log</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Execution across enterprise platforms and delivery programs.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
