import { CaretRight } from "phosphor-solid";

import { FullscreenPanel } from "./fullscreen-panel";

type InteractiveProps = {
  onHover: () => void;
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
  const sidePatternStyle = {
    "--s": "150px",
    "--c1": "#000",
    "--c2": "#0a0a0a",
    "--_g":
      "var(--c1) 0% 5%, var(--c2) 6% 15%, var(--c1) 16% 25%, var(--c2) 26% 35%, var(--c1) 36% 45%, var(--c2) 46% 55%, var(--c1) 56% 65%, var(--c2) 66% 75%, var(--c1) 76% 85%, var(--c2) 86% 95%, #0000 96%",
    background:
      "radial-gradient(50% 50% at 100% 0, var(--_g)), radial-gradient(50% 50% at 0 100%, var(--_g)), radial-gradient(50% 50%, var(--_g)), radial-gradient(50% 50%, var(--_g)) calc(var(--s) / 2) calc(var(--s) / 2), var(--c1)",
    "background-size": "var(--s) var(--s)",
  };

  return (
    <section class="relative w-full">
      <div
        class="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
        style={sidePatternStyle}
      />

      <FullscreenPanel
        id="work"
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-y border-neutral-900 bg-black px-6 py-14 hover:bg-neutral-950 sm:px-8 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-10 md:py-0"
        onPointerEnter={props.onHover}
        onPointerDown={props.onPress}
      >
        <span aria-hidden="true" class="pointer-events-none absolute left-1/2 top-[-1px] h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <span aria-hidden="true" class="pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <span aria-hidden="true" class="pointer-events-none absolute left-0 top-0 z-10">
          <span class="absolute left-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute left-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 top-0 z-10">
          <span class="absolute right-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute right-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
          <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 right-0 z-10">
          <span class="absolute bottom-[-1px] right-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute bottom-[-8px] right-[-1px] h-4 w-px bg-neutral-400" />
        </span>

        <div class="mx-auto max-w-2xl">
          {workExperience.map((job) => (
            <div>
              <h3 class="text-left text-xl font-medium text-white sm:text-2xl">{job.title}</h3>
              <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/50">
                <a
                  href={job.companyUrl}
                  class="transition-colors hover:text-white"
                  rel="noreferrer"
                  target="_blank"
                >
                  {job.company}
                </a>
                <CaretRight class="text-white/35" size={16} weight="fill" />
                <p>{job.period}</p>
              </div>
              <p class="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl" style="text-align: justify">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </FullscreenPanel>
    </section>
  );
}
