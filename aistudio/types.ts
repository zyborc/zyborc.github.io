export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string[];
  location?: string;
}

export interface Project {
  id: string;
  period: string;
  title: string;
  role: string;
  technologies: string[];
  description: string;
  fullDescription?: string;
  imageUrl?: string;
}

export interface PortfolioGroup {
  title: string;
  subtitle: string;
  items: {
    name: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface Skill {
  name: string;
  rating: number; // 1-5
}

export interface Certification {
  year: string;
  name: string;
}