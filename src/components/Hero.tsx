import { Link } from 'react-router-dom';
import { personal } from '../data/personal';
import { toSiteAssetUrl } from '../lib/site';

const Hero = () => {
  return (
    <section className="hero">
      <div className="shell hero__grid">
        <div>
          <p className="eyebrow">Collaboration, AI, and digital workplace strategy</p>
          <h1>{personal.name}</h1>
          <p className="hero__lead">{personal.heroIntro}</p>
          <div className="hero__actions">
            <Link className="button button--primary" to="/blog">
              Read the blog
            </Link>
            <Link className="button button--secondary" to="/projects">
              Explore projects
            </Link>
          </div>
        </div>
        <div className="hero__panel">
          <img
            className="hero__image"
            src={toSiteAssetUrl('/images/profile/alexander-siedler.jpg')}
            alt="Portrait of Alexander Siedler"
          />
          <div className="hero__meta">
            <span>{personal.role}</span>
            <strong>{personal.company}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
