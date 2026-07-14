import {
  Server,
  Layout,
  Brain,
  Network,
  Cloud,
  Lightbulb,
} from "lucide-react";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";

const strengths = [
  {
    icon: Brain,
    title: "AI Engineering",
    text: "Agents, RAG, evals, guardrails — shipped to production, not just notebooks.",
  },
  {
    icon: Server,
    title: "Backend",
    text: "FastAPI services with SSE streaming, atomic booking logic, and telemetry.",
  },
  {
    icon: Layout,
    title: "Frontend",
    text: "Next.js + TypeScript UIs: chat widgets, dashboards, booking flows.",
  },
  {
    icon: Network,
    title: "System Design",
    text: "Multi-provider LLM layers, canonical data formats, cache-friendly architecture.",
  },
  {
    icon: Cloud,
    title: "Cloud",
    text: "Docker on Fly.io, Vercel, CI with GitHub Actions — deploy and operate for real.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    text: "Red-team findings, race conditions, cost blowups — find the root cause, fix it, add a test.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="Who I am" />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="space-y-4 text-muted leading-relaxed">
            {profile.aboutParagraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
        <StaggerGroup className="grid gap-4 sm:grid-cols-2">
          {strengths.map((s) => (
            <StaggerItem key={s.title}>
              <Card className="card-hover h-full">
                <s.icon size={20} className="text-accent" aria-hidden />
                <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </Section>
  );
}
