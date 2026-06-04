import { CaretRight } from "phosphor-solid";
import type { Accessor } from "solid-js";

import { FullscreenPanel } from "./fullscreen-panel";

type InteractiveProps = {
  isFullscreenEnabled: Accessor<boolean>;
  onPress: () => void;
};

const project = {
  title: "Pazman",
  href: "https://github.com/armancurr/pazman",
  description:
    "A local-first password manager you can host yourself, built for owning your vault across devices.",
};

export function Project2(props: InteractiveProps) {
  return (
    <section class="relative w-full">
      <div class="site-pattern pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2" />

      <FullscreenPanel
        id="project-2"
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm4,104a12,12,0,1,1,12-12A12,12,0,0,1,132,128Zm20-36a12,12,0,1,1,12,12A12,12,0,0,1,152,92Zm20,52a12,12,0,1,1,12-12A12,12,0,0,1,172,144Z" />
              </svg>
              <CaretRight class="text-[var(--text-muted)]" size={18} weight="fill" />
              <h2 class="text-xl leading-none font-semibold sm:text-2xl">{project.title}</h2>
            </div>
            <p class="mt-6 text-left text-lg leading-relaxed text-[var(--text-subtle)] sm:text-xl md:text-justify">
              {project.description}
            </p>
          </a>
        </div>
      </FullscreenPanel>
    </section>
  );
}
