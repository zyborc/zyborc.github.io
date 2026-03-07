import type { Experience } from '../types/content';

interface TimelineProps {
  items: Experience[];
}

const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline__item" key={item.id}>
          <div className="timeline__heading">
            <h3>{item.role}</h3>
            <p className="timeline__period">{item.period}</p>
          </div>
          <p className="timeline__company">{item.company}</p>
          <ul>
            {item.description.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
};

export default Timeline;
