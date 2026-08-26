export type JourneyExperience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  locationTheme: string;
  story: string;
  contributions: string[];
  tech: string[];
};

export const journeyExperiences: JourneyExperience[] = [
  {
    id: "virtusa",
    company: "Virtusa",
    role: "Associate Software Engineer",
    duration: "May 2019 - Aug 2021",
    locationTheme: "Foundation Bridge",
    story:
      "Started the engineering journey by working on enterprise banking applications and Citi Private Banking modernization. Contributed to Flex-to-Angular migration, reusable UI components, REST API integrations, debugging, and production support.",
    contributions: [
      "Modernized legacy user experiences with Angular and reusable UI patterns.",
      "Integrated REST APIs and supported reliable production workflows.",
      "Built strong foundations in Agile delivery, debugging, and enterprise SDLC."
    ],
    tech: ["Angular", "TypeScript", "Java", "Spring Boot", "REST APIs", "HTML5", "CSS3", "Bootstrap", "Git"]
  },
  {
    id: "carelon",
    company: "Carelon",
    role: "Software Engineer II",
    duration: "Sep 2021 - Feb 2024",
    locationTheme: "Healthcare Forest",
    story:
      "Built enterprise healthcare applications for licensing, credentialing, and broker oversight workflows. Worked on Angular UIs, Java/Spring Boot APIs, Spring Batch jobs, Kafka-based messaging, AWS S3/EC2 workflows, SQL Server, and performance optimization.",
    contributions: [
      "Improved operational workflow maintainability and application performance.",
      "Delivered full-stack healthcare features across UI, API, batch, and messaging layers.",
      "Supported modernization and cloud-integrated file-processing workflows."
    ],
    tech: [
      "Angular",
      "Java",
      "Spring Boot",
      "Spring MVC",
      "REST APIs",
      "Spring Batch",
      "Kafka",
      "AWS S3",
      "AWS EC2",
      "SQL Server",
      "Docker",
      "Bamboo",
      "Git"
    ]
  },
  {
    id: "philips",
    company: "Philips",
    role: "Software Technologist II",
    duration: "Feb 2024 - Present",
    locationTheme: "Cardiac Observatory",
    story:
      "Worked on cardiac monitoring, virtual care, ECG workflows, healthcare data integration, and cloud-native healthcare platforms. Contributed across solution design, backend microservices, frontend development, REST/GraphQL APIs, event-driven systems, testing, deployment, and production support.",
    contributions: [
      "Built high-level healthcare platform capabilities across backend, frontend, integration, and deployment concerns.",
      "Designed cloud-native communication flows with AWS services and event-driven messaging patterns.",
      "Contributed to secure authentication, test automation, CI/CD, and production reliability."
    ],
    tech: [
      "Java 21",
      "Spring Boot",
      "Angular",
      "AWS",
      "REST APIs",
      "GraphQL",
      "RabbitMQ",
      "MySQL",
      "PostgreSQL",
      "OAuth2",
      "Cognito",
      "JWT/JWKS",
      "Docker",
      "Kubernetes",
      "JUnit",
      "Mockito",
      "Testcontainers",
      "Azure DevOps",
      "GitHub Actions"
    ]
  },
  {
    id: "zimmer-biomet",
    company: "Zimmer Biomet",
    role: "Senior Web Developer",
    duration: "2025 - Present",
    locationTheme: "Medical Innovation Hub",
    story:
      "Working on cloud-native healthcare platforms, surgical robotics integration, medical device software, and AI-assisted clinical workflows. Contributing across backend microservices, frontend applications, cloud infrastructure, and regulatory-compliant software delivery.",
    contributions: [
      "Building scalable healthcare platform capabilities for surgical and medical device ecosystems.",
      "Designing cloud-native architectures with AWS/Azure services and event-driven patterns.",
      "Ensuring regulatory compliance, test automation, CI/CD, and production reliability for medical devices."
    ],
    tech: [
      "Java",
      "Spring Boot",
      "Angular",
      "AWS",
      "Azure",
      "REST APIs",
      "GraphQL",
      "Kubernetes",
      "Docker",
      "PostgreSQL",
      "Kafka",
      "OAuth2",
      "JWT",
      "GitHub Actions",
      "GitLab CI"
    ]
  },
  {
    id: "ai-future",
    company: "AI Future",
    role: "Applied Exploration",
    duration: "Current focus",
    locationTheme: "AI Portal",
    story:
      "Exploring the next generation of software engineering through Generative AI, Spring AI, RAG, MCP, AI agents, prompt engineering, and AI-assisted development tools.",
    contributions: [
      "Investigating practical AI-assisted engineering workflows for real software delivery.",
      "Exploring Spring AI, retrieval-augmented generation, and tool-using agent patterns.",
      "Keeping human judgment central while using AI to accelerate engineering loops."
    ],
    tech: ["Spring AI", "RAG", "MCP", "AI Agents", "ChatGPT", "Claude", "GitHub Copilot", "Codex"]
  }
];
