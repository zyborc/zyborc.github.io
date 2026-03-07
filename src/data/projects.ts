import type { PortfolioGroup, Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'enterprise-ai-rag',
    period: '10.2024 – Present',
    title: 'Enterprise AI (OpenWebUI & RAG)',
    role: 'IT Project Manager & Developer',
    technologies: ['Azure AI Search', 'Python', 'Docker', 'PostgreSQL', 'Azure Prompt Flow', 'OpenWebUI'],
    description: 'An internal ChatGPT alternative with secure RAG architecture for company knowledge.',
    fullDescription:
      'Led the rollout of a sovereign enterprise AI environment based on OpenWebUI. The solution includes secure retrieval over internal SharePoint knowledge, Python-based chunking and embedding pipelines, Azure Prompt Flow integration, and Dockerized operation inside a protected network boundary.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200',
    featured: true,
  },
  {
    id: 'sample-shipping-workflow',
    period: '03.2025 – Present',
    title: 'Sample Shipping Workflow',
    role: 'IT Project Manager',
    technologies: ['SharePoint Online', 'Power Platform'],
    description: 'A digital sample-shipping process replacing manual approval flows.',
    fullDescription:
      'Built a multi-stage process for sample shipping across existing and new customer scenarios. The workflow replaces manual handling with structured approvals and compliance checks, including terrorist list screening for global distribution.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'plant-technical-documentation',
    period: '03.2025 – 01.2026',
    title: 'Plant Technical Documentation',
    role: 'IT Project Manager & Developer',
    technologies: ['SharePoint Online', 'Azure Functions', 'Webhooks', 'SAP', 'PowerShell', 'ShareGate'],
    description: 'A metadata-driven SharePoint architecture synchronized with SAP asset data.',
    fullDescription:
      'Architected a central documentation model for plant assets, synchronized master data from SAP, and automated workspace provisioning with Azure Functions, webhooks, PowerShell, and ShareGate.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'copilot-piloting',
    period: '01.2025 – Present',
    title: 'Microsoft Copilot Piloting',
    role: 'IT Project Manager & Enabler',
    technologies: ['Microsoft 365 Copilot', 'Copilot Studio', 'Agents'],
    description: 'Pilot setup, governance, and adoption for Microsoft Copilot programs.',
    fullDescription:
      'Guides pilot execution from platform readiness through governance and targeted business use cases. Focus areas include agent design, enablement, and measurable adoption inside business teams.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'jira-itsm-expansion',
    period: '08.2024 – Present',
    title: 'Strategic Jira ITSM Expansion',
    role: 'IT Project Manager',
    technologies: ['Jira Service Management', 'Power Platform AI Hub', 'Confluence', 'Assets'],
    description: 'AI-supported ticket routing and asset management in the Atlassian stack.',
    fullDescription:
      'Optimized ITSM operations in Jira with AI-assisted ticket classification, improved inventory and asset transparency, and automated permission and workflow handling across the Atlassian environment.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'xtime-migration',
    period: '06.2024 – 12.2024',
    title: 'XTime Migration',
    role: 'IT Project Manager & Developer',
    technologies: ['Microsoft Dataverse', 'Power Apps', 'Power Automate'],
    description: 'Migration of a legacy time-tracking solution into Dataverse and model-driven apps.',
    fullDescription:
      'Replaced a C#-based SharePoint on-premises solution with a cloud-native Dataverse platform. Rebuilt the core logic and integrated document generation and reminder processes with Power Automate.',
    imageUrl: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'citizen-developer-initiative',
    period: '03.2024 – 12.2024',
    title: 'Citizen Developer Initiative',
    role: 'IT Project Manager & Strategist',
    technologies: ['Microsoft Power Platform'],
    description: 'A governance-backed enablement initiative for digital self-service.',
    fullDescription:
      'Established a structured citizen developer program with governance, compliance guardrails, and training to help business teams build safely on the Power Platform.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'sales-order-automation',
    period: '09.2023 – Present',
    title: 'Sales Order Automation',
    role: 'Solution Architect & Implementation',
    technologies: ['M365', 'Power Platform', 'SAP', 'Azure OpenAI'],
    description: 'AI-assisted PDF analysis and order extraction for SAP with major manual effort reduction.',
    fullDescription:
      'Designed a workflow that extracts and validates order data from customer PDFs using Azure OpenAI, then hands qualified information into SAP through Power Platform orchestration.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'staffbase-integration',
    period: '01.2023 – 09.2023',
    title: 'Employee App Staffbase',
    role: 'IT Project Manager',
    technologies: ['SharePoint Online', 'Microsoft Teams', 'Staffbase'],
    description: 'Integration of Staffbase into the Microsoft 365 communication landscape.',
    fullDescription:
      'Managed planning, technical integration, and rollout for Staffbase inside the Microsoft 365 environment to improve internal communication reach and governance.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
  },
];

export const portfolioGroups: PortfolioGroup[] = [
  {
    title: 'AI & Future Workplace',
    subtitle: 'Strategy & Innovation',
    items: [
      {
        name: 'Enterprise AI & RAG',
        description: 'Secure knowledge retrieval architectures on Azure AI Search and internal enterprise content.',
      },
      {
        name: 'Microsoft Copilot Piloting',
        description: 'Governance, use-case design, and adoption programs for Copilot and agents.',
      },
      {
        name: 'AI-Powered ITSM',
        description: 'AI classification and smarter routing inside Atlassian service operations.',
      },
    ],
  },
  {
    title: 'Low-Code Strategy & Governance',
    subtitle: 'Enablement & Control',
    items: [
      {
        name: 'Citizen Developer Initiative',
        description: 'Operating model, guardrails, and training for Power Platform self-service.',
      },
      {
        name: 'XTime Transformation',
        description: 'Migration of legacy workflow logic into Dataverse and model-driven apps.',
      },
    ],
  },
  {
    title: 'Business Process Automation',
    subtitle: 'ERP & Integration',
    items: [
      {
        name: 'Sales Order Automation',
        description: 'End-to-end AI and SAP automation across document intake and order creation.',
        highlight: true,
      },
      {
        name: 'Plant Technical Documentation',
        description: 'SAP-connected technical documentation architecture in SharePoint.',
      },
      {
        name: 'Cross-Platform Integration',
        description: 'Pragmatic integration between business platforms and the Microsoft ecosystem.',
      },
    ],
  },
  {
    title: 'Compliance & Collaboration',
    subtitle: 'Security & Communication',
    items: [
      {
        name: 'High-Security Collaboration',
        description: 'Document collaboration setups tuned for regulated and legal use cases.',
        highlight: true,
      },
      {
        name: 'Workflow Compliance',
        description: 'Embedding checks and policy controls into operational business processes.',
      },
      {
        name: 'Employee Communication',
        description: 'Platform strategy and integration for modern internal communications.',
      },
    ],
  },
];
