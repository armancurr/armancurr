type InteractiveProps = {
  onHover: () => void;
  onPress: () => void;
};

const workExperience = [
  {
    period: "Dec 2025 — Present",
    title: "Full-Stack Engineer",
    company: "OneSol AI Labs",
    description:
      "Leading the frontend team building design systems and component libraries. Architected the migration to a modern stack, reducing bundle sizes by 40% and improving Core Web Vitals across all properties.",
  },
];

export function Work(props: InteractiveProps) {
  return (
    <section class="w-full">
      <div
        id="work"
        class="relative mx-auto w-full max-w-6xl border-x border-y border-neutral-900 px-6 py-16 hover:bg-white/[0.03] sm:px-8 sm:py-20 md:px-10 md:py-28"
        onPointerEnter={props.onHover}
        onPointerDown={props.onPress}
      >
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

        <div class="mb-16">
          <p class="text-sm uppercase tracking-[0.2em] text-white/50">
            work experience
          </p>
        </div>

        <div class="space-y-12">
          {workExperience.map((job) => (
            <div class="group grid gap-6 pt-8 lg:grid-cols-12">
              <div class="lg:col-span-3">
                <p class="text-sm text-white/40">{job.period}</p>
              </div>
              <div class="lg:col-span-9">
                <h3 class="text-xl font-medium">{job.title}</h3>
                <p class="mt-1 text-white/50">{job.company}</p>
                <p class="mt-4 leading-relaxed text-white/70">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
