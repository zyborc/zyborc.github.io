import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCES, TECHNICAL_SKILLS, CERTIFICATIONS } from '../constants';

const CVPage: React.FC = () => {
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Professional Journey</h1>
        <div className="space-y-2">
          <p className="text-slate-500 dark:text-slate-400 italic text-sm">
            „Problems are chances for us to do our best.“ – Duke Ellington
          </p>
          <p className="text-slate-500 dark:text-slate-400 italic text-sm">
            „The best way to predict the future is to create it.“ – Peter Drucker
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="relative pl-8 group">
            <div className="timeline-line"></div>
            <div className="timeline-dot transition-transform group-hover:scale-125"></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{exp.role}</h2>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full whitespace-nowrap mt-2 md:mt-0 border border-blue-100 dark:border-blue-800/50">
                {exp.period}
              </span>
            </div>
            <h3 className="text-lg font-medium text-slate-500 dark:text-slate-400 mb-4">{exp.company}</h3>
            <ul className="space-y-2">
              {exp.description.map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="text-blue-400 mr-2 text-xl leading-none">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div ref={skillsRef}>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0-5.571 3-5.571-3" />
            </svg>
            Technical Proficiency
          </h2>
          <div className="space-y-6">
            {TECHNICAL_SKILLS.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill.name}</span>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{skill.rating}/5</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-400 h-full rounded-full transition-all duration-[2000ms] ease-out"
                    style={{ 
                      width: skillsVisible ? `${(skill.rating / 5) * 100}%` : '0%' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>
            Education & Awards
          </h2>
          <div className="space-y-6">
             <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-600">
               <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-slate-900 dark:text-slate-100">Master of Science (Wirtschaftsinformatik)</h4>
                 <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">Grade: 1.6</span>
               </div>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Akad Hochschule, Stuttgart (2017 – 2021)</p>
               <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed italic">
                 Thesis: "Das Social-Intranet Reifegradmodell – Entwicklung eines geeigneten Modells, um Nutzen und Entwicklungspfade in Unternehmen aufzuzeigen" (1.8)
               </p>
             </div>
             <div className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-600">
               <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-slate-900 dark:text-slate-100">Bachelor of Science (Wirtschaftsinformatik)</h4>
                 <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">Grade: 1.6</span>
               </div>
               <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Fachhochschule Bielefeld (2013 – 2016)</p>
               <p className="text-xs text-slate-600 dark:text-slate-500 leading-relaxed italic">
                 Thesis: "Automatisierter IT-Bestellprozess in SharePoint 2013 mit Nintex Workflow bei Arvato SCM" (1.3)
               </p>
             </div>
          </div>

          <h2 className="text-2xl font-bold mt-16 mb-8 flex items-center gap-2 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            Certifications
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="flex items-center p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold mr-4 text-xs">
                  {cert.year}
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVPage;