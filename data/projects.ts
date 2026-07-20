import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "tripnest-ai",
    name: "TripNest AI",
    tagline: "Production AI travel agent with real payments",
    role: "Solo developer — design, build, deploy, operate",
    period: "05/2026 — 07/2026",
    featured: true,
    summary:
      "An AI travel agent for the Vietnamese market, running in production: LLM tool calling across 11 agent tools, RAG over a 96-room knowledge base, and a full booking flow with VietQR payments — instrumented down to cost per user per month.",
    tech: [
      "FastAPI",
      "Next.js 14",
      "Claude Haiku 4.5",
      "GPT-4.1 mini",
      "LangChain",
      "ChromaDB",
      "Supabase PostgreSQL",
      "Docker",
      "Fly.io",
      "Vercel",
    ],
    links: {
      github: "https://github.com/quocdungTlu/C2-App-031",
      demo: "https://tripnesttravel.online",
    },
    metrics: [
      { value: "11", label: "agent tools", countTo: 11 },
      { value: "255", label: "automated tests", countTo: 255 },
      { value: "20/20", label: "RAG eval pass" },
      { value: "9/9", label: "e2e booking flows" },
      { value: "~$0.17", label: "LLM cost / user / mo" },
    ],
    overview: [
      "TripNest AI is my graduation project, built end to end and deployed to production (web app, real VietQR payment flow, Google/Facebook SSO). A user chats with the agent, gets explainable room recommendations via a 5-criteria Match Score, builds an itinerary, and completes a booking — all in one conversation.",
      "The agent orchestrates 11 tools (room search, pricing, policy Q&A, itinerary builder, combo builder, weather, budget optimizer, preference saving…) over a knowledge base of 96 rooms across 10 Vietnamese cities, grounded by a RAG pipeline with a 20-question evaluation suite that must pass 20/20 before any KB change ships.",
      "Beyond features, the project is instrumented like a product: per-turn token/cost/latency telemetry, an admin analytics dashboard with a booking conversion funnel, deterministic A/B prompt experiments, and a documented cost model (~$0.17 per active user per month after prompt caching).",
    ],
    features: [
      "Conversational booking: search → Match Score recommendation → itinerary → VietQR payment → confirmation, in one chat",
      "Multi-provider LLM layer behind a feature flag (Claude Haiku 4.5 / GPT-4.1 mini) with a canonical message format — swap providers via one env var, safe A/B and rollback",
      "LLM context management: history summarization, tool-result pruning, cache-friendly prompt structure, DB-persisted sessions with TTL eviction",
      "Guest DNA personalization: implicit preference learning, explainable recommendations, multi-session memory",
      "Atomic inventory: PostgreSQL advisory locks prevent overbooking under concurrent checkout (409/422 semantics)",
      "Admin analytics: per-turn cost tracking, tool success rate, funnel, trace & guardrail views",
      "Safety stack: pre-LLM credit-card blocking, prompt-injection defense, 5-layer anti-hallucination grounding",
    ],
    architecture: [
      [
        { id: "user", label: "User", sublabel: "web · chat widget", kind: "default" },
      ],
      [
        {
          id: "fe",
          label: "Next.js 14 Frontend",
          sublabel: "Vercel · SSE streaming UI",
          kind: "primary",
        },
      ],
      [
        {
          id: "be",
          label: "FastAPI Backend",
          sublabel: "Fly.io · AgentService · 11 tools",
          kind: "primary",
        },
      ],
      [
        {
          id: "llm",
          label: "LLM Provider Layer",
          sublabel: "Claude Haiku 4.5 ⇄ GPT-4.1 mini (feature flag)",
          kind: "external",
        },
        {
          id: "rag",
          label: "RAG Pipeline",
          sublabel: "LangChain + ChromaDB · 96 rooms / 10 cities",
          kind: "store",
        },
        {
          id: "db",
          label: "Supabase PostgreSQL",
          sublabel: "bookings · sessions · telemetry",
          kind: "store",
        },
        {
          id: "pay",
          label: "VietQR",
          sublabel: "payment webhook (HMAC)",
          kind: "external",
        },
      ],
    ],
    database: [
      { name: "chat_sessions", purpose: "Per-user conversation history in a canonical (provider-agnostic) message format, with title + TTL eviction" },
      { name: "bookings", purpose: "Bookings with quantity; overbooking prevented atomically via PostgreSQL advisory locks" },
      { name: "rooms / availability", purpose: "96-room inventory with per-date availability as the single source of truth" },
      { name: "price_alerts", purpose: "Persisted price alerts scanned daily by a scheduler" },
      { name: "loyalty_points", purpose: "VinClub-style points with row-level locking against race conditions" },
      { name: "telemetry", purpose: "Per-turn token/cost/latency + tool success, feeding the admin analytics dashboard" },
    ],
    folderStructure: `C2-App-031/
├── frontend/          # Next.js 14 (TypeScript) — chat widget, booking UI, admin dashboard
├── backend/           # FastAPI (Python 3.11+)
│   ├── routers/       #   REST + SSE endpoints
│   ├── services/      #   agent, LLM provider layer, availability, telemetry
│   ├── models/        #   SQLAlchemy models
│   └── knowledge_base/ #  RAG source documents (Q&A-formatted policies)
├── agent_docs/        # Context files for AI-assisted development
└── docs/              # PRD, tech design, API reference, eval evidence`,
    challenges: [
      {
        problem:
          "The agent hallucinated rooms, prices, and policies — unacceptable when real money is involved.",
        solution:
          "Built a 5-layer grounding stack: city filtering, canonical policy retrieval from the KB, JSON stripping, unaccented Vietnamese matching, and eval gates (20/20 retrieval suite must pass before shipping KB changes).",
      },
      {
        problem:
          "Concurrent checkouts could overbook the same room on the same dates.",
        solution:
          "Made booking creation atomic with PostgreSQL advisory locks and explicit conflict semantics (409 on inventory conflict, 422 on capacity violations), verified by end-to-end tests.",
      },
      {
        problem:
          "LLM costs would not survive contact with real usage at consumer prices.",
        solution:
          "Prompt caching on the system prompt (~90% cheaper cached input), history summarization, and tool-result pruning — landing at ~$0.17 per active user per month, with per-model pricing tracked in telemetry.",
      },
      {
        problem:
          "Red-team testing showed the agent could be talked into confirming a payment that never happened.",
        solution:
          "Moved payment confirmation out of the LLM entirely: a server-verified sentinel is required before the agent may congratulate, and the post-payment turn is deterministic (no LLM in the money path).",
      },
    ],
    lessons: [
      "Evals before features: the 20-question retrieval suite caught more regressions than any code review.",
      "Store conversation history in one canonical format — swapping LLM providers became a one-line env change instead of a migration.",
      "Anything touching money should be deterministic; the LLM proposes, the server decides.",
      "Telemetry from day one turns 'it feels expensive' into 'turn 7 costs $0.004 and here is why'.",
    ],
    timeline:
      "≈10 weeks (05/2026 → 07/2026) · 450+ commits · production since June 2026",
    futureImprovements: [
      "Verify VietQR against a real bank account (currently sandbox-verified)",
      "Multilingual embeddings in production (built, deferred: torch exceeds the 512MB deployment budget)",
      "Distributed session store to scale past a single backend machine",
    ],
    // TODO: thêm screenshot thật vào public/projects/tripnest/*.png rồi khai báo ở đây
    screenshots: [],
  },
  {
    slug: "ubndai-tthc-assist",
    name: "TTHC Assist (UBNDAI)",
    tagline: "AI hướng dẫn & kiểm tra hồ sơ thủ tục hành chính",
    role: "Core contributor (team 4 người, hackathon 48h) — OCR pipeline, agent/retrieval, evals, deployment",
    period: "07/2026",
    featured: false,
    summary:
      "Trợ lý AI cho thủ tục hành chính công: người dân mô tả nhu cầu bằng ngôn ngữ tự nhiên, nhận checklist cá nhân hoá, chụp ảnh giấy tờ để OCR tự điền biểu mẫu, và được kiểm tra hồ sơ trước khi nộp — mọi hướng dẫn đều truy vết được về căn cứ pháp lý.",
    tech: [
      "FastAPI",
      "LangGraph",
      "Claude Haiku 4.5",
      "Chroma + BM25 hybrid RAG",
      "Vision LLM OCR (GPT-5-mini)",
      "React",
      "Vite",
      "TypeScript",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Docker",
      "Render",
      "Vercel",
    ],
    links: {
      github: "https://github.com/quocdungTlu/UBNDAI",
      demo: "https://c3-tthc-assistant.onrender.com/citizen",
    },
    metrics: [
      { value: "333/334", label: "test suite pass", countTo: 333 },
      { value: "75", label: "API endpoints", countTo: 75 },
      { value: "0/60", label: "chốt nhầm thủ tục" },
      { value: "5·17", label: "thủ tục · rule khai báo" },
      { value: "~0,016$", label: "chi phí LLM / hồ sơ" },
    ],
    overview: [
      "TTHC Assist (tên nội bộ UBNDAI) là dự án hackathon 48 giờ do một đội 4 người xây dựng: người dân chat mô tả nhu cầu, hệ thống làm rõ và trả về checklist giấy tờ cá nhân hoá, sau đó chụp/scan giấy tờ để OCR tự điền biểu mẫu và kiểm tra hồ sơ trước khi nộp. Cán bộ có dashboard riêng để theo dõi, phân công và nhận cảnh báo bất thường.",
      "Nguyên tắc sản phẩm xuyên suốt: hệ thống chỉ hỗ trợ hướng dẫn và kiểm tra — cơ quan có thẩm quyền vẫn ra quyết định cuối cùng, và mọi hướng dẫn phải truy vết được về đúng thủ tục/căn cứ pháp lý trong catalog. Nhận diện thủ tục và trả lời câu hỏi pháp luật dùng hai nguồn tách biệt (catalog thủ tục vs. corpus văn bản pháp luật) để tránh AI suy diễn giấy tờ, lệ phí hay thời hạn không có căn cứ.",
      "Tôi phụ trách OCR pipeline (vision-LLM, đa nhà cung cấp qua env, ngưỡng confidence → needs_human_review), một phần agent/retrieval (hybrid dense+BM25, intent routing), bộ eval nhận diện thủ tục ba-bộ (in-catalog/out-of-catalog/held-out), và pipeline deploy (Docker, Render backend + Vercel frontend rewrite, Alembic auto-migrate).",
    ],
    features: [
      "Chat NL → làm rõ → checklist cá nhân hoá, mỗi câu trả lời về thủ tục đều kèm citation truy vết được nguồn",
      "OCR vision-LLM đọc cả chữ in lẫn viết tay, structured output + bbox, cache theo hash ảnh, fallback needs_human_review khi confidence thấp",
      "Sinh bản nháp kết quả thủ tục (PDF/DOCX) theo đúng thể thức pháp lý từng mẫu, luôn có watermark DỰ THẢO — KHÔNG CÓ GIÁ TRỊ PHÁP LÝ",
      "Rule engine khai báo (YAML) là tầng duy nhất được phát severity=error; AI chỉ được warning/info — cưỡng chế ở tầng kiểu dữ liệu (Pydantic validator), không chỉ dặn trong prompt",
      "Dashboard cán bộ: theo dõi hồ sơ, tự phân công, xác nhận trường hợp AI chưa chắc chắn",
    ],
    challenges: [
      {
        problem:
          "Với thủ tục hành chính, 'chốt nhầm' thủ tục tệ hơn nhiều so với 'không biết' — chốt sai làm hỏng toàn bộ checklist phía sau.",
        solution:
          "Thiết kế eval ba bộ tách bạch (in-catalog/out-of-catalog/held-out) thay vì một con số gộp gây đánh lừa; đo riêng tỉ lệ chốt nhầm (đạt 0/60) và độ chính xác nhận diện theo từng bộ để không tự huyễn hoặc bằng eval overfit.",
      },
      {
        problem:
          "Prompt-only guardrail có thể bị mô hình bỏ qua khi risk cao (hướng dẫn sai có thể khiến người dân xây nhà không phép).",
        solution:
          "Đẩy các ràng buộc quan trọng nhất xuống tầng kiểu dữ liệu và schema: AI không thể tạo ValidationIssue với severity=error (Pydantic model_validator ném exception), checklist chỉ sinh từ catalog qua kiến trúc graph — không có đường để LLM tự chèn mục.",
      },
      {
        problem:
          "Mẫu kết quả thủ tục (VD: Giấy khai sinh) đòi hỏi đúng thể thức pháp lý (font, cỡ chữ, giãn dòng, kích thước bảng theo phụ lục thông tư) — không thể dùng một style chung cho mọi mẫu.",
        solution:
          "Mỗi template khai báo docx_style riêng (python-docx, OOXML) theo đúng phụ lục thông tư liên quan, test kiểm trực tiếp các thuộc tính OOXML để tránh lệch định dạng khi renderer thay đổi.",
      },
    ],
    lessons: [
      "Một con số eval gộp có thể che cả điểm mạnh lẫn điểm yếu — tách bộ theo mục đích đo (index có vỡ không / độ phủ thật / có tổng quát hoá hay chỉ overfit) mới đáng tin.",
      "Guardrail đáng tin phải nằm ở kiến trúc/kiểu dữ liệu, không phải ở system prompt — đặc biệt với hệ thống có rủi ro thật nếu sai (hành chính công, pháp lý).",
      "Tài liệu (docs/, ARCHITECTURE.md, eval evidence) cập nhật song song với code giúp bàn giao giữa 4 người không bị lệch trong 48 giờ hackathon.",
    ],
    timeline: "Hackathon 48 giờ (07/2026) · team 4 người · deploy Render + Vercel",
    futureImprovements: [
      "JWT ownership cho case_id (hiện case_id chưa phải cơ chế auth), rate limit, case expiration, idempotency key trước khi public deployment",
      "Mở rộng bộ held-out eval để đo tổng quát hoá tốt hơn ngoài 15 câu hiện tại",
      "SQLite MVP → PostgreSQL production ở nhiều worker hơn (hiện chỉ khuyến nghị 1 worker)",
    ],
    // TODO: thêm screenshot dashboard cán bộ / chat citizen vào public/projects/ubndai/*.png rồi khai báo ở đây
    screenshots: [],
  },
  {
    slug: "dpo-alignment-lab",
    name: "DPO / ORPO Alignment Lab",
    tagline: "Fine-tuning Qwen2.5-3B with preference optimization",
    role: "Lab author",
    period: "06/2026",
    featured: false,
    summary:
      "Hands-on alignment training beyond API-level work: fine-tuned Qwen2.5-3B with Direct Preference Optimization and ORPO, comparing preference-optimization strategies on a small open model.",
    tech: ["Python", "Jupyter", "Qwen2.5-3B", "DPO", "ORPO", "Transformers"],
    links: {
      github: "https://github.com/quocdungTlu/Day22-Track3-DPO-Alignment-Lab",
    },
    overview: [
      "Most of my LLM work is at the systems level (agents, RAG, telemetry). This lab goes one layer down: aligning a small open model with preference data.",
      "I fine-tuned Qwen2.5-3B using DPO and ORPO, working through preference-pair data preparation, training runs, and before/after output comparison.",
    ],
    lessons: [
      "Preference optimization is data-bound: pair quality dominates hyperparameters.",
      "Small models make alignment trade-offs visible fast — useful intuition even when production runs on hosted APIs.",
    ],
    // TODO: bổ sung kết quả định lượng (loss curves / win-rate) từ notebook nếu muốn nêu số liệu
    screenshots: [],
  },
  {
    slug: "multi-agent-lab",
    name: "Multi-Agent Architecture Lab",
    tagline: "Routing and shared state across specialized agents",
    role: "Lab author",
    period: "06/2026",
    featured: false,
    summary:
      "Coordinated multiple LLM agents with routing and shared state — patterns for splitting work across specialized agents instead of one monolithic prompt.",
    tech: ["Python", "LLM Agents", "Orchestration"],
    links: {
      github: "https://github.com/quocdungTlu/2A202600601-Day09-MultiAgent-Architecture",
    },
    overview: [
      "Explored when multi-agent designs beat a single agent: routing user intents to specialists, sharing state between agents, and keeping the orchestration debuggable.",
      "Patterns from this lab informed how TripNest AI structures its planner + parallel tool execution.",
    ],
    screenshots: [],
  },
  {
    slug: "data-pipeline-lab",
    name: "Data Pipeline & Observability Lab",
    tagline: "Data quality checks and monitoring for ML-ready data",
    role: "Lab author",
    period: "06/2026",
    featured: false,
    summary:
      "Built a data pipeline with observability baked in — data quality checks and monitoring so bad data is caught before it reaches a model.",
    tech: ["Python", "Data Pipelines", "Observability"],
    links: {
      github:
        "https://github.com/quocdungTlu/2A202600601_Day-10-Data-Pipeline-Data-Observability",
    },
    overview: [
      "A pipeline is only as good as its failure visibility: this lab wires quality checks and monitoring into each stage instead of bolting them on at the end.",
    ],
    screenshots: [],
  },
  {
    slug: "cdtn-ecommerce",
    name: "Computer Components Store",
    tagline: "E-commerce storefront for PC parts",
    role: "Front-end developer",
    period: "2025",
    featured: false,
    summary:
      "E-commerce storefront for computer components — built the UI and optimized the product-display flow. Live on Vercel.",
    tech: ["ReactJS", "Vite", "JavaScript"],
    links: {
      github: "https://github.com/quocdungTlu/CDTN",
      demo: "https://cdtn-wheat.vercel.app",
    },
    overview: [
      "A storefront for PC components: product listing, detail pages, and an optimized product-display flow. My earliest deployed React project — kept here to show range beyond AI work.",
    ],
    screenshots: [],
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
export const otherProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
