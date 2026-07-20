"use client";

import { useState } from "react";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { Card } from "@/components/ui/card";

/** Ảnh stat từ dịch vụ third-party (hay bị rate-limit) — ẩn gọn khi lỗi thay vì để icon vỡ */
function RemoteStatImage({
  src,
  alt,
  className,
  fallback,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <p className="py-6 text-sm text-faint">{fallback}</p>;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

const stats = [
  { to: profile.githubStats.repoCount, suffix: "", label: "public repositories" },
  { to: profile.githubStats.flagshipCommits, suffix: "+", label: "commits on TripNest AI" },
  { to: profile.githubStats.liveDeployments, suffix: "", label: "live deployments" },
];

export function GitHubStats() {
  const u = profile.githubUser;
  return (
    <Section id="github">
      <SectionHeading
        eyebrow="GitHub"
        title="Activity & contributions"
        description="Live stats pulled from my GitHub profile."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <Card className="text-center">
              <span className="block font-mono text-3xl font-semibold text-accent">
                <Counter to={s.to} suffix={s.suffix} />
              </span>
              <span className="mt-1 block text-xs tracking-wide text-faint uppercase">
                {s.label}
              </span>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <Card className="overflow-x-auto">
            <h3 className="mb-4 text-sm font-semibold">Contribution heatmap</h3>
            {/* SVG heatmap từ ghchart — render phía server của họ, chỉ là <img> */}
            <RemoteStatImage
              src={`https://ghchart.rshah.org/10b981/${u}`}
              alt={`Biểu đồ contribution GitHub của ${u}`}
              className="w-full min-w-[560px]"
              fallback="Không tải được contribution heatmap ngay lúc này — xem trực tiếp trên GitHub."
            />
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="flex h-full flex-col">
            <h3 className="mb-4 text-sm font-semibold">Top languages</h3>
            <RemoteStatImage
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=transparent&hide_border=true&text_color=9d9da8&title_color=ededf0&bg_color=00000000`}
              alt={`Ngôn ngữ dùng nhiều nhất của ${u}`}
              className="w-full"
              fallback="Không tải được biểu đồ ngôn ngữ ngay lúc này — xem trực tiếp trên GitHub."
            />
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 pt-4 text-sm text-accent hover:underline underline-offset-4"
            >
              <GithubIcon size={15} aria-hidden />
              Full profile on GitHub →
            </a>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
