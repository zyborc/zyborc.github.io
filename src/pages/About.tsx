import CertBadge from '../components/CertBadge';
import SEOHead from '../components/SEOHead';
import SkillBar from '../components/SkillBar';
import Timeline from '../components/Timeline';
import { certifications } from '../data/certifications';
import { experiences } from '../data/experiences';
import { softSkills, technicalSkills } from '../data/skills';

const About = () => {
  return (
    <section className="section">
      <SEOHead title="About | Alexander Siedler" description="Career path, capabilities, education, and certifications." />
      <div className="shell about-header">
        <p className="eyebrow">About</p>
        <h1>Professional Journey</h1>
        <div className="about-header__quotes">
          <p>“Problems are chances for us to do our best.” – Duke Ellington</p>
          <p>“The best way to predict the future is to create it.” – Peter Drucker</p>
        </div>
      </div>
      <div className="shell about-grid">
        <div className="about-grid__timeline">
          <Timeline items={experiences} />
        </div>
        <div className="about-grid__details">
          <section className="about-panel">
            <h2>Technical Proficiency</h2>
            <div className="stack-md">
              {technicalSkills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </section>
          <div className="stack-lg about-grid__sidebar">
            <section className="about-panel">
              <h2>Education & Awards</h2>
              <div className="card-stack">
                <article className="about-education-card">
                  <div className="about-education-card__head">
                    <h3>Master of Science (Wirtschaftsinformatik)</h3>
                    <span>Grade: 1.6</span>
                  </div>
                  <p>Akad Hochschule, Stuttgart (2017 – 2021)</p>
                  <p className="about-education-card__note">
                    Thesis: “Das Social-Intranet Reifegradmodell – Entwicklung eines geeigneten Modells, um Nutzen und Entwicklungspfade
                    in Unternehmen aufzuzeigen” (1.8)
                  </p>
                </article>
                <article className="about-education-card">
                  <div className="about-education-card__head">
                    <h3>Bachelor of Science (Wirtschaftsinformatik)</h3>
                    <span>Grade: 1.6</span>
                  </div>
                  <p>Fachhochschule Bielefeld (2013 – 2016)</p>
                  <p className="about-education-card__note">
                    Thesis: “Automatisierter IT-Bestellprozess in SharePoint 2013 mit Nintex Workflow bei Arvato SCM” (1.3)
                  </p>
                </article>
              </div>
            </section>
            <section className="about-panel">
              <h2>Leadership & Consulting</h2>
              <div className="stack-md">
                {softSkills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </div>
            </section>
            <section className="about-panel">
              <h2>Certifications</h2>
              <div className="stack-sm">
                {certifications.map((certification) => (
                  <CertBadge key={certification.name} certification={certification} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
