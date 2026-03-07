
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <Link to="/projects" className="text-blue-600 hover:underline">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img 
          src={project.imageUrl || 'https://picsum.photos/seed/placeholder/1200/800'} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-6xl mx-auto">
          <Link to="/projects" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 transition-colors font-medium group">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
             </svg>
             Portfolio
          </Link>
          <div className="text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">{project.period}</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{project.title}</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl font-medium">{project.role}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Project Overview</h2>
            <div className="prose prose-slate max-w-none mb-10">
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line">
                {project.fullDescription || project.description}
              </p>
            </div>
            
            {/* Distinct Tech Tags Section */}
            <div className="pt-10 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-4">
                {project.technologies.map((tech) => (
                  <div key={tech} className="group relative">
                    <div className="absolute inset-0 bg-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <span className="relative flex items-center bg-white border border-slate-200 text-slate-800 px-5 py-3 rounded-2xl text-sm font-bold shadow-sm transition-all group-hover:border-blue-500 group-hover:text-blue-600 group-hover:shadow-md group-hover:-translate-y-0.5">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="pt-8 border-t border-slate-100 flex items-center gap-4">
            <Link to="/contact" className="text-blue-600 font-bold hover:underline">
              Interested in my professional background? Let's connect →
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-12">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-6">Project Metadata</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500 font-medium">Timeline</span>
                <span className="font-bold text-slate-900">{project.period}</span>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500 font-medium">Category</span>
                <span className="font-bold text-slate-900">Collaboration</span>
              </li>
              <li className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="text-green-600 font-bold uppercase text-[10px] bg-green-100 px-2.5 py-1 rounded-lg">Delivered</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500 font-medium">Client Sector</span>
                <span className="font-bold text-slate-900 italic">Enterprise</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetails;
