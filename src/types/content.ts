export interface Experience {
  id: string;
  period: string;
  company: string;
  role: string;
  description: string[];
}

export interface Project {
  id: string;
  period: string;
  title: string;
  role: string;
  technologies: string[];
  description: string;
  fullDescription: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  rating: number;
}

export interface Certification {
  year: string;
  name: string;
}

export interface PortfolioGroupItem {
  name: string;
  description: string;
  highlight?: boolean;
}

export interface PortfolioGroup {
  title: string;
  subtitle: string;
  items: PortfolioGroupItem[];
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  coverImage?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  content: string;
  readingTimeMinutes: number;
}
