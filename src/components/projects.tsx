import { CaretRight } from "phosphor-solid";

type InteractiveProps = {
  onHover: () => void;
  onPress: () => void;
};

const projects = [
  {
    title: "Townbase",
    href: "https://github.com/armancurr/townbase",
    description:
      "An open source local community platform for neighborhoods, towns, and shared civic spaces.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <path d="M222.83,33.54a16,16,0,0,0-18.14,3.15c-.14.14-.26.27-.38.41L187.05,57A111.28,111.28,0,0,0,69,57L51.69,37.1c-.12-.14-.24-.27-.38-.41a16,16,0,0,0-18.14-3.15A16.4,16.4,0,0,0,24,48.46V136c0,49,40.06,89.63,91.56,95.32a4,4,0,0,0,4.44-4v-32l-13.42-13.43a8.22,8.22,0,0,1-.41-11.37,8,8,0,0,1,11.49-.18L128,180.68l10.34-10.35a8,8,0,0,1,11.49.18,8.22,8.22,0,0,1-.41,11.37L136,195.31v32a4,4,0,0,0,4.44,4C191.94,225.62,232,185,232,136V48.46A16.4,16.4,0,0,0,222.83,33.54ZM84,152a12,12,0,1,1,12-12A12,12,0,0,1,84,152Zm20-64a8,8,0,1,1-16,0V69a8,8,0,0,1,16,0Zm32,0a8,8,0,1,1-16,0V64a8,8,0,0,1,16,0Zm16,0V69a8,8,0,0,1,16,0V88a8,8,0,1,1-16,0Zm20,64a12,12,0,1,1,12-12A12,12,0,0,1,172,152Z" />
      </svg>
    ),
  },
  {
    title: "Research Agent",
    href: "https://github.com/armancurr/research-agent",
    description:
      "A research-focused agent project for exploring, synthesizing, and automating knowledge work.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="#ffffff"
        viewBox="0 0 256 256"
      >
        <path d="M128,24h0A104,104,0,1,0,232,128,104.12,104.12,0,0,0,128,24Zm87.62,96H175.79C174,83.49,159.94,57.67,148.41,42.4A88.19,88.19,0,0,1,215.63,120ZM96.23,136h63.54c-2.31,41.61-22.23,67.11-31.77,77C118.45,203.1,98.54,177.6,96.23,136Zm0-16C98.54,78.39,118.46,52.89,128,43c9.55,9.93,29.46,35.43,31.77,77Zm52.18,93.6c11.53-15.27,25.56-41.09,27.38-77.6h39.84A88.19,88.19,0,0,1,148.41,213.6Z" />
      </svg>
    ),
  },
];

export function Projects(props: InteractiveProps) {
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

  return (
    <section class="relative w-full">
      <div
        class="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
        style={sidePatternStyle}
      />

      <div
        id="projects"
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-b border-neutral-900 bg-black px-6 py-14 hover:bg-neutral-950 sm:px-8 md:h-[min(66vw,660px)] md:min-h-[360px] md:px-10 md:py-0"
        onPointerEnter={props.onHover}
        onPointerDown={props.onPress}
      >
        <span aria-hidden="true" class="pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <div class="mb-10 md:mb-16">
          <p class="text-sm uppercase tracking-[0.2em] text-white/50">
            projects
          </p>
        </div>

        <div class="grid gap-10 md:grid-cols-2 md:gap-12">
          {projects.map((project) => (
            <a
              href={project.href}
              class="block"
              rel="noreferrer"
              target="_blank"
            >
              <div>
                <div class="flex items-center gap-2 text-white">
                  {project.icon}
                  <CaretRight class="text-white/40" size={18} weight="fill" />
                  <h3 class="text-xl font-medium">{project.title}</h3>
                </div>
                <p class="mt-4 max-w-md leading-relaxed text-white/70">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
