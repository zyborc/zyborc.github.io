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
      <div className="shell section__header">
        <div>
          <p className="eyebrow">About</p>
          <h1>Career path, delivery focus, and technical depth.</h1>
        </div>
      </div>
      <div className="shell two-column">
        <div>
          <h2>Experience</h2>
          <Timeline items={experiences} />
        </div>
        <div className="stack-lg">
          <section>
            <h2>Technical skills</h2>
            <div className="stack-md">
              {technicalSkills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </section>
          <section>
            <h2>Leadership skills</h2>
            <div className="stack-md">
              {softSkills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </section>
          <section className="education-panel">
            <h2>Education</h2>
            <div className="card-stack">
              <article className="card">
                <h3>M.Sc. Business Informatics</h3>
                <p>AKAD Hochschule, Stuttgart · 2017 – 2021 · Grade 1.6</p>
              </article>
              <article className="card">
                <h3>B.Sc. Business Informatics</h3>
                <p>Fachhochschule Bielefeld · 2013 – 2016 · Grade 1.6</p>
              </article>
            </div>
          </section>
          <section>
            <h2>Certifications</h2>
            <div className="stack-sm">
              {certifications.map((certification) => (
                <CertBadge key={certification.name} certification={certification} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default About;
