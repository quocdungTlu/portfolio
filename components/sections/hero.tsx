import Image from "next/image";
import { Mail, MapPin, ArrowDown, FileDown } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { Typing } from "@/components/motion/typing";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      {/* Background: lưới + glow */}
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="absolute top-[-20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="absolute right-[-10%] bottom-[-30%] h-[400px] w-[500px] rounded-full bg-accent-2/8 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-16">
        <Reveal>
          <div className="mb-8 flex items-center gap-5">
            <Image
              src={profile.avatar}
              alt={`Ảnh đại diện ${profile.name}`}
              width={72}
              height={72}
              priority
              className="rounded-full border-2 border-edge-strong"
            />
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 font-mono text-xs text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {profile.openTo}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>
          <p className="mt-4 h-8 font-mono text-lg sm:text-2xl">
            <Typing phrases={profile.typingPhrases} />
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#projects">
              View Projects
              <ArrowDown size={15} aria-hidden />
            </ButtonLink>
            <a
              href={profile.cvPath}
              download
              className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium glass text-foreground transition-colors hover:bg-white/[0.07] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FileDown size={15} aria-hidden />
              Download CV
            </a>
            <ButtonLink href="/#contact" variant="ghost">
              Contact →
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-faint">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <GithubIcon size={15} aria-hidden />
              {profile.githubUser}
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Mail size={15} aria-hidden />
              {profile.email}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} aria-hidden />
              {profile.location}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
