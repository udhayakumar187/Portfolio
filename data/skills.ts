export type SkillGroup = {
  category: string;
  artifact: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend & Cloud",
    artifact: "Signal Core",
    skills: ["Java", "Spring Boot", "AWS", "Microservices", "REST APIs", "GraphQL"]
  },
  {
    category: "Frontend",
    artifact: "Interface Lens",
    skills: ["Angular", "TypeScript", "JavaScript", "HTML5", "CSS3"]
  },
  {
    category: "Distributed Systems",
    artifact: "Event Compass",
    skills: ["RabbitMQ", "Kafka", "Event-Driven Architecture", "Distributed Systems"]
  },
  {
    category: "Databases",
    artifact: "Data Crystal",
    skills: ["MySQL", "PostgreSQL", "SQL Server"]
  },
  {
    category: "DevOps & Testing",
    artifact: "Reliability Kit",
    skills: [
      "Docker",
      "Kubernetes",
      "Azure DevOps",
      "GitHub Actions",
      "JUnit",
      "Mockito",
      "Testcontainers",
      "Jasmine",
      "Karma"
    ]
  },
  {
    category: "AI Engineering",
    artifact: "Future Beacon",
    skills: ["Spring AI", "RAG", "MCP", "AI Agents", "Prompt Engineering", "ChatGPT", "Claude", "GitHub Copilot", "Codex"]
  }
];
