import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface PageLayoutProps {
  children: ReactNode;
  isDark: boolean; // Keeping for compatibility, though theme is forced dark
  onToggleTheme: () => void; // Keeping for compatibility
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans overflow-x-clip selection:bg-cyan-500/30">
      <a className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-500 text-black px-4 py-2 rounded-md z-50 font-mono text-sm" href="#main-content">
        Skip to content
      </a>

      {/* Animated gradient mesh background */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none z-[-2]"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.15), transparent 50%)`
        }}
      />
      
      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none z-[-1] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <Header isLoaded={isLoaded} />
      
      <main id="main-content" className="relative z-0">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
