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
    "Turn your internet identity into a town: links, profiles, and personal landmarks in one place.",
};

export function Project1(props: InteractiveProps) {
  return (
    <section class="relative w-full">
      <FullscreenPanel
        id="project-1"
        isFullscreenEnabled={props.isFullscreenEnabled}
        class="border-border bg-background relative mx-auto grid w-full max-w-6xl content-center border-x border-b px-8 py-14 sm:px-12 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-16 md:py-0"
        onPointerDown={props.onPress}
      >
        <span
          aria-hidden="true"
          class="bg-border pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2"
        />
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
          <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-[var(--corner)]" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 bottom-0 z-10">
          <span class="absolute right-[-1px] bottom-[-1px] h-px w-2 bg-[var(--corner)]" />
          <span class="absolute right-[-1px] bottom-[-8px] h-4 w-px bg-[var(--corner)]" />
        </span>
        <div class="mx-auto max-w-xl">
          <a
            href={project.href}
            class="block transition-opacity hover:opacity-80"
            rel="noreferrer"
            target="_blank"
          >
            <div class="text-foreground flex items-center gap-2">
              <CatIcon size={32} color="currentColor" weight="fill" />
              <CaretRight class="text-[var(--text-muted)]" size={18} weight="fill" />
              <h2 class="text-xl leading-none font-semibold sm:text-2xl">Townbase</h2>
            </div>
            <p class="mt-10 text-left text-lg leading-relaxed text-[var(--text-subtle)] sm:text-xl md:text-justify">
              {project.description}
            </p>
          </a>
        </div>
      </FullscreenPanel>
    </section>
  );
}
