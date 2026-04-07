import {
  BellSimple,
  CircleWavy,
  Cpu,
  Disc,
  EnvelopeSimple,
  GlobeHemisphereWest,
  GithubLogo,
  MoonStars,
  MusicNoteSimple,
  SpeakerHigh,
  SpeakerSimpleHigh,
  Sun,
  Wind,
  Drop,
} from "phosphor-solid";
import { createSignal, onCleanup, onMount } from "solid-js";

import { haptics } from "./lib/use-haptics";
import {
  isAudioReady,
  playPresetSound,
  soundPresetLabels,
  type SoundPreset,
  unlockAudio,
} from "./lib/use-sound";

const presetOptions = [
  { preset: "Soft Tap", icon: BellSimple, label: "Soft" },
  { preset: "Glass Tick", icon: CircleWavy, label: "Glass" },
  { preset: "Wood Knock", icon: Disc, label: "Wood" },
  { preset: "Digital Pop", icon: Cpu, label: "Digital" },
  { preset: "Chime Dot", icon: MusicNoteSimple, label: "Chime" },
  { preset: "Arcade Blip", icon: SpeakerSimpleHigh, label: "Arcade" },
  { preset: "Warm Pulse", icon: SpeakerHigh, label: "Warm" },
  { preset: "Bright Ping", icon: Sun, label: "Bright" },
  { preset: "Hollow Click", icon: GlobeHemisphereWest, label: "Hollow" },
  { preset: "Orbit Drift", icon: MoonStars, label: "Orbit" },
  { preset: "Velvet Pluck", icon: Drop, label: "Velvet" },
  { preset: "Crystal Bloom", icon: Wind, label: "Bloom" },
] as const satisfies ReadonlyArray<{
  preset: SoundPreset;
  icon: typeof BellSimple;
  label: string;
}>;

