export function HeroSection() {
  return (
    <section class="w-full">
      <div class="relative mx-auto w-full max-w-6xl overflow-hidden border-x border-t border-white/10">
        <span aria-hidden="true" class="pointer-events-none absolute left-0 top-0 z-10">
          <span class="absolute left-[-1px] top-[-1px] h-px w-2 bg-white/40" />
          <span class="absolute left-[-1px] top-[-8px] h-4 w-px bg-white/40" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 top-0 z-10">
          <span class="absolute right-[-1px] top-[-1px] h-px w-2 bg-white/40" />
          <span class="absolute right-[-1px] top-[-8px] h-4 w-px bg-white/40" />
        </span>

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

        <div class="h-[min(62vw,620px)] min-h-[360px]" />
      </div>
    </section>
  );
}
