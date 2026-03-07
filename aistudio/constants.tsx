import { Experience, Project, Skill, Certification, PortfolioGroup } from './types';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/alexandersiedler/';
export const GITHUB_URL = 'https://github.com/asiedler';
export const EMAIL = 'alex.siedler@gmail.com';

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    period: '08.2022 – Present',
    company: 'Pfeifer & Langen IT-Solutions KG',
    role: 'Manager Collaboration Platforms',
    description: [
      'Disciplinary & technical responsibility for the team (leadership, motivation, and development)',
      'Responsible for M365 collaboration platforms and Jira ITSM',
      'Contributing to organizational development and the strategic direction of the company',
      'Management consulting in the Modern Workplace sector',
      'Focus on high-security document collaboration and ecosystem integration'
    ]
  },
  {
    id: '2',
    period: '03.2019 – 08.2022',
    company: 'Hansevision GmbH',
    role: 'Team Lead Collaboration West',
    description: [
      'Disciplinary & technical team leadership responsibility',
      'Contributing to organizational development and strategic alignment',
      'Modern Workplace consulting',
      'Conception and implementation of Social Intranet and process automation projects',
      'Pre-Sales support'
    ]
  },
  {
    id: '3',
    period: '05.2018 – 02.2019',
    company: 'Hansevision GmbH, Bielefeld',
    role: 'SharePoint Consultant',
    description: [
      'Modern Workplace consulting',
      'Conception and implementation of Social Intranet and process automation projects',
      'Focused on Cloud and On-Premises solutions',
      'Pre-Sales activities'
    ]
  },
  {
    id: '4',
    period: '10.2016 – 04.2018',
    company: 'Arvato SCM, Gütersloh',
    role: 'Junior Expert SharePoint Development',
    description: [
      'In-house consulting for SharePoint solutions',
      'Conception and implementation of process automation projects',
      'Effort analysis and agile project management'
    ]
  },
  {
    id: '5',
    period: '07.2011 – 09.2013',
    company: 'Kraftverkehr Nagel, Versmold',
    role: 'Commercial Employee',
    description: [
      'Operation of PC hardware and accessories',
      'Migration from Windows XP to Windows 7',
      'Conception & implementation of Thin-Client operations',
      'User support via phone & email'
    ]
  }
];

export const PORTFOLIO_GROUPS: PortfolioGroup[] = [
  {
    title: "AI & Future Workplace",
    subtitle: "Strategy & Innovation",
    items: [
      { name: "Enterprise AI & RAG", description: "Building a sovereign LLM infrastructure using Azure AI Search and Python for internal knowledge retrieval." },
      { name: "Microsoft Copilot Piloting", description: "Holistic implementation guidance, use-case development, and driving user adoption." },
      { name: "AI-Powered ITSM (Jira)", description: "Optimizing ticket routing through AI-Hub classification and integrated asset management in Atlassian." }
    ]
  },
  {
    title: "Low-Code Strategy & Governance",
    subtitle: "Empowerment & Control",
    items: [
      { name: "Citizen Developer Initiative", description: "Establishing a Power Platform Center of Excellence (CoE) including governance and training programs." },
      { name: "XTime Transformation", description: "Modernizing legacy software into future-proof Model-Driven Apps based on Microsoft Dataverse." }
    ]
  },
  {
    title: "Business Process Automation",
    subtitle: "ERP & Integration",
    items: [
      { name: "Sales Order Automation", description: "End-to-end automation bridging Cloud AI and On-Premise SAP systems.", highlight: true },
      { name: "Plant Technical Documentation", description: "Linking technical asset management (SAP) with modern document management structures (SharePoint)." },
      { name: "Cross-Platform Integration", description: "Creating synergies between third-party tools (Wrike) and the Microsoft ecosystem." }
    ]
  },
  {
    title: "Legal, Compliance & Collaboration",
    subtitle: "Security & Communication",
    items: [
      { name: "Legal Ticketing & High-Security Collab", description: "Specialized platforms for legal departments focusing on high-security document handling.", highlight: true },
      { name: "Workflow Sample Shipping", description: "Implementing complex compliance checks within digital business processes." },
      { name: "Staffbase Integration", description: "Strategic employee communication platform integrated into the M365 environment." }
    ]
  }
];

