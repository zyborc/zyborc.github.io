import { Link } from 'react-router-dom';
import type { Project } from '../types/content';
import TagList from './TagList';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <article className="card card--project">
      <p className="card__meta">
        <span>{project.period}</span>
        <span>{project.role}</span>
      </p>
      <h3 className="card__title">
        <Link to={`/projects/${project.id}`}>{project.title}</Link>
      </h3>
      <p>{project.description}</p>
      <TagList tags={project.technologies.slice(0, 4)} />
    </article>
  );
};

export default ProjectCard;
