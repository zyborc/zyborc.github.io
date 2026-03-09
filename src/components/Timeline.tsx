import type { Experience } from '../types/content';

interface TimelineProps {
  items: Experience[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="relative border-l border-gray-800 ml-3 md:ml-4 space-y-12">
      {items.map((item) => (
        <article className="relative pl-8 md:pl-10 group" key={item.id}>
          {/* Timeline Dot */}
          <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-600 border-4 border-black group-hover:bg-cyan-400 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all"></div>
          
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
            <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">{item.role}</h3>
            <p className="text-sm font-mono text-gray-500 whitespace-nowrap">{item.period}</p>
          </div>
          
          <p className="text-lg text-gray-300 font-medium mb-4">{item.company}</p>
          
          <ul className="space-y-3 text-gray-400">
            {item.description.map((entry) => (
              <li key={entry} className="flex gap-3">
                <span className="text-cyan-500 mt-1 select-none">›</span>
                <span className="leading-relaxed">{entry}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default Timeline;
