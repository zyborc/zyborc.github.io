import SEOHead from '../components/SEOHead';
import { personal } from '../data/personal';

const Contact = () => {
  return (
    <section className="section">
      <SEOHead title="Contact | Alexander Siedler" description="Contact Alexander Siedler for collaboration, AI, and automation work." />
      <div className="shell prose-shell">
        <p className="eyebrow">Contact</p>
        <h1>Let’s talk about collaboration platforms, AI, and automation.</h1>
        <p className="post-summary">
          The fastest path is email. LinkedIn works well for longer-term conversations, partnerships, and project context.
        </p>
        <div className="contact-grid">
          <a className="contact-card" href={`mailto:${personal.email}`}>
            <strong>Email</strong>
            <span>{personal.email}</span>
          </a>
          <a className="contact-card" href={personal.linkedin} target="_blank" rel="noreferrer">
            <strong>LinkedIn</strong>
            <span>alexandersiedler</span>
          </a>
          <a className="contact-card" href={personal.github} target="_blank" rel="noreferrer">
            <strong>GitHub</strong>
            <span>asiedler</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
