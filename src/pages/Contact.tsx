import SEOHead from '../components/SEOHead';
import { personal } from '../data/personal';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <SEOHead title="Contact | Alexander Siedler" description="Contact Alexander Siedler for collaboration, AI, and automation work." />
      
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start border-b border-gray-900 pb-16 mb-16">
            <div className="flex-1">
              <div className="font-mono text-sm text-cyan-400 mb-6">// contact_init</div>
              <h1 className="text-5xl md:text-6xl font-bold font-sans tracking-tight text-white mb-8">
                Let’s talk about <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">collaboration platforms</span>, AI, and automation.
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                The fastest path is email. LinkedIn works well for longer-term conversations, partnerships, and project context.
              </p>
            </div>
            <div className="hidden md:block w-32 h-32 lg:w-40 lg:h-40 flex-shrink-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img 
                  src={personal.avatar} 
                  alt={personal.name} 
                  className="relative w-full h-full object-cover rounded-full border-2 border-gray-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href={`mailto:${personal.email}`} className="group relative border border-gray-900 hover:border-cyan-900 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all hover:shadow-lg hover:shadow-cyan-500/5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 rounded-xl bg-cyan-950/30 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <strong className="block text-white text-xl mb-2">Email</strong>
            <span className="text-gray-400 font-mono text-sm group-hover:text-cyan-400 transition-colors">{personal.email}</span>
            <ExternalLink className="absolute top-6 right-6 w-5 h-5 text-gray-700 group-hover:text-cyan-400 transition-colors" />
          </a>
          
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="group relative border border-gray-900 hover:border-blue-900 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all hover:shadow-lg hover:shadow-blue-500/5 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 rounded-xl bg-blue-950/30 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
              <Linkedin className="w-6 h-6" />
            </div>
            <strong className="block text-white text-xl mb-2">LinkedIn</strong>
            <span className="text-gray-400 font-mono text-sm group-hover:text-blue-400 transition-colors">alexandersiedler</span>
            <ExternalLink className="absolute top-6 right-6 w-5 h-5 text-gray-700 group-hover:text-blue-400 transition-colors" />
          </a>
          
          <a href={personal.github} target="_blank" rel="noreferrer" className="group relative border border-gray-900 hover:border-gray-700 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-6 text-gray-300 group-hover:scale-110 transition-transform">
              <Github className="w-6 h-6" />
            </div>
            <strong className="block text-white text-xl mb-2">GitHub</strong>
            <span className="text-gray-400 font-mono text-sm group-hover:text-gray-200 transition-colors">asiedler</span>
            <ExternalLink className="absolute top-6 right-6 w-5 h-5 text-gray-700 group-hover:text-gray-300 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
