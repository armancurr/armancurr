import type { JSX } from "solid-js";

const sidePatternStyle = {
  "--s": "150px",
  "--c1": "#000",
  "--c2": "#0a0a0a",
  "--_g":
    "var(--c1) 0% 5%, var(--c2) 6% 15%, var(--c1) 16% 25%, var(--c2) 26% 35%, var(--c1) 36% 45%, var(--c2) 46% 55%, var(--c1) 56% 65%, var(--c2) 66% 75%, var(--c1) 76% 85%, var(--c2) 86% 95%, #0000 96%",
  background:
    "radial-gradient(50% 50% at 100% 0, var(--_g)), radial-gradient(50% 50% at 0 100%, var(--_g)), radial-gradient(50% 50%, var(--_g)), radial-gradient(50% 50%, var(--_g)) calc(var(--s) / 2) calc(var(--s) / 2), var(--c1)",
  "background-size": "var(--s) var(--s)",
};

interface PageFrameProps {
  children: JSX.Element;
}

export function PageFrame(props: PageFrameProps) {
  return (
    <main class="relative flex min-h-screen items-center bg-black px-4 py-20 text-white sm:px-6 sm:py-28">
      <section class="relative w-full">
        <div
          class="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
          style={sidePatternStyle}
        />

        <div class="relative mx-auto flex w-full max-w-6xl flex-col border-x border-y border-neutral-900 bg-black md:min-h-[660px]">
          <span aria-hidden="true" class="pointer-events-none absolute left-1/2 top-[-1px] h-px w-screen -translate-x-1/2 bg-neutral-900" />
          <span aria-hidden="true" class="pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2 bg-neutral-900" />
          <span aria-hidden="true" class="pointer-events-none absolute left-[-1px] top-1/2 h-screen w-px -translate-y-1/2 bg-neutral-900" />
          <span aria-hidden="true" class="pointer-events-none absolute right-[-1px] top-1/2 h-screen w-px -translate-y-1/2 bg-neutral-900" />
          <span aria-hidden="true" class="pointer-events-none absolute left-0 top-0 z-10">
            <span class="absolute left-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
            <span class="absolute left-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
          </span>
          <span aria-hidden="true" class="pointer-events-none absolute right-0 top-0 z-10">
            <span class="absolute right-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
            <span class="absolute right-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
          </span>
          <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
            <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-neutral-400" />
            <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-neutral-400" />
          </span>
          <span aria-hidden="true" class="pointer-events-none absolute bottom-0 right-0 z-10">
            <span class="absolute bottom-[-1px] right-[-1px] h-px w-2 bg-neutral-400" />
            <span class="absolute bottom-[-8px] right-[-1px] h-4 w-px bg-neutral-400" />
          </span>

          {props.children}
        </div>
      </section>
    </main>
  );
}
