import type { Certification } from '../types/content';

interface CertBadgeProps {
  certification: Certification;
}

const CertBadge = ({ certification }: CertBadgeProps) => {
  return (
    <div className="cert-badge">
      <strong className="cert-badge__year">{certification.year}</strong>
      <span className="cert-badge__name">{certification.name}</span>
    </div>
  );
};

export default CertBadge;
