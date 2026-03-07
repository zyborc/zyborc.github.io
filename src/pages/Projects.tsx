import ProjectCard from '../components/ProjectCard';
import SEOHead from '../components/SEOHead';
import { portfolioGroups, projects } from '../data/projects';

const focusCards = [
  {
    title: 'Enterprise AI',
    description:
      'Developing secure, localized LLM systems to unlock massive internal knowledge silos using Azure AI Search and RAG architecture.',
    tone: 'blue',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.75l1.6 3.24 3.58.52-2.59 2.53.61 3.57L12 12.02 8.8 13.6l.61-3.57L6.82 7.5l3.58-.52L12 3.75z" />
        <path d="M5.75 14.25l1.2 2.45 2.7.39-1.95 1.9.46 2.7-2.41-1.27-2.41 1.27.46-2.7-1.95-1.9 2.7-.39 1.2-2.45z" />
        <path d="M18.25 14.25l1.2 2.45 2.7.39-1.95 1.9.46 2.7-2.41-1.27-2.41 1.27.46-2.7-1.95-1.9 2.7-.39 1.2-2.45z" />
      </svg>
    ),
  },
  {
    title: 'Strategic Jira ITSM Expansion',
    description:
      'Holistic optimization of ITSM using AI-supported ticket routing and automated asset management within the Atlassian ecosystem.',
    tone: 'indigo',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.5 4.75l4.75 4.75M6.25 8l9.75 9.75M4.75 14.5L9.5 19.25M14.5 4.75l4.75 4.75M19.25 9.5l-9.75 9.75" />
      </svg>
    ),
  },
  {
    title: 'Copilot Agents',
    description:
      'Architecting specialized Copilot Agents in Microsoft 365 to handle complex department-specific decision logic.',
    tone: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 18.5c3.5-1 6.5-4 7.5-7.5.75-2.5 2.25-4 4.5-4.5-.5 2.25-2 3.75-4.5 4.5C10 12 7 15 6 18.5z" />
        <path d="M8.5 8.5l7 7" />
      </svg>
    ),
  },
] as const;

const Projects = () => {
  return (
    <section className="section">
      <SEOHead title="Projects | Alexander Siedler" description="Selected projects across enterprise AI, process automation, and collaboration platforms." />
      <div className="shell strategic-header">
        <p className="eyebrow">Projects</p>
        <h1>Strategic Portfolio</h1>
        <p className="strategic-header__lede">
          Thematic grouping of my work as a Strategic Manager and Technical Innovator, focusing on AI-driven transformation and digital ecosystems.
        </p>
      </div>
      <div className="shell strategic-spotlight">
        <section className="strategic-spotlight__intro">
          <span className="strategic-pill">Core Innovation Focus</span>
          <h2>AI &amp; Automation Transformation</h2>
          <p>
            Leading the shift towards intelligent workflows. My current work centers on leveraging Large Language Models (LLMs) and
            advanced automation to redefine corporate productivity.
          </p>
          <div className="strategic-chip-row">
            <span className="strategic-chip">Azure OpenAI</span>
            <span className="strategic-chip">RAG Architecture</span>
            <span className="strategic-chip">Copilot Agents</span>
          </div>
        </section>
        <div className="strategic-focus-grid">
          {focusCards.map((card) => (
            <article className={`focus-card focus-card--${card.tone}`} key={card.title}>
              <div className="focus-card__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="shell project-groups project-groups--strategic">
        {portfolioGroups.map((group, index) => (
          <section className="group-card group-card--portfolio" key={group.title}>
            <div className="group-card__heading">
              <span className="group-card__index">{index + 1}</span>
              <div>
                <h2>{group.title}</h2>
                <p className="group-card__subtitle">{group.subtitle}</p>
              </div>
            </div>
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
      <div className="shell section__header section__header--projects">
        <div>
          <p className="eyebrow">Detailed project log</p>
          <h2>Execution across enterprise platforms and delivery programs.</h2>
        </div>
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
