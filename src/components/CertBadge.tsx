import type { Certification } from '../types/content';

interface CertBadgeProps {
  certification: Certification;
}

const CertBadge = ({ certification }: CertBadgeProps) => {
  return (
    <div className="cert-badge">
      <strong>{certification.year}</strong>
      <span>{certification.name}</span>
    </div>
  );
};

export default CertBadge;
