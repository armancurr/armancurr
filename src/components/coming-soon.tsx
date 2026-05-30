type InteractiveProps = {
  onHover: () => void;
  onPress: () => void;
};

export function ComingSoon(props: InteractiveProps) {
  return (
    <section class="w-full">
      <div
        id="coming-soon"
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
        <div class="mb-10 md:mb-16">
          <p class="text-sm uppercase tracking-[0.2em] text-white/50">
            coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