export const PROJECTS: Project[] = [
    {
    id: 'p13',
    period: '10.2024 – Present',
    title: 'Enterprise AI (OpenWebUI & RAG)',
    role: 'IT Project Manager & Developer',
    technologies: ['Azure AI Search', 'Python', 'Docker', 'PostgreSQL', 'Azure Prompt Flow', 'OpenWebUI'],
    description: 'Implementation of an internal ChatGPT alternative with secure RAG architecture for Company data like SharePoint.',
    fullDescription: 'Managed the deployment of a corporate ChatGPT alternative based on the OpenWebUI framework. Developed a Retrieval Augmented Generation (RAG) architecture for secure querying of internal SharePoint data. Includes Python scripting for embedding/chunking, Azure Prompt Flow connection, and Docker-based platform operation. Everythin in a secured vnet.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p10',
    period: '03.2025 – Present',
    title: 'Sample Shipping Workflow',
    role: 'IT Project Manager',
    technologies: ['SharePoint Online', 'Power Platform'],
    description: 'Implementation of a digital process for sample shipping to existing and new customers, replacing manual workflows.',
    fullDescription: 'Spearheaded the development of a digital process for sample shipping on SharePoint and Power Platform. The project involved replacing manual procedures with an automated, multi-stage approval process, including integrated terrorist list screening for global compliance adherence.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p11',
    period: '03.2025 – 01.2026',
    title: 'Plant Technical Documentation',
    role: 'IT Project Manager & Developer',
    technologies: ['SharePoint Online', 'Azure Functions', 'Webhooks', 'SAP', 'PowerShell', 'ShareGate'],
    description: 'Centralized metadata-driven architecture for managing plant documentation with SAP synchronization.',
    fullDescription: 'Architected and implemented a central, metadata-driven information architecture within SharePoint for managing technical plant documentations. Includes automated synchronization of plant and equipment data from SAP using Azure Functions and Webhooks. Automated provisioning of workspaces for functional locations was realized via PowerShell and ShareGate.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p12',
    period: '01.2025 – Present',
    title: 'Microsoft Copilot Piloting',
    role: 'IT Project Manager & Enabler',
    technologies: ['Microsoft 365 Copilot', 'Copilot Studio', 'Agents'],
    description: 'Guiding the Copilot pre-pilot and main pilot phases focusing on setup, governance, and adoption.',
    fullDescription: 'Leading the Microsoft Copilot pilot phases from an IT perspective. Focus is on technical setup, ensuring governance standards, and driving user adoption. This includes identifying and developing specific business use cases using Copilot Agents to increase efficiency across departments.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p14',
    period: '08.2024 – Present',
    title: 'Strategic Jira ITSM Expansion',
    role: 'IT Project Manager',
    technologies: ['Jira Service Management', 'Power Platform AI Hub', 'Confluence', 'Assets'],
    description: 'Optimization of IT Service Management with AI-powered routing and asset management.',
    fullDescription: 'Directed the holistic optimization of IT Service Management in Jira. Implementation of AI-supported ticket routing using Power Platform AI Hub for automated classification. Built asset management for inventorying the Atlassian environment and automated permission processes.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p15',
    period: '06.2024 – 12.2024',
    title: 'XTime Migration',
    role: 'IT Project Manager & Developer',
    technologies: ['Microsoft Dataverse', 'Power Apps', 'Power Automate'],
    description: 'Modernization of a legacy C#-based time tracking solution into a cloud-native Dataverse environment.',
    fullDescription: 'Managed the replacement of an obsolete, C#-based time tracking solution on SharePoint 2019 On-Premises. Migrated logic to a modern Dataverse environment using Model-Driven Apps. Implemented automated workflows for document generation and reminder management via Power Automate.',
    imageUrl: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p16',
    period: '03.2024 – 12.2024',
    title: 'Citizen Developer Initiative',
    role: 'IT Project Manager & Strategist',
    technologies: ['Microsoft Power Platform'],
    description: 'Establishing a structured initiative to promote digital self-sufficiency within business departments.',
    fullDescription: 'Founded a structured Citizen Developer initiative to foster digital self-service. Established a comprehensive governance and compliance framework for the Power Platform and conducted training programs for key users.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p1',
    period: '09.2023 – Present',
    title: 'Sales Order Automation',
    role: 'Solution Architect & Implementation',
    technologies: ['M365', 'Power Platform', 'SAP', 'Azure OpenAI'],
    description: 'Automation of order processing using AI for PDF analysis and data extraction for SAP. Reduces manual effort by approx. 85%.',
    fullDescription: 'This project utilizes artificial intelligence (Azure OpenAI Service / ChatGPT) to analyze customer PDF documents and extract data. The extracted data is used to create qualified orders in SAP without manual intervention. The Power Platform acts as the main tool connecting various components like Azure OpenAI for understanding and validating documents.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'p2',
    period: '01.2023 – 09.2023',
    title: 'Employee App Staffbase',
    role: 'IT Project Manager',
    technologies: ['SharePoint Online', 'MS Teams', 'Staffbase'],
    description: 'Central integration of Staffbase into the M365 ecosystem for significant improvement of internal communication.',
    fullDescription: 'Integration of the Staffbase employee app into the existing Microsoft 365 environment. As IT Project Manager, responsible for planning, coordination, and technical implementation. This included requirement analysis, app configuration, integration with existing systems, and supporting the rollout and operation.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200'
  }
];

export const TECHNICAL_SKILLS: Skill[] = [
  { name: 'RAG & Azure AI Search', rating: 5 },
  { name: 'Microsoft 365 & SharePoint', rating: 5 },
  { name: 'Copilot Agents & Studio', rating: 5 },
  { name: 'Power Platform & Dataverse', rating: 5 },
  { name: 'Power Automate', rating: 5 },
  { name: 'Jira Service Management', rating: 5 },
  { name: 'Azure Logic Apps', rating: 5 },
  { name: 'Python', rating: 4 },
  { name: 'Docker', rating: 4 },
  { name: 'PowerShell', rating: 4 },
  { name: 'Analysis & Design (BPMN)', rating: 4 }
];

export const SOFT_SKILLS: Skill[] = [
  { name: 'Consulting', rating: 5 },
  { name: 'Teamwork', rating: 5 },
  { name: 'Motivation', rating: 5 },
  { name: 'Empathy', rating: 4 },
  { name: 'Communication', rating: 4 },
  { name: 'Goal Setting', rating: 4 },
  { name: 'Agile/Scrum', rating: 4 }
];

export const CERTIFICATIONS: Certification[] = [
  { year: '2021', name: 'Microsoft Certified: Power Platform Fundamentals' },
  { year: '2019', name: 'Prince 2 Foundation' },
  { year: '2018', name: 'MCSA – Office 365' },
  { year: '2018', name: 'Enabling Office 365 Services' },
  { year: '2018', name: 'Managing Office 365 Identities and Requirements' }
];