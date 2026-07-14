import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { featuredProject, otherProjects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Counter } from "@/components/motion/counter";
import { ProjectCover } from "@/components/project-cover";

export function Projects() {
  const p = featuredProject;
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Things I've built"
        description="Selected work — the flagship is in production with real users and real payments."
      />

      {/* Featured: TripNest AI */}
      <Reveal>
        <article className="card-hover overflow-hidden rounded-xl border border-edge bg-surface">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <ProjectCover project={p} className="min-h-56 lg:min-h-full" />
            <div className="p-7 sm:p-9">
              <p className="font-mono text-xs text-accent">{p.period} · production</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-1 text-sm text-faint">{p.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{p.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.tech.slice(0, 6).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
                <Badge tone="accent">+{p.tech.length - 6} more</Badge>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Link
                  href={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-[#04110c] transition-colors hover:bg-[#34d39b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  View Detail
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
                {p.links.demo ? (
                  <a
                    href={p.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <ExternalLink size={14} aria-hidden />
                    Live demo
                  </a>
                ) : null}
                {p.links.github ? (
                  <a
                    href={p.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <GithubIcon size={14} aria-hidden />
                    Source
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {/* Metric strip */}
          {p.metrics ? (
            <div className="grid grid-cols-2 border-t border-edge sm:grid-cols-5">
              {p.metrics.map((m) => (
                <div
                  key={m.label}
                  className="border-r border-b border-edge px-4 py-5 text-center last:border-r-0 sm:border-b-0"
                >
                  <span className="block font-mono text-xl font-semibold text-accent">
                    {m.countTo !== undefined ? (
                      <Counter to={m.countTo} prefix={m.prefix} suffix={m.suffix} />
                    ) : (
                      m.value
                    )}
                  </span>
                  <span className="mt-1 block text-xs text-faint uppercase tracking-wide">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </article>
      </Reveal>

      {/* Các project khác */}
      <StaggerGroup className="mt-6 grid gap-4 sm:grid-cols-2">
        {otherProjects.map((proj) => (
          <StaggerItem key={proj.slug}>
            <article className="card-hover flex h-full flex-col rounded-xl border border-edge bg-surface p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold">{proj.name}</h3>
                <span className="font-mono text-xs text-faint tabular-nums">{proj.period}</span>
              </div>
              <p className="mt-0.5 text-xs text-accent">{proj.tagline}</p>
              <p className="mt-3 flex-1 text-sm text-muted">{proj.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {proj.tech.slice(0, 4).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-4 border-t border-edge pt-4">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
                >
                  View Detail
                  <ArrowUpRight size={14} aria-hidden />
                </Link>
                {proj.links.demo ? (
                  <a
                    href={proj.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
                  >
                    <ExternalLink size={13} aria-hidden />
                    Demo
                  </a>
                ) : null}
                {proj.links.github ? (
                  <a
                    href={proj.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
                  >
                    <GithubIcon size={13} aria-hidden />
                    Source
                  </a>
                ) : null}
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
