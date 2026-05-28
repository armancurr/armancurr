import { createSignal, onCleanup, onMount } from "solid-js";

import { AboutSection } from "./components/about-section";
import { HeroSection } from "./components/hero-section";
import { ProjectsSection } from "./components/projects-section";
import { presetOptions } from "./components/sound-preset-options";
import { WorkSection } from "./components/work-section";
import { haptics } from "./lib/use-haptics";
import {
  isAudioReady,
  playPresetSound,
  soundPresetLabels,
  type SoundPreset,
  unlockAudio,
} from "./lib/use-sound";

const soundPresetStorageKey = "site:sound-preset";

function getStoredSoundPreset(): SoundPreset {
  if (typeof window === "undefined") return "Soft Tap";

  const storedPreset = window.localStorage.getItem(soundPresetStorageKey);

  if (soundPresetLabels.includes(storedPreset as SoundPreset)) {
    return storedPreset as SoundPreset;
  }

  return "Soft Tap";
}

export default function App() {
  const [selectedPreset, setSelectedPreset] =
    createSignal<SoundPreset>(getStoredSoundPreset());
  const route = window.location.pathname === "/tweaks" ? "tweaks" : "home";

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
    window.localStorage.setItem(soundPresetStorageKey, preset);

    void unlockAudio().then((ready) => {
      if (ready) playSelectedPreset();
    });
  };

  if (route === "tweaks") {
    return (
      <TweaksPage
        onPresetSelect={handlePresetSelect}
        selectedPreset={selectedPreset}
      />
    );
  }

  return (
    <div class="flex min-h-screen flex-col overflow-x-hidden bg-black px-4 py-24 text-white sm:px-6 sm:py-32">
      <HeroSection />
      <AboutSection
        onSectionHover={handleSectionHover}
        onSectionPress={handleSectionPress}
      />
      <WorkSection
        onSectionHover={handleSectionHover}
        onSectionPress={handleSectionPress}
      />
      {/*<ProjectsSection
        onSectionHover={handleSectionHover}
        onSectionPress={handleSectionPress}
      />*/}
    </div>
  );
}

interface TweaksPageProps {
  selectedPreset: () => SoundPreset;
  onPresetSelect: (preset: SoundPreset) => void;
}

function TweaksPage(props: TweaksPageProps) {
  return (
    <main class="min-h-screen overflow-x-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-28">
      <section class="mx-auto w-full max-w-4xl">
        <div class="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <div>
            <p class="text-sm uppercase tracking-[0.2em] text-white/50">
              tweaks
            </p>
          </div>

          <div>
            <div class="flex flex-wrap gap-2">
              {presetOptions.map(({ preset, icon: Icon, label }) => {
                const selected = () => props.selectedPreset() === preset;

                return (
                  <button
                    type="button"
                    aria-label={label}
                    aria-pressed={selected()}
                    title={label}
                    class={`inline-flex h-12 w-12 items-center justify-center rounded-sm transition-colors ${
                      selected()
                        ? "bg-white/[0.14] text-white"
                        : "text-white/45 hover:bg-white/[0.06] hover:text-white/80"
                    }`}
                    onPointerDown={() => props.onPresetSelect(preset)}
                  >
                    <Icon size={20} weight="regular" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
