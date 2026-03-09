import type { Certification } from '../types/content';

interface CertBadgeProps {
  certification: Certification;
}

const CertBadge = ({ certification }: CertBadgeProps) => {
  return (
    <div className="flex items-start gap-4 p-4 border border-gray-900 rounded-lg bg-gray-950/50 hover:border-gray-700 hover:bg-gray-900 transition-colors group">
      <strong className="text-cyan-400 font-mono text-sm mt-0.5 group-hover:text-cyan-300">{certification.year}</strong>
      <span className="text-gray-300 font-medium leading-snug group-hover:text-white">{certification.name}</span>
    </div>
  );
};

export default CertBadge;
