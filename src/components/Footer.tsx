import { personal } from '../data/personal';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div>
          <p className="site-footer__title">{personal.name}</p>
          <p>{personal.tagline}</p>
        </div>
        <div className="site-footer__links">
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={personal.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
