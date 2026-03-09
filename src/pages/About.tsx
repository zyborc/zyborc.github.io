import CertBadge from '../components/CertBadge';
import SEOHead from '../components/SEOHead';
import SkillBar from '../components/SkillBar';
import Timeline from '../components/Timeline';
import { certifications } from '../data/certifications';
import { experiences } from '../data/experiences';
import { personal } from '../data/personal';
import { softSkills, technicalSkills } from '../data/skills';

const About = () => {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <SEOHead title="About | Alexander Siedler" description="Career path, capabilities, education, and certifications." />
      
      {/* Header */}
      <section className="py-20 px-6 border-b border-gray-900 bg-black">
        <div className="max-w-7xl mx-auto flex gap-12 flex-col md:flex-row items-center md:items-start">
          <div className="flex-1">
            <div className="font-mono text-sm text-cyan-400 mb-6">// professional_journey</div>
            <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight text-white mb-12">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Path</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl text-gray-400 leading-relaxed font-serif italic border-l-2 border-cyan-500/30 pl-6">
              <p>“Problems are chances for us to do our best.”<br /><span className="text-base text-gray-500 not-italic font-sans mt-2 block">— Duke Ellington</span></p>
              <p>“The best way to predict the future is to create it.”<br /><span className="text-base text-gray-500 not-italic font-sans mt-2 block">— Peter Drucker</span></p>
            </div>
          </div>
          
          <div className="hidden md:block w-48 lg:w-64 flex-shrink-0 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src={personal.avatar} 
                alt={personal.name} 
                className="relative rounded-2xl w-full object-cover border border-gray-800 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Main Timeline */}
            <div className="lg:col-span-7">
              <div className="font-mono text-sm text-gray-500 mb-8 border-b border-gray-900 pb-4">
                // experience_log
              </div>
              <Timeline items={experiences} />
            </div>

            {/* Sidebar Details */}
            <div className="lg:col-span-5 space-y-16">
              
              {/* Technical Skills */}
              <div className="bg-gray-950 border border-gray-900 p-8 rounded-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="font-mono text-sm text-cyan-400 mb-6">// technical_proficiency</div>
                <div className="space-y-6">
                  {technicalSkills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="bg-gray-950 border border-gray-900 p-8 rounded-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="font-mono text-sm text-indigo-400 mb-6">// leadership_and_consulting</div>
                <div className="space-y-6">
                  {softSkills.map((skill) => (
                    <SkillBar key={skill.name} skill={skill} color="indigo" />
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="font-mono text-sm text-gray-500 mb-6 border-b border-gray-900 pb-4">// education_and_awards</div>
                <div className="space-y-6">
                  <article className="border border-gray-800 rounded-xl p-6 bg-gradient-to-br from-gray-900 to-black hover:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-xl font-bold text-white">Master of Science (Wirtschaftsinformatik)</h3>
                      <span className="px-2 py-1 bg-cyan-950/50 text-cyan-400 rounded text-xs font-mono font-bold whitespace-nowrap border border-cyan-900/50">1.6</span>
                    </div>
                    <p className="text-gray-400 mb-4">Akad Hochschule, Stuttgart (2017 – 2021)</p>
                    <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400 leading-relaxed">
                        <span className="text-gray-500 font-mono text-xs block mb-1">Thesis:</span>
                        “Das Social-Intranet Reifegradmodell – Entwicklung eines geeigneten Modells, um Nutzen und Entwicklungspfade
                        in Unternehmen aufzuzeigen” (1.8)
                      </p>
                    </div>
                  </article>
                  
                  <article className="border border-gray-800 rounded-xl p-6 bg-gradient-to-br from-gray-900 to-black hover:border-gray-700 transition-colors">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="text-xl font-bold text-white">Bachelor of Science (Wirtschaftsinformatik)</h3>
                      <span className="px-2 py-1 bg-cyan-950/50 text-cyan-400 rounded text-xs font-mono font-bold whitespace-nowrap border border-cyan-900/50">1.6</span>
                    </div>
                    <p className="text-gray-400 mb-4">Fachhochschule Bielefeld (2013 – 2016)</p>
                    <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400 leading-relaxed">
                        <span className="text-gray-500 font-mono text-xs block mb-1">Thesis:</span>
                        “Automatisierter IT-Bestellprozess in SharePoint 2013 mit Nintex Workflow bei Arvato SCM” (1.3)
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              {/* Certifications */}
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="font-mono text-sm text-gray-500 mb-6 border-b border-gray-900 pb-4">// certifications</div>
                <div className="space-y-4">
                  {certifications.map((certification) => (
                    <CertBadge key={certification.name} certification={certification} />
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
