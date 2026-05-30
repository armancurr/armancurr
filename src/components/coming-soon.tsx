type InteractiveProps = {
  onHover: () => void;
  onPress: () => void;
};

export function ComingSoon(props: InteractiveProps) {
  return (
    <section class="w-full">
      <div
        id="coming-soon"
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-b border-neutral-900 px-6 py-14 hover:bg-neutral-900/50 sm:px-8 md:h-[min(62vw,620px)] md:min-h-[360px] md:px-10 md:py-0"
        onPointerEnter={props.onHover}
        onPointerDown={props.onPress}
      >
        <span aria-hidden="true" class="pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <div class="mb-10 md:mb-16">
          <p class="text-sm uppercase tracking-[0.2em] text-white/50">
            coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