export default function App() {
  const [selectedPreset, setSelectedPreset] =
    createSignal<SoundPreset>("Soft Tap");

  onMount(() => {
    const primeAudio = () => {
      void unlockAudio();
    };

    window.addEventListener("pointerdown", primeAudio, { capture: true });
    window.addEventListener("keydown", primeAudio, { capture: true });

    onCleanup(() => {
      window.removeEventListener("pointerdown", primeAudio, { capture: true });
      window.removeEventListener("keydown", primeAudio, { capture: true });
    });
  });

  const playSelectedPreset = () => playPresetSound(selectedPreset());

  const handleSectionHover = () => {
    if (!isAudioReady()) return;

    playSelectedPreset();
    haptics.hover();
  };

  const handleSectionPress = () => {
    void unlockAudio().then((ready) => {
      if (ready) playSelectedPreset();
    });

    haptics.click();
  };

  const handlePresetSelect = (preset: SoundPreset) => {
    setSelectedPreset(preset);

    void unlockAudio().then((ready) => {
      if (ready) playSelectedPreset();
    });
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

  return (
    <div class="min-h-screen overflow-x-hidden bg-black px-4 pb-8 pt-24 text-white sm:px-6 sm:pb-10 sm:pt-32">
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
        <section class="relative w-full overflow-hidden rounded-sm border-2 border-neutral-950">
        <div
          class="absolute left-1/2 top-1/2 rounded-full blur-[24px]"
          style={{
            width: "min(90vw, 980px)",
            height: "min(90vw, 980px)",
            background:
              "radial-gradient(circle, transparent 41%, rgba(201,24,120,0.88) 55%, rgba(138,16,160,0.7) 64%, rgba(0,0,0,0) 75%)",
            transform: "translate(-50%, -50%)",
            opacity: 0.72,
          }}
        />
        <div
          class="absolute left-1/2 top-1/2 rounded-full blur-[20px]"
          style={{
            width: "min(72vw, 760px)",
            height: "min(72vw, 760px)",
            background:
              "radial-gradient(circle, transparent 31%, rgba(38,64,220,0.92) 47%, rgba(80,48,200,0.76) 57%, rgba(0,0,0,0) 67%)",
            transform: "translate(-50%, -50%)",
            opacity: 0.8,
          }}
        />
        <div
          class="absolute left-1/2 top-1/2 rounded-full blur-[16px]"
          style={{
            width: "min(50vw, 520px)",
            height: "min(50vw, 520px)",
            background:
              "radial-gradient(circle, transparent 20%, rgba(0,200,168,0.9) 36%, rgba(0,168,204,0.76) 47%, rgba(0,0,0,0) 58%)",
            transform: "translate(-50%, -50%)",
            opacity: 0.78,
          }}
        />
        <div
          class="absolute left-1/2 top-1/2 rounded-full blur-[12px]"
          style={{
            width: "min(24vw, 220px)",
            height: "min(24vw, 220px)",
            background:
              "radial-gradient(circle, #000 36%, rgba(0,0,0,0.72) 60%, transparent 80%)",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div class="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_50%,transparent_48%,rgba(0,0,0,0.8)_76%,#000_90%)]" />

        <svg class="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay opacity-[0.36]">
          <filter id="n1">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="1"
              stitchTiles="stitch"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 8 -3"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#n1)" />
        </svg>

        <svg class="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen opacity-[0.08]">
          <filter id="n2">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.2"
              numOctaves="1"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#n2)" />
        </svg>

        <div class="absolute left-0 top-0 z-10 px-3 py-3 sm:px-4 sm:py-4">
          <div class="flex flex-wrap items-center gap-2">
            {presetOptions.map(({ preset, icon: Icon, label }) => {
              const selected = () => selectedPreset() === preset;

              return (
                <button
                  type="button"
                  aria-label={label}
                  title={label}
                  class={`inline-flex h-10 w-10 items-center justify-center rounded-sm transition-colors ${selected() ? "text-white" : "text-white/45 hover:text-white/80"}`}
                  onPointerDown={() => handlePresetSelect(preset)}
                >
                  <Icon size={20} weight="regular" />
                </button>
              );
            })}
          </div>
        </div>

        <div class="h-[min(62vw,620px)] min-h-[360px]" />
        </section>

        <section
          id="about"
          class="w-full rounded-sm p-6 hover:bg-white/[0.03] sm:p-8 md:p-10"
          onPointerEnter={handleSectionHover}
          onPointerDown={handleSectionPress}
        >
          <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p class="text-sm uppercase tracking-[0.2em] text-white/50">
                about
              </p>
            </div>
            <div class="space-y-6">
              <p class="text-lg leading-relaxed text-white/80 sm:text-xl">
                I'm a frontend developer focused on building interfaces that feel
                good to use. I work at the intersection of design and engineering,
                bringing products to life with attention to detail, motion, and
                clarity.
              </p>
              <p class="text-lg leading-relaxed text-white/80 sm:text-xl">
                I believe software should be intuitive and delightful. Every
                interaction, every transition, every state matters. I approach
                each project with curiosity and a commitment to craft.
              </p>
            </div>
          </div>
        </section>

        <section
          id="work"
          class="w-full rounded-sm p-6 hover:bg-white/[0.03] sm:p-8 md:p-10"
          onPointerEnter={handleSectionHover}
          onPointerDown={handleSectionPress}
        >
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
        </section>

        <section
          id="projects"
          class="w-full rounded-sm p-6 hover:bg-white/[0.03] sm:p-8 md:p-10"
          onPointerEnter={handleSectionHover}
          onPointerDown={handleSectionPress}
        >
          <div class="mb-16">
            <p class="text-sm uppercase tracking-[0.2em] text-white/50">
              projects
            </p>
          </div>

          <div class="grid gap-8 sm:grid-cols-2">
            {projects.map((project) => (
              <a
                href={project.href}
                class="group block"
                rel="noreferrer"
                target="_blank"
              >
                <div class="aspect-[4/3] overflow-hidden rounded-sm border border-white/10 bg-white/5">
                  <div class="flex h-full items-center justify-center text-white/30">
                    {project.icon}
                  </div>
                </div>
                <div class="mt-4">
                  <h3 class="text-lg font-medium transition-colors group-hover:text-white/70">
                    {project.title}
                  </h3>
                  <p class="mt-1 text-sm text-white/50">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
