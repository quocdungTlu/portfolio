import { GraduationCap, Award } from "lucide-react";
import { profile } from "@/data/profile";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";

export function Education() {
  const { education, leadership } = profile;
  return (
    <Section id="education">
      <SectionHeading eyebrow="Education & Leadership" title="Background" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Reveal>
          <Card className="card-hover h-full">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-accent-soft p-2.5 text-accent">
                <GraduationCap size={20} aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{education.school}</h3>
                <p className="font-mono text-xs text-faint tabular-nums">{education.period}</p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">{education.degree}</p>
            <p className="mt-2 text-sm text-muted">{education.detail}</p>
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card className="card-hover h-full">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-accent-soft p-2.5 text-accent">
                <Award size={20} aria-hidden />
              </span>
              <div>
                <h3 className="text-sm font-semibold">{leadership.title}</h3>
                <p className="font-mono text-xs text-faint tabular-nums">{leadership.period}</p>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">{leadership.org}</p>
            <p className="mt-2 text-sm text-muted">{leadership.detail}</p>
          </Card>
        </Reveal>
      </div>
      {/* TODO: thêm section Certifications khi có chứng chỉ (AWS/GCP/DeepLearning.AI...) */}
    </Section>
  );
}
