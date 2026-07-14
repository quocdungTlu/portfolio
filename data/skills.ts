import type { TechGroup, SkillTag } from "@/types";

export const techGroups: TechGroup[] = [
  {
    name: "AI Engineering",
    icon: "brain",
    items: [
      "LLMs (Claude, OpenAI)",
      "RAG (LangChain, ChromaDB)",
      "AI Agents & Tool Calling",
      "Prompt Engineering & Evals",
      "Recommendation Systems",
    ],
  },
  {
    name: "Backend",
    icon: "server",
    items: [
      "Python",
      "FastAPI",
      "REST APIs",
      "SSE Streaming",
      "SQLAlchemy",
      "Node.js",
      "Pytest",
    ],
  },
  {
    name: "Frontend",
    icon: "layout",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "HTML/CSS/JS",
    ],
  },
  {
    name: "Database",
    icon: "database",
    items: ["PostgreSQL (Supabase)", "MySQL", "ChromaDB", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    name: "Cloud & DevOps",
    icon: "cloud",
    items: ["Docker", "Fly.io", "Vercel", "GitHub Actions (CI)", "Git/GitHub"],
  },
  {
    name: "Tools",
    icon: "wrench",
    items: ["VS Code", "Claude Code", "Postman", "Figma"],
  },
];

export const skillTags: SkillTag[] = [
  { name: "Python / FastAPI", level: "Proficient" },
  { name: "LLM Agents & Tool Calling", level: "Proficient" },
  { name: "RAG (LangChain + ChromaDB)", level: "Proficient" },
  { name: "React / Next.js / TypeScript", level: "Proficient" },
  { name: "Prompt Engineering & Evaluation", level: "Proficient" },
  { name: "PostgreSQL / SQLAlchemy", level: "Comfortable" },
  { name: "Docker / Fly.io / Vercel", level: "Comfortable" },
  { name: "Telemetry & Cost Optimization", level: "Comfortable" },
  { name: "CI (GitHub Actions)", level: "Comfortable" },
  { name: "Model Fine-tuning (DPO/ORPO)", level: "Familiar" },
  { name: "Multi-Agent Orchestration", level: "Familiar" },
  { name: "Data Pipelines & Observability", level: "Familiar" },
];
