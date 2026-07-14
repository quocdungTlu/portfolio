import { experience } from "@/data/experience";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Where I've worked" />
      <div className="relative ml-2 border-l border-edge pl-8">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.08} className="relative pb-12 last:pb-0">
            {/* Chấm timeline */}
            <span
              aria-hidden
              className="absolute top-1.5 -left-[37px] h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(16,185,129,0.6)]"
            />
            <p className="font-mono text-xs text-faint tabular-nums">{job.period}</p>
            <h3 className="mt-1.5 text-lg font-semibold">
              {job.title}
              <span className="text-muted"> · </span>
              <span className="text-accent">{job.company}</span>
            </h3>
            <ul className="mt-3 space-y-2">
              {job.achievements.map((a) => (
                <li key={a.slice(0, 32)} className="flex gap-3 text-sm text-muted">
                  <span aria-hidden className="mt-[9px] h-px w-4 flex-none bg-accent/60" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
