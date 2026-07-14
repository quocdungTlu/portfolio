export type ProjectLink = {
  github?: string;
  demo?: string;
};

export type Metric = {
  value: string;
  label: string;
  /** Khi có, Counter sẽ đếm tới số này; value dùng làm fallback tĩnh */
  countTo?: number;
  suffix?: string;
  prefix?: string;
};

export type FlowNode = {
  id: string;
  label: string;
  sublabel?: string;
  /** Nhóm màu: primary (accent), store (dữ liệu), external */
  kind?: "primary" | "store" | "external" | "default";
};

export type FlowRow = FlowNode[];

export type Challenge = {
  problem: string;
  solution: string;
};

export type DbTable = {
  name: string;
  purpose: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  period: string;
  featured: boolean;
  summary: string;
  tech: string[];
  links: ProjectLink;
  metrics?: Metric[];
  /** Trang detail */
  overview: string[];
  features?: string[];
  /** Sơ đồ kiến trúc: các hàng node, mũi tên nối giữa các hàng */
  architecture?: FlowRow[];
  database?: DbTable[];
  folderStructure?: string;
  challenges?: Challenge[];
  lessons?: string[];
  timeline?: string;
  futureImprovements?: string[];
  /** Đường dẫn ảnh trong /public; nếu rỗng sẽ hiển thị cover sinh tự động */
  image?: string;
  screenshots?: string[];
};

export type ExperienceItem = {
  company: string;
  title: string;
  period: string;
  achievements: string[];
};

export type TechGroup = {
  name: string;
  icon: string; // tên icon lucide, map trong component
  items: string[];
};

export type SkillLevel = "Proficient" | "Comfortable" | "Familiar";

export type SkillTag = {
  name: string;
  level: SkillLevel;
};
