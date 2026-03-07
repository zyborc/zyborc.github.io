import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-20 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <span className="inline-block py-1 px-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-200 dark:border-blue-800">
              Expert for Collaboration & AI
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Empowering Teams through <span className="text-blue-600 dark:text-blue-500">Digital Collaboration.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
              I'm Alexander Siedler. I architect and manage modern workplace environments focusing on high-security collaboration, ecosystem integration, and AI transformation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 dark:shadow-blue-900/20">
                Strategic Portfolio
              </Link>
              <Link to="/contact" className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg shadow-slate-200 dark:shadow-none">
                Let's Connect
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-slate-800">
              <img 
                src="/it-solutions1130_1x1.jpg" 
                alt="Alexander Siedler Professional" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl z-20 hidden md:block border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Strategic Focus</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                High-Security Collab & Integrations<br/>
                @ Pfeifer & Langen IT-Solutions KG
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="bg-slate-900 dark:bg-slate-950/50 py-24 text-white border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Latest Innovation</h2>
            <div className="h-1.5 w-20 bg-blue-500 rounded-full mx-auto md:mx-0"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-4xl font-bold mb-6 leading-tight">{PROJECTS[0].title}</h3>
               <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                 {PROJECTS[0].description}
               </p>
               <div className="flex flex-wrap gap-2 mb-8">
                 {PROJECTS[0].technologies.map(tech => (
                   <span key={tech} className="bg-slate-800/50 px-4 py-1.5 rounded-lg text-sm text-blue-400 font-mono border border-slate-700/50">
                     {tech}
                   </span>
                 ))}
               </div>
               <Link to={`/projects/${PROJECTS[0].id}`} className="text-blue-400 font-bold hover:text-blue-300 transition-colors inline-flex items-center gap-2">
                 <span>Explore Architecture</span>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                 </svg>
               </Link>
             </div>
             <div className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-[2.5rem] border border-slate-700/50 shadow-2xl">
               <pre className="text-xs font-mono text-green-400 overflow-x-auto leading-relaxed">
                 {`{
  "system": "Sales Order AI",
  "engine": "Azure OpenAI / ChatGPT",
  "integration": "M365 & SAP",
  "status": "Active",
  "reduction_manual_entry": "85%"
}`}
               </pre>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;