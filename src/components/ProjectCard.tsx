import { Link } from 'react-router-dom';
import type { Project } from '../types/content';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  const defaultColor = index % 2 === 0 ? "from-emerald-400 to-teal-500" : "from-blue-400 to-cyan-500";
  
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block animate-slide-up"
      style={{ animationDelay: `${0.2 + index * 0.1}s` }}
    >
      <div className="relative border border-gray-900 hover:border-gray-800 rounded-xl p-8 bg-gradient-to-br from-gray-950 to-black transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5 h-full flex flex-col">
        {/* Gradient line accent */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${defaultColor} opacity-0 group-hover:opacity-100 transition-opacity rounded-l-xl`} />
        
        <div className="flex flex-col gap-4 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 text-gray-500 font-mono text-xs md:text-sm mb-2">
                <span>{project.period}</span>
                <span className="text-gray-800 hidden md:inline">|</span>
                <span className="text-cyan-400">{project.role}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-full border border-gray-800 group-hover:border-cyan-500 flex items-center justify-center transition-all shrink-0">
               <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </div>
          
          <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 4).map(tech => (
              <span key={tech} className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-400">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs font-mono text-gray-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
