export type QuestProject = {
  title: string;
  description: string;
  tech: string[];
  impact: string;
  role: string;
};

export const questProjects: QuestProject[] = [
  {
    title: "Healthcare Monitoring Platforms",
    description:
      "Built scalable full-stack healthcare applications supporting cardiac monitoring, ECG workflows, virtual care, and clinical operations.",
    tech: ["Java", "Spring Boot", "Angular", "AWS", "GraphQL", "REST APIs", "RabbitMQ", "MySQL"],
    impact: "Supported scalable clinical workflows and reliable healthcare platform experiences.",
    role: "Full-stack platform engineering"
  },
  {
    title: "Cloud Messaging Migration",
    description:
      "Designed cloud-native communication workflows using AWS-native services to improve reliability, scalability, observability, and operational control.",
    tech: ["AWS End User Messaging", "SNS", "SQS", "EC2", "S3", "Spring Boot"],
    impact: "Improved delivery resilience and operational control through event-driven AWS patterns.",
    role: "Cloud communication architecture"
  },
  {
    title: "Enterprise Workflow Modernization",
    description:
      "Modernized enterprise healthcare and banking workflows through Angular-based UI modernization, REST APIs, batch processing, and cloud integrations.",
    tech: ["Angular", "Java", "Spring Boot", "Spring Batch", "Kafka", "AWS", "SQL Server"],
    impact: "Raised maintainability, workflow clarity, and platform performance in complex enterprise systems.",
    role: "Modernization and integration"
  }
];
