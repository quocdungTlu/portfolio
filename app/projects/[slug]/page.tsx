import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Database,
  FolderTree,
  Flame,
  GraduationCap,
  CalendarRange,
  Rocket,
  ImageIcon,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects, getProject } from "@/data/projects";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Counter } from "@/components/motion/counter";
import { FlowDiagram } from "@/components/flow-diagram";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

function DetailSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="mb-12">
        <h2 className="mb-5 flex items-center gap-2.5 text-xl font-semibold tracking-tight">
          <Icon size={19} className="text-accent" aria-hidden />
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="relative overflow-hidden border-b border-edge">
          <div aria-hidden className="absolute inset-0 bg-grid" />
          <div
            aria-hidden
            className="absolute top-[-40%] left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent/8 blur-[120px]"
          />
          <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-14">
            <Reveal>
              <Link
                href="/#projects"
                className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft size={15} aria-hidden />
                All projects
              </Link>
              <p className="font-mono text-xs text-accent">{p.period}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                {p.name}
              </h1>
              <p className="mt-3 text-lg text-muted">{p.tagline}</p>
              <p className="mt-1.5 text-sm text-faint">{p.role}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {p.links.demo ? (
                  <a
                    href={p.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-[#04110c] transition-colors hover:bg-[#34d39b]"
                  >
                    <ExternalLink size={14} aria-hidden />
                    Live Demo
                  </a>
                ) : null}
                {p.links.github ? (
                  <a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-white/[0.07]"
                  >
                    <GithubIcon size={14} aria-hidden />
                    Source Code
                  </a>
                ) : null}
              </div>
            </Reveal>

            {p.metrics ? (
              <Reveal delay={0.1}>
                <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-5">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="bg-surface px-3 py-4 text-center">
                      <span className="block font-mono text-lg font-semibold text-accent">
                        {m.countTo !== undefined ? (
                          <Counter to={m.countTo} prefix={m.prefix} suffix={m.suffix} />
                        ) : (
                          m.value
                        )}
                      </span>
                      <span className="mt-0.5 block text-[11px] tracking-wide text-faint uppercase">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 py-14">
          <DetailSection icon={Rocket} title="Overview">
            <div className="space-y-4 leading-relaxed text-muted">
              {p.overview.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
            </div>
            {p.timeline ? (
              <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-edge bg-surface px-4 py-2.5 font-mono text-xs text-muted">
                <CalendarRange size={14} className="text-accent" aria-hidden />
                {p.timeline}
              </p>
            ) : null}
          </DetailSection>

          {p.features?.length ? (
            <DetailSection icon={CheckCircle2} title="Key Features">
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.features.map((f) => (
                  <li
                    key={f.slice(0, 32)}
                    className="flex gap-3 rounded-lg border border-edge bg-surface p-4 text-sm text-muted"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 flex-none text-accent"
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </DetailSection>
          ) : null}

          {p.architecture ? (
            <DetailSection icon={FolderTree} title="Architecture">
              <Card className="overflow-x-auto p-6 sm:p-8">
                <FlowDiagram rows={p.architecture} />
              </Card>
            </DetailSection>
          ) : null}

          <DetailSection icon={CheckCircle2} title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <Badge key={t} tone="accent">
                  {t}
                </Badge>
              ))}
            </div>
          </DetailSection>

          {p.database?.length ? (
            <DetailSection icon={Database} title="Database Design">
              <div className="overflow-x-auto rounded-xl border border-edge">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-edge bg-surface-2 text-left">
                      <th className="px-5 py-3 font-mono text-xs font-medium text-faint uppercase">
                        Table
                      </th>
                      <th className="px-5 py-3 font-mono text-xs font-medium text-faint uppercase">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.database.map((t) => (
                      <tr key={t.name} className="border-b border-edge last:border-0">
                        <td className="px-5 py-3.5 font-mono text-xs text-accent whitespace-nowrap">
                          {t.name}
                        </td>
                        <td className="px-5 py-3.5 text-muted">{t.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DetailSection>
          ) : null}

          {p.folderStructure ? (
            <DetailSection icon={FolderTree} title="Folder Structure">
              <pre className="overflow-x-auto rounded-xl border border-edge bg-surface p-5 font-mono text-xs leading-relaxed text-muted">
                {p.folderStructure}
              </pre>
            </DetailSection>
          ) : null}

          {p.screenshots && p.screenshots.length > 0 ? (
            <DetailSection icon={ImageIcon} title="Screenshots">
              {/* Ảnh khai báo trong data/projects.ts, đặt tại public/projects/<slug>/ */}
              <div className="grid gap-4 sm:grid-cols-2">
                {p.screenshots.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={src}
                    src={src}
                    alt={`Screenshot ${p.name}`}
                    loading="lazy"
                    className="rounded-xl border border-edge"
                  />
                ))}
              </div>
            </DetailSection>
          ) : null}

          {p.challenges?.length ? (
            <DetailSection icon={Flame} title="Challenges & Solutions">
              <div className="space-y-4">
                {p.challenges.map((c) => (
                  <Card key={c.problem.slice(0, 32)} className="p-5">
                    <p className="text-sm font-medium text-foreground">
                      <span className="font-mono text-xs text-red-400/90 uppercase tracking-wide">
                        Problem ·{" "}
                      </span>
                      {c.problem}
                    </p>
                    <p className="mt-3 text-sm text-muted">
                      <span className="font-mono text-xs text-accent uppercase tracking-wide">
                        Solution ·{" "}
                      </span>
                      {c.solution}
                    </p>
                  </Card>
                ))}
              </div>
            </DetailSection>
          ) : null}

          {p.lessons?.length ? (
            <DetailSection icon={GraduationCap} title="Lessons Learned">
              <ul className="space-y-2.5">
                {p.lessons.map((l) => (
                  <li key={l.slice(0, 32)} className="flex gap-3 text-sm text-muted">
                    <span aria-hidden className="mt-[9px] h-px w-4 flex-none bg-accent/60" />
                    {l}
                  </li>
                ))}
              </ul>
            </DetailSection>
          ) : null}

          {p.futureImprovements?.length ? (
            <DetailSection icon={Rocket} title="Future Improvements">
              <ul className="space-y-2.5">
                {p.futureImprovements.map((f) => (
                  <li key={f.slice(0, 32)} className="flex gap-3 text-sm text-muted">
                    <span aria-hidden className="mt-[9px] h-px w-4 flex-none bg-accent-2/60" />
                    {f}
                  </li>
                ))}
              </ul>
            </DetailSection>
          ) : null}

          <Reveal>
            <div className="mt-4 flex items-center justify-between border-t border-edge pt-8">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
              >
                <ArrowLeft size={15} aria-hidden />
                All projects
              </Link>
              {p.links.github ? (
                <a
                  href={p.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline underline-offset-4"
                >
                  <GithubIcon size={15} aria-hidden />
                  View source on GitHub
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
