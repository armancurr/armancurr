type InteractiveProps = {
  onHover: () => void;
  onPress: () => void;
};

export function About(props: InteractiveProps) {
  return (
    <section class="w-full">
      <div
        id="about"
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-t border-neutral-900 px-6 py-14 hover:bg-neutral-900/50 sm:px-8 md:h-[min(62vw,620px)] md:min-h-[360px] md:px-10 md:py-0"
        onPointerEnter={props.onHover}
        onPointerDown={props.onPress}
      >
        <span aria-hidden="true" class="pointer-events-none absolute left-1/2 top-[-1px] h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <span aria-hidden="true" class="pointer-events-none absolute left-0 top-0 z-10">
          <span class="absolute left-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute left-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 top-0 z-10">
          <span class="absolute right-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute right-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>

        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p class="text-sm uppercase tracking-[0.2em] text-white/50">
              about
            </p>
          </div>
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-white/80 sm:text-xl">
              I'm a developer focused on building clear, practical interfaces at
              the application layer where people meet the software.
            </p>
            <p class="text-lg leading-relaxed text-white/70 sm:text-xl">
              View my work on{" "}
              <a
                href="https://github.com/armancurr"
                class="inline-flex items-center gap-1 transition-colors hover:text-white"
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              , follow me on{" "}
              <a
                href="https://twitter.com/rrucnamra"
                class="inline-flex items-center gap-1 transition-colors hover:text-white"
                rel="noreferrer"
                target="_blank"
              >
                Twitter
              </a>
              , or connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/armancurr"
                class="inline-flex items-center gap-1 transition-colors hover:text-white"
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
