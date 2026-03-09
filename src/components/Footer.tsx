import { personal } from '../data/personal';

const Footer = () => {
  return (
    <footer className="border-t border-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="font-mono text-sm text-cyan-400 mb-4">_contact</div>
            <a href={`mailto:${personal.email}`} className="text-gray-400 hover:text-cyan-400 transition-colors">
              {personal.email}
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
            © {new Date().getFullYear()} {personal.name} · 
            <span className="text-cyan-400/50"> Crafting digital experiences</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
