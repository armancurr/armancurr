import { CaretRight } from "phosphor-solid";
import type { Accessor } from "solid-js";

import { FullscreenPanel } from "./fullscreen-panel";

type InteractiveProps = {
  isFullscreenEnabled: Accessor<boolean>;
  onHover: () => void;
  onPress: () => void;
};

const project = {
  title: "Pazman",
  href: "https://github.com/armancurr/research-agent",
  description:
    "A research-focused agent project for exploring, synthesizing, and automating knowledge work.",
};

export function Project2(props: InteractiveProps) {
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
        id="project-2"
        isFullscreenEnabled={props.isFullscreenEnabled}
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-b border-neutral-900 bg-black px-8 py-14 hover:bg-neutral-950 sm:px-12 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-16 md:py-0"
        onPointerEnter={props.onHover}
        onPointerDown={props.onPress}
      >
        <span aria-hidden="true" class="pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
          <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 right-0 z-10">
          <span class="absolute bottom-[-1px] right-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute bottom-[-8px] right-[-1px] h-4 w-px bg-neutral-400" />
        </span>
        <div class="mx-auto max-w-xl">
          <a
            href={project.href}
            class="block transition-opacity hover:opacity-80"
            rel="noreferrer"
            target="_blank"
          >
            <div class="flex items-center gap-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#ffffff"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm4,104a12,12,0,1,1,12-12A12,12,0,0,1,132,128Zm20-36a12,12,0,1,1,12,12A12,12,0,0,1,152,92Zm20,52a12,12,0,1,1,12-12A12,12,0,0,1,172,144Z" />
              </svg>
              <CaretRight class="text-white/40" size={18} weight="fill" />
              <h2 class="font-diner text-4xl leading-none sm:text-5xl">{project.title}</h2>
            </div>
            <p class="mt-10 text-lg leading-relaxed text-white/75 sm:text-xl" style="text-align: justify">
              {project.description}
            </p>
          </a>
        </div>
      </FullscreenPanel>
    </section>
  );
}
