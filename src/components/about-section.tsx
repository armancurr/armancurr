type InteractiveSectionProps = {
  onSectionHover: () => void;
  onSectionPress: () => void;
};

export function AboutSection(props: InteractiveSectionProps) {
  return (
    <section class="w-full">
      <div
        id="about"
        class="mx-auto w-full max-w-6xl border-x border-t border-white/10 px-6 py-16 hover:bg-white/[0.03] sm:px-8 sm:py-20 md:px-10 md:py-28"
        onPointerEnter={props.onSectionHover}
        onPointerDown={props.onSectionPress}
      >
        <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p class="text-sm uppercase tracking-[0.2em] text-white/50">
              about
            </p>
          </div>
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-white/80 sm:text-xl">
              I'm a frontend developer focused on the application layer, where
              people meet the software. I build clear, practical interfaces that
              feel good to use.
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
