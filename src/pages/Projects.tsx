import ProjectCard from '../components/ProjectCard';
import SEOHead from '../components/SEOHead';
import { portfolioGroups, projects } from '../data/projects';

const Projects = () => {
  return (
    <section className="section">
      <SEOHead title="Projects | Alexander Siedler" description="Selected projects across enterprise AI, process automation, and collaboration platforms." />
      <div className="shell section__header">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Selected delivery work across AI, automation, and collaboration.</h1>
        </div>
      </div>
      <div className="shell project-groups">
        {portfolioGroups.map((group) => (
          <section className="group-card" key={group.title}>
            <p className="eyebrow">{group.subtitle}</p>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={item.name} className={item.highlight ? 'group-card__item group-card__item--highlight' : 'group-card__item'}>
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="shell card-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
