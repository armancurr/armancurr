import { CaretRight } from "phosphor-solid";
import type { Accessor } from "solid-js";

import { FullscreenPanel } from "./fullscreen-panel";

type InteractiveProps = {
  isFullscreenEnabled: Accessor<boolean>;
  onPress: () => void;
};

const workExperience = [
  {
    period: "Dec 2025 — Present",
    title: "Full-Stack Engineer",
    company: "OneSol AI Labs",
    companyUrl: "https://onesol.in",
    description:
      "Built a hiring tool to rethink how teams discover, evaluate, and move candidates through the process. Focused on practical product flows, reliable interfaces, and the systems behind them.",
  },
];

export function Work(props: InteractiveProps) {
  return (
    <section class="relative w-full">
      <div class="site-pattern pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2" />

      <FullscreenPanel
        id="work"
        isFullscreenEnabled={props.isFullscreenEnabled}
        class="border-border bg-background relative mx-auto grid w-full max-w-6xl content-center border-x border-y px-8 py-14 sm:px-12 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-16 md:py-0"
        onPointerDown={props.onPress}
      >
        <span
          aria-hidden="true"
          class="bg-border pointer-events-none absolute top-[-1px] left-1/2 h-px w-screen -translate-x-1/2"
        />
        <span
          aria-hidden="true"
          class="bg-border pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2"
        />
        <span aria-hidden="true" class="pointer-events-none absolute top-0 left-0 z-10">
          <span class="absolute top-[-1px] left-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute top-[-8px] left-[-1px] h-4 w-px bg-[var(--corner)]" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute top-0 right-0 z-10">
          <span class="absolute top-[-1px] right-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute top-[-8px] right-[-1px] h-4 w-px bg-[var(--corner)]" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
          <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-[var(--corner)]" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 bottom-0 z-10">
          <span class="absolute right-[-1px] bottom-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute right-[-1px] bottom-[-8px] h-4 w-px bg-[var(--corner)]" />
        </span>

        <div class="mx-auto w-full max-w-xl">
          {workExperience.map((job) => (
            <div>
              <h3 class="text-foreground text-left text-xl font-semibold sm:text-2xl">{job.title}</h3>
              <div class="mt-4 flex flex-wrap items-center gap-2 text-sm text-[var(--text-muted)]">
                <a
                  href={job.companyUrl}
                  class="transition-colors hover:text-[var(--text-subtle)]"
                  rel="noreferrer"
                  target="_blank"
                >
                  {job.company}
                </a>
                <CaretRight class="text-[var(--text-muted)]" size={14} weight="fill" />
                <span>{job.period}</span>
              </div>
              <p class="mt-10 text-left text-lg leading-relaxed text-[var(--text-subtle)] sm:text-xl md:text-justify">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </FullscreenPanel>
    </section>
  );
}
