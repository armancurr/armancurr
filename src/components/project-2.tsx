import { CaretRight } from "phosphor-solid";
import type { Accessor } from "solid-js";

import { FullscreenPanel } from "./fullscreen-panel";

type InteractiveProps = {
  isFullscreenEnabled: Accessor<boolean>;
  onHover: () => void;
  onPress: () => void;
};

const project = {
  title: "Research Agent",
  href: "https://github.com/armancurr/research-agent",
  description:
    "A research-focused agent project for exploring, synthesizing, and automating knowledge work.",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="#ffffff"
      viewBox="0 0 256 256"
    >
      <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm52.18,93.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z" />
    </svg>
  ),
};

export function Project2(props: InteractiveProps) {
  return (
    <section class="w-full">
      <FullscreenPanel
        id="project-2"
        isFullscreenEnabled={props.isFullscreenEnabled}
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-b border-neutral-900 px-6 py-14 hover:bg-neutral-900/50 sm:px-8 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-10 md:py-0"
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
        <div class="mx-auto max-w-2xl">
          <a
            href={project.href}
            class="block"
            rel="noreferrer"
            target="_blank"
          >
            <div class="flex items-center gap-2 text-white">
              {project.icon}
              <CaretRight class="text-white/40" size={18} weight="fill" />
              <h3 class="text-xl font-medium sm:text-2xl">{project.title}</h3>
            </div>
            <p class="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl" style="text-align: justify">
              {project.description}
            </p>
          </a>
        </div>
      </FullscreenPanel>
    </section>
  );
}
