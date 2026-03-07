import type { Skill } from '../types/content';

interface SkillBarProps {
  skill: Skill;
}

const SkillBar = ({ skill }: SkillBarProps) => {
  return (
    <div className="skill-bar">
      <div className="skill-bar__header">
        <span>{skill.name}</span>
        <span>{skill.rating}/5</span>
      </div>
      <div className="skill-bar__track">
        <div className="skill-bar__fill" style={{ width: `${skill.rating * 20}%` }} />
      </div>
    </div>
  );
};

export default SkillBar;
