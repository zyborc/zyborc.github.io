import { NavLink } from 'react-router-dom';
import { Terminal } from 'lucide-react';

interface HeaderProps {
  isLoaded?: boolean;
}

const links = [
  { to: '/blog', label: '_blog' },
  { to: '/projects', label: '_projects' },
  { to: '/about', label: '_about' },
  { to: '/contact', label: '_contact' },
];

const Header = ({ isLoaded = true }: HeaderProps) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md border-b border-gray-900 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20">
              <Terminal className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="font-mono text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors">~/alexander-siedler</div>
              <div className="text-xs text-gray-500 font-mono">collab.ai.platform</div>
            </div>
          </NavLink>
          
          <div className="hidden md:flex items-center gap-8 font-mono text-sm">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-400 hover:text-cyan-400'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
