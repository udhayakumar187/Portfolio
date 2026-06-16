import type { ActiveSectionId } from "@/hooks/useActiveSection";

export type ConstellationId = "backend-cloud" | "frontend" | "distributed" | "healthcare" | "ai";

export type ConstellationNode = {
  id: string;
  label: string;
};

export type ConstellationGroupConfig = {
  id: ConstellationId;
  name: string;
  color: string;
  nodes: ConstellationNode[];
  edges: Array<[string, string]>;
  sectionRelevance: ActiveSectionId[];
  position: [number, number, number];
  scale: number;
};

export const constellationGroups: ConstellationGroupConfig[] = [
  {
    id: "backend-cloud",
    name: "Backend & Cloud",
    color: "#38bdf8",
    sectionRelevance: ["experience", "skills", "work"],
    position: [-6.6, 8.1, -16],
    scale: 0.74,
    nodes: [
      { id: "java", label: "Java" },
      { id: "spring-boot", label: "Spring Boot" },
      { id: "microservices", label: "Microservices" },
      { id: "aws", label: "AWS" },
      { id: "rest-apis", label: "REST APIs" },
      { id: "graphql", label: "GraphQL" }
    ],
    edges: [
      ["java", "spring-boot"],
      ["spring-boot", "microservices"],
      ["microservices", "aws"],
      ["spring-boot", "rest-apis"],
      ["rest-apis", "graphql"]
    ]
  },
  {
    id: "frontend",
    name: "Frontend",
    color: "#a78bfa",
    sectionRelevance: ["experience", "skills"],
    position: [-2.6, 9.1, -17],
    scale: 0.66,
    nodes: [
      { id: "angular", label: "Angular" },
      { id: "typescript", label: "TypeScript" },
      { id: "javascript", label: "JavaScript" },
      { id: "ui-architecture", label: "UI Architecture" }
    ],
    edges: [
      ["angular", "typescript"],
      ["typescript", "javascript"],
      ["typescript", "ui-architecture"],
      ["angular", "ui-architecture"]
    ]
  },
  {
    id: "distributed",
    name: "Distributed Systems",
    color: "#5eead4",
    sectionRelevance: ["skills", "work"],
    position: [2.1, 8.45, -16.5],
    scale: 0.68,
    nodes: [
      { id: "rabbitmq", label: "RabbitMQ" },
      { id: "kafka", label: "Kafka" },
      { id: "event-driven", label: "Event-Driven Architecture" },
      { id: "distributed-systems", label: "Distributed Systems" },
      { id: "observability", label: "Observability" }
    ],
    edges: [
      ["rabbitmq", "event-driven"],
      ["kafka", "event-driven"],
      ["event-driven", "distributed-systems"],
      ["distributed-systems", "observability"]
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    color: "#f9a8d4",
    sectionRelevance: ["experience", "work"],
    position: [6.2, 9.0, -17.2],
    scale: 0.7,
    nodes: [
      { id: "healthcare-platforms", label: "Healthcare Platforms" },
      { id: "cardiac-monitoring", label: "Cardiac Monitoring" },
      { id: "virtual-care", label: "Virtual Care" },
      { id: "ecg-workflows", label: "ECG Workflows" },
      { id: "data-integration", label: "Data Integration" }
    ],
    edges: [
      ["healthcare-platforms", "cardiac-monitoring"],
      ["healthcare-platforms", "virtual-care"],
      ["cardiac-monitoring", "ecg-workflows"],
      ["virtual-care", "data-integration"],
      ["ecg-workflows", "data-integration"]
    ]
  },
  {
    id: "ai",
    name: "AI Engineering",
    color: "#facc15",
    sectionRelevance: ["skills", "ai"],
    position: [0.4, 10.1, -18],
    scale: 0.76,
    nodes: [
      { id: "generative-ai", label: "Generative AI" },
      { id: "spring-ai", label: "Spring AI" },
      { id: "rag", label: "RAG" },
      { id: "mcp", label: "MCP" },
      { id: "ai-agents", label: "AI Agents" },
      { id: "prompt-engineering", label: "Prompt Engineering" }
    ],
    edges: [
      ["generative-ai", "rag"],
      ["rag", "mcp"],
      ["mcp", "ai-agents"],
      ["ai-agents", "prompt-engineering"],
      ["spring-ai", "ai-agents"],
      ["generative-ai", "prompt-engineering"]
    ]
  }
];
