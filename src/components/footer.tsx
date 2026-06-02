export function Footer() {
  return (
    <footer class="w-full">
      <div class="relative mx-auto flex h-[max(6rem,calc((100vh-660px)/2))] w-full max-w-6xl items-center border-x border-neutral-900 sm:h-[max(8rem,calc((100vh-660px)/2))]">
        <span aria-hidden="true" class="pointer-events-none absolute left-1/2 top-[-1px] h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <span aria-hidden="true" class="pointer-events-none absolute left-0 top-0 z-10">
          <span class="absolute left-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute left-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 top-0 z-10">
          <span class="absolute right-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute right-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>
      </div>
    </footer>
  );
}
