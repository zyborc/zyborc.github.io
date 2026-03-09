import { Link, Navigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { projects } from '../data/projects';
import { ArrowLeft } from 'lucide-react';

const ProjectDetails = () => {
  const { id = '' } = useParams();
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <SEOHead title={`${project.title} | Alexander Siedler`} description={project.description} />
      
      <div className="max-w-4xl mx-auto px-6">
        <Link className="text-cyan-400 hover:text-cyan-300 font-mono text-sm inline-flex items-center gap-2 mb-12 transition-colors group" to="/projects">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to projects
        </Link>
        
        <div className="mb-12">
          <div className="font-mono text-sm text-gray-500 mb-4">// {project.period}</div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans text-white mb-6 leading-tight">{project.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-12">
            {project.technologies.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400">
                {tag}
              </span>
            ))}
          </div>

          <div className="prose animate-slide-up">
            <p>{project.fullDescription}</p>
            <div className="mt-8 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
              <span className="text-gray-500 font-mono text-sm block mb-2">// role</span>
              <strong className="text-cyan-400 text-lg">{project.role}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
