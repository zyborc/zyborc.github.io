import type { Skill } from '../types/content';

interface SkillBarProps {
  skill: Skill;
  color?: string;
}

const SkillBar = ({ skill, color = 'cyan' }: SkillBarProps) => {
  const colorMap: Record<string, string> = {
    cyan: 'bg-cyan-500',
    indigo: 'bg-indigo-500',
    blue: 'bg-blue-500',
  };

  const bgClass = colorMap[color] || 'bg-cyan-500';

  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-2">
        <strong className="text-white text-sm font-bold tracking-wide">{skill.name}</strong>
        <span className="text-gray-500 font-mono text-xs">{skill.rating}/5</span>
      </div>
      <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
        <div 
          className={`h-full ${bgClass} rounded-full opacity-80`} 
          style={{ width: `${skill.rating * 20}%` }} 
        />
      </div>
    </div>
  );
};

export default SkillBar;
