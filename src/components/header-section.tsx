export function HeaderSection() {
  return (
    <header class="relative z-10 w-full">
      <div class="relative mx-auto h-24 w-full max-w-6xl border-x border-white/10 sm:h-32">
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
          <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-white/40" />
          <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-white/40" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 right-0 z-10">
          <span class="absolute bottom-[-1px] right-[-1px] h-px w-2 bg-white/40" />
          <span class="absolute bottom-[-8px] right-[-1px] h-4 w-px bg-white/40" />
        </span>
      </div>
    </header>
  );
}
