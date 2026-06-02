import { CaretRight, Cat as CatIcon } from "phosphor-solid";
import type { Accessor } from "solid-js";

import { FullscreenPanel } from "./fullscreen-panel";

type InteractiveProps = {
  isFullscreenEnabled: Accessor<boolean>;
  onPress: () => void;
};

const project = {
  title: "Townbase",
  href: "https://github.com/armancurr/townbase",
  description:
    "An open source local community platform for neighborhoods, towns, and shared civic spaces.",
};

export function Project1(props: InteractiveProps) {
  return (
    <section class="w-full">
      <FullscreenPanel
        id="project-1"
        isFullscreenEnabled={props.isFullscreenEnabled}
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-b border-neutral-900 bg-black px-8 py-14 sm:px-12 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-16 md:py-0"
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
              <CatIcon size={32} color="#ffffff" weight="fill" />
              <CaretRight class="text-white/40" size={18} weight="fill" />
              <h2 class="text-3xl font-medium leading-none sm:text-4xl">Townbase</h2>
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
