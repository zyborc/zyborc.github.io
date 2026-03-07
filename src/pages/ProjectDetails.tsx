import { Link, Navigate, useParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import TagList from '../components/TagList';
import { projects } from '../data/projects';

const ProjectDetails = () => {
  const { id = '' } = useParams();
  const project = projects.find((entry) => entry.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <section className="section">
      <SEOHead title={`${project.title} | Alexander Siedler`} description={project.description} />
      <div className="shell prose-shell">
        <Link className="back-link" to="/projects">
          Back to projects
        </Link>
        <p className="eyebrow">{project.period}</p>
        <h1>{project.title}</h1>
        <p className="post-summary">{project.description}</p>
        <TagList tags={project.technologies} />
        <div className="prose">
          <p>{project.fullDescription}</p>
          <p>
            Role: <strong>{project.role}</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
