import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  BrainCircuit,
  Cable,
  Cloud,
  Code2,
  Database,
  GitBranch,
  HeartPulse,
  Layers3,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Workflow
} from "lucide-react";

export const profile = {
  name: "Udhaya Kumar Mallikaarjunan",
  initials: "UKM",
  title: "Software Technologist",
  location: "India",
  email: "udhayakumarmallikaarjunan@gmail.com",
  linkedIn: "https://www.linkedin.com/in/udhaya-kumar-mallikaarjunan-669021113/",
  headline:
    "I build scalable healthcare platforms, distributed systems, and AI-assisted engineering workflows.",
  subtext:
    "7+ years of experience across Java, Spring Boot, Angular, AWS, microservices, event-driven architecture, and healthcare technology.",
  about:
    "Software Technologist with 7+ years of experience building scalable full-stack, cloud-native, and distributed systems, with a strong focus on healthcare technology. I work across solution design, backend microservices, frontend development, API integrations, testing, deployment, and production support. I am also actively exploring Generative AI, Spring AI, RAG, MCP, and AI agents for real-world software and HealthTech use cases."
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  icon: LucideIcon;
};

export const experiences: Experience[] = [
  {
    company: "Philips",
    role: "Software Technologist II",
    period: "Feb 2024 - Present",
    summary:
      "Build cardiac monitoring, virtual care, ECG workflow, and healthcare data integration platforms.",
    highlights: [
      "Work across Java, Spring Boot, Angular, AWS, REST and GraphQL APIs, microservices, event-driven architecture, testing, and production support.",
      "Designed cloud-native communication workflows using AWS services and event-driven messaging patterns.",
      "Contribute to secure authentication, CI/CD, containerized delivery, and production-grade reliability practices."
    ],
    stack: [
      "Java 21",
      "Spring Boot",
      "Angular",
      "AWS",
      "GraphQL",
      "RabbitMQ",
      "PostgreSQL",
      "Kubernetes"
    ],
    icon: HeartPulse
  },
  {
    company: "Carelon",
    role: "Software Engineer II",
    period: "Sep 2021 - Feb 2024",
    summary:
      "Built enterprise healthcare applications for licensing, credentialing, and broker oversight workflows.",
    highlights: [
      "Worked with Angular, Java, Spring Boot, Spring Batch, Kafka, AWS, SQL Server, Docker, and CI/CD.",
      "Improved operational workflows, application maintainability, and performance.",
      "Supported modernization efforts for business-critical enterprise healthcare platforms."
    ],
    stack: ["Angular", "Java", "Spring Batch", "Kafka", "AWS", "SQL Server", "Docker", "Bamboo"],
    icon: ShieldCheck
  },
  {
    company: "Virtusa",
    role: "Associate Software Engineer",
    period: "May 2019 - Aug 2021",
    summary:
      "Worked on enterprise banking applications and Citi Private Banking modernization.",
    highlights: [
      "Contributed to Flex-to-Angular migration, reusable UI components, REST API integration, debugging, and production support.",
      "Collaborated across the full SDLC in Agile teams with a focus on UI modernization and reliable integrations.",
      "Built a practical foundation in enterprise engineering, production support, and cross-functional delivery."
    ],
    stack: ["Angular", "TypeScript", "Java", "Spring Boot", "REST APIs", "Agile", "Production Support"],
    icon: GitBranch
  }
];

export type SkillCluster = {
  name: string;
  icon: LucideIcon;
  skills: string[];
};

export const skillClusters: SkillCluster[] = [
  {
    name: "Cloud & Backend",
    icon: Cloud,
    skills: ["Java", "Spring Boot", "AWS", "Microservices", "Cloud Architecture", "API Design"]
  },
  {
    name: "Frontend",
    icon: Code2,
    skills: ["Angular", "TypeScript", "JavaScript", "REST APIs", "GraphQL", "System Integration"]
  },
  {
    name: "Distributed Systems",
    icon: Workflow,
    skills: ["Event-Driven Architecture", "RabbitMQ", "Kafka", "SQS", "SNS", "Distributed Systems"]
  },
  {
    name: "Database & Messaging",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "SQL Server", "Spring Batch", "AWS S3", "EC2 Workflows"]
  },
  {
    name: "Testing & DevOps",
    icon: TestTube2,
    skills: [
      "JUnit",
      "Mockito",
      "Testcontainers",
      "Jasmine",
      "Karma",
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "GitHub Actions",
      "SonarQube",
      "Black Duck",
      "CI/CD"
    ]
  },
  {
    name: "AI Engineering",
    icon: BrainCircuit,
    skills: [
      "Prompt Engineering",
      "ChatGPT",
      "Claude",
      "GitHub Copilot",
      "Codex",
      "Spring AI",
      "RAG",
      "MCP",
      "AI Agents"
    ]
  }
];

export type Project = {
  title: string;
  description: string;
  stack: string[];
  impact: string;
  icon: LucideIcon;
};

export const projects: Project[] = [
  {
    title: "Healthcare Monitoring Platforms",
    description:
      "Built scalable full-stack healthcare applications supporting cardiac monitoring, ECG workflows, virtual care, and clinical operations.",
    stack: ["Java", "Spring Boot", "Angular", "AWS", "GraphQL", "REST APIs", "RabbitMQ", "MySQL"],
    impact: "Improved platform scalability, workflow reliability, and clinical operations support.",
    icon: HeartPulse
  },
  {
    title: "Cloud Messaging Migration",
    description:
      "Designed cloud-native communication workflows using AWS-native services to improve reliability, scalability, observability, and operational control.",
    stack: ["AWS End User Messaging", "SNS", "SQS", "EC2", "S3", "Spring Boot"],
    impact: "Strengthened communication workflows with cloud-native delivery and messaging patterns.",
    icon: Cable
  },
  {
    title: "Enterprise Workflow Modernization",
    description:
      "Modernized enterprise healthcare and banking workflows through Angular-based UI modernization, REST APIs, batch processing, and cloud integrations.",
    stack: ["Angular", "Java", "Spring Boot", "Spring Batch", "Kafka", "AWS", "SQL Server"],
    impact: "Raised maintainability and performance across complex enterprise application flows.",
    icon: Layers3
  }
];

export const aiKeywords = [
  "Generative AI",
  "Spring AI",
  "RAG",
  "MCP",
  "AI Agents",
  "Prompt Engineering",
  "ChatGPT",
  "Claude",
  "GitHub Copilot",
  "Codex",
  "Agentic Workflows"
];

export const heroSignals = [
  { label: "Healthcare Platforms", icon: HeartPulse },
  { label: "Cloud-Native Systems", icon: Cloud },
  { label: "Event-Driven Architecture", icon: Boxes },
  { label: "AI-Assisted Engineering", icon: Bot },
  { label: "Production Reliability", icon: Sparkles }
];
