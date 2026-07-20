export const SITE_URL = "https://lqdung-portfolio.vercel.app";

export const profile = {
  name: "Lương Quốc Dũng",
  englishName: "Luong Quoc Dung",
  title: "AI Engineer · Software Engineer",
  typingPhrases: [
    "AI Engineer",
    "LLM Systems Builder",
    "Backend Developer",
    "Full-Stack Engineer",
  ],
  intro:
    "I build production AI systems end to end — from RAG pipelines and agent tool-calling to deployment, telemetry, and cost control. Most AI demos stop at the prompt; I care about what happens after: evals, latency, cost per user, and people who actually book.",
  aboutParagraphs: [
    "Final-year IT student at Thang Long University. For my graduation project I shipped TripNest AI — an AI travel agent running in production with real VietQR payments — and instrumented every turn of it: token cost, tool success rate, conversion funnel.",
    "I like the unglamorous parts of AI engineering: context management, anti-hallucination guardrails, atomic booking logic, and knowing exactly what each user costs per month. Alongside AI work, I operate an enterprise document system at Viettel serving government agencies.",
  ],
  location: "Thanh Trì, Hà Nội, Vietnam",
  email: "lqdung1375@gmail.com",
  phone: "0965 801 265",
  github: "https://github.com/quocdungTlu",
  githubUser: "quocdungTlu",
  avatar: "https://avatars.githubusercontent.com/u/173778884?v=4",
  cvPath: "/cv/CV-Luong-Quoc-Dung-AI.pdf",
  // TODO: bổ sung link LinkedIn khi có
  linkedin: null as string | null,
  // TODO: bổ sung link Facebook nếu muốn hiển thị
  facebook: null as string | null,
  openTo: "Open to AI Engineer internship",
  education: {
    school: "Thang Long University",
    degree: "B.Sc. in Information Technology",
    period: "2021 – 2025",
    detail:
      "Focus: Information Systems, Data Analysis, Web Applications. Graduation project: TripNest AI — AI Travel Agent (deployed to production).",
  },
  leadership: {
    title: "Vice President — Karatedo Club",
    org: "Thang Long University",
    period: "2024 – Present",
    detail: "Lead club operations and organize university-wide events.",
  },
  githubStats: {
    repoCount: 24,
    flagshipCommits: 450,
    liveDeployments: 3, // tripnesttravel.online, cdtn-wheat.vercel.app, backend Fly.io
  },
};
