import BlogCard from '../components/BlogCard';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import SEOHead from '../components/SEOHead';
import { personal } from '../data/personal';
import { projects } from '../data/projects';
import { useBlogPosts } from '../hooks/useBlogPosts';

const Home = () => {
  const posts = useBlogPosts().slice(0, 3);
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <>
      <SEOHead title={`${personal.name} | Blog & Portfolio`} description={personal.tagline} />
      <Hero />
      <section className="section">
        <div className="shell section__header">
          <div>
            <p className="eyebrow">Latest writing</p>
            <h2>Notes from delivery, architecture, and platform work.</h2>
          </div>
        </div>
        <div className="shell card-grid">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <section className="section section--alt">
        <div className="shell section__header">
          <div>
            <p className="eyebrow">Featured project</p>
            <h2>{featuredProject.title}</h2>
            <p>{featuredProject.fullDescription}</p>
          </div>
        </div>
        <div className="shell">
          <ProjectCard project={featuredProject} />
        </div>
      </section>
    </>
  );
};

export default Home;
