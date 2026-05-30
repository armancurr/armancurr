import { Show, createSignal, onCleanup, onMount } from "solid-js";

import { About } from "./components/about";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Player } from "./components/player";
import { Projects } from "./components/projects";
import { presetOptions } from "./components/sound-preset-options";
import { Work } from "./components/work";
import { haptics } from "./lib/use-haptics";
import { useTweaksSecret } from "./lib/use-tweaks-secret";
import {
  isAudioReady,
  getMidiPlaybackSnapshot,
  playPresetSound,
  soundPresetLabels,
  toggleMidiFile,
  type MidiPlaybackSnapshot,
  type SoundPreset,
  unlockAudio,
} from "./lib/use-sound";

const soundPresetStorageKey = "site:sound-preset";
const mainPlayerStorageKey = "site:main-player-enabled";
const compactPlayerStorageKey = "site:compact-player-enabled";
const batteryStatusStorageKey = "site:battery-status-enabled";
const cpuStatusStorageKey = "site:cpu-status-enabled";

function getStoredSoundPreset(): SoundPreset {
  if (typeof window === "undefined") return "Soft Tap";

  const storedPreset = window.localStorage.getItem(soundPresetStorageKey);

  if (soundPresetLabels.includes(storedPreset as SoundPreset)) {
    return storedPreset as SoundPreset;
  }

  return "Soft Tap";
}

function getStoredBoolean(key: string): boolean {
  if (typeof window === "undefined") return false;

  return window.localStorage.getItem(key) === "true";
}

export default function App() {
  const [selectedPreset, setSelectedPreset] =
    createSignal<SoundPreset>(getStoredSoundPreset());
  const [isMainPlayerEnabled, setIsMainPlayerEnabled] = createSignal(
    getStoredBoolean(mainPlayerStorageKey),
  );
  const [isCompactPlayerEnabled, setIsCompactPlayerEnabled] = createSignal(
    getStoredBoolean(compactPlayerStorageKey),
  );
  const [isBatteryStatusEnabled, setIsBatteryStatusEnabled] = createSignal(
    getStoredBoolean(batteryStatusStorageKey),
  );
  const [isCpuStatusEnabled, setIsCpuStatusEnabled] = createSignal(
    getStoredBoolean(cpuStatusStorageKey),
  );
  const [activeMidiUrl, setActiveMidiUrl] = createSignal<string | null>(null);
  const [isMidiPlaying, setIsMidiPlaying] = createSignal(false);
  const [playbackTick, setPlaybackTick] = createSignal(Date.now());
  const route = window.location.pathname === "/tweaks" ? "tweaks" : "home";

  useTweaksSecret();

  onMount(() => {
    const primeAudio = () => {
      void unlockAudio();
    };

    window.addEventListener("pointerdown", primeAudio, { capture: true });
    window.addEventListener("keydown", primeAudio, { capture: true });

    const progressInterval = window.setInterval(() => {
      setPlaybackTick(Date.now());
    }, 250);

    onCleanup(() => {
      window.removeEventListener("pointerdown", primeAudio, { capture: true });
      window.removeEventListener("keydown", primeAudio, { capture: true });
      window.clearInterval(progressInterval);
    });
  });

  const midiPlayback = (): MidiPlaybackSnapshot | null => {
    playbackTick();
    return getMidiPlaybackSnapshot();
  };

  const playSelectedPreset = () => playPresetSound(selectedPreset());

  const handleHover = () => {
    if (!isAudioReady()) return;

    playSelectedPreset();
    haptics.hover();
  };

  const handlePress = () => {
    void unlockAudio().then((ready) => {
      if (ready) playSelectedPreset();
    });

    haptics.click();
  };

  const handleMidiToggle = (url: string) => {
    void toggleMidiFile(url, selectedPreset()).then((status) => {
      if (status === "failed") return;

      setActiveMidiUrl(url);
      setIsMidiPlaying(status === "playing");
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

  const handleMainPlayerToggle = () => {
    const nextValue = !isMainPlayerEnabled();

    setIsMainPlayerEnabled(nextValue);
    window.localStorage.setItem(mainPlayerStorageKey, String(nextValue));
    haptics.click();
  };

  const handleCompactPlayerToggle = () => {
    const nextValue = !isCompactPlayerEnabled();

    setIsCompactPlayerEnabled(nextValue);
    window.localStorage.setItem(compactPlayerStorageKey, String(nextValue));
    haptics.click();
  };

  const handleBatteryStatusToggle = () => {
    const nextValue = !isBatteryStatusEnabled();

    setIsBatteryStatusEnabled(nextValue);
    window.localStorage.setItem(batteryStatusStorageKey, String(nextValue));
    haptics.click();
  };

  const handleCpuStatusToggle = () => {
    const nextValue = !isCpuStatusEnabled();

    setIsCpuStatusEnabled(nextValue);
    window.localStorage.setItem(cpuStatusStorageKey, String(nextValue));
    haptics.click();
  };

  if (route === "tweaks") {
    return (
      <TweaksPage
        isBatteryStatusEnabled={isBatteryStatusEnabled}
        isCompactPlayerEnabled={isCompactPlayerEnabled}
        isCpuStatusEnabled={isCpuStatusEnabled}
        isMainPlayerEnabled={isMainPlayerEnabled}
        onBatteryStatusToggle={handleBatteryStatusToggle}
        onCompactPlayerToggle={handleCompactPlayerToggle}
        onCpuStatusToggle={handleCpuStatusToggle}
        onMainPlayerToggle={handleMainPlayerToggle}
        onPresetSelect={handlePresetSelect}
        selectedPreset={selectedPreset}
      />
    );
  }

  return (
    <div class="flex min-h-screen flex-col overflow-x-hidden bg-black px-4 text-white sm:px-6">
      <Header
        isBatteryStatusEnabled={isBatteryStatusEnabled}
        isCpuStatusEnabled={isCpuStatusEnabled}
      />
      <Hero />
      <About
        onHover={handleHover}
        onPress={handlePress}
      />
      <Work
        onHover={handleHover}
        onPress={handlePress}
      />
      <Show when={isMainPlayerEnabled()}>
        <Player
          activeTrackUrl={activeMidiUrl}
          isPlaying={isMidiPlaying}
          onHover={handleHover}
          onToggleTrack={handleMidiToggle}
          selectedPreset={selectedPreset}
        />
      </Show>
      <Projects
        onHover={handleHover}
        onPress={handlePress}
      />
      <Footer
        activeTrackUrl={activeMidiUrl}
        isCompactPlayerEnabled={isCompactPlayerEnabled}
        isPlaying={isMidiPlaying}
        midiPlayback={midiPlayback}
        onToggleTrack={handleMidiToggle}
      />
    </div>
  );
}

interface TweaksPageProps {
  selectedPreset: () => SoundPreset;
  isMainPlayerEnabled: () => boolean;
  isCompactPlayerEnabled: () => boolean;
  isBatteryStatusEnabled: () => boolean;
  isCpuStatusEnabled: () => boolean;
  onPresetSelect: (preset: SoundPreset) => void;
  onMainPlayerToggle: () => void;
  onCompactPlayerToggle: () => void;
  onBatteryStatusToggle: () => void;
  onCpuStatusToggle: () => void;
}

function TweaksPage(props: TweaksPageProps) {
  return (
    <main class="flex min-h-screen items-center overflow-x-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-28">
      <section class="w-full">
        <div class="relative mx-auto flex w-full max-w-6xl flex-col border-x border-y border-neutral-900 md:min-h-[620px]">
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

          <div class="flex flex-1 flex-col">
          {/* <div class="grid items-center gap-8 lg:grid-cols-[360px_1fr] lg:gap-16">
            <SettingHeading
              title="Sound selection"
              description="Pick the sound used for clicks and hovers."
            />
            <div class="grid w-full max-w-2xl grid-cols-6 gap-x-6 gap-y-4 justify-self-end sm:gap-x-8">
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
          </div> */}

          {(() => {
            const tiles = [
              { title: "Show the primary music player",   enabled: props.isMainPlayerEnabled,    onToggle: props.onMainPlayerToggle    },
              { title: "Show the compact music player",  enabled: props.isCompactPlayerEnabled, onToggle: props.onCompactPlayerToggle },
              { title: "Show battery level (works only in Google Chrome :-|)",        enabled: props.isBatteryStatusEnabled, onToggle: props.onBatteryStatusToggle },
              { title: "Show CPU status (works in any browser other than Google Chrome :-))",       enabled: props.isCpuStatusEnabled,     onToggle: props.onCpuStatusToggle     },
            ];
            return (
              <div class="grid flex-1 grid-cols-2 gap-px bg-white/[0.06]">
                {tiles.map((tile) => (
                  <SettingTile {...tile} />
                ))}
              </div>
            );
          })()}
          </div>
        </div>
      </section>
    </main>
  );
}

interface SettingTileProps {
  title: string;
  enabled: () => boolean;
  onToggle: () => void;
}

function SettingTile(props: SettingTileProps) {
  return (
    <button
      type="button"
      onClick={props.onToggle}
      class={`flex flex-col justify-between p-6 text-left transition-colors sm:p-8 ${
        props.enabled() ? "bg-white/[0.04]" : "bg-black"
      } hover:bg-white/[0.06]`}
    >
      <div class="flex justify-end">
        <SettingToggle enabled={props.enabled} onToggle={() => {}} />
      </div>
      <p class={`text-sm font-light leading-snug tracking-wide transition-colors ${props.enabled() ? "text-white" : "text-white/50"}`}>
        {props.title}
      </p>
    </button>
  );
}

interface SettingToggleProps {
  enabled: () => boolean;
  onToggle: () => void;
}

function SettingToggle(props: SettingToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={props.enabled()}
      aria-label={props.enabled() ? "Disable setting" : "Enable setting"}
      class="flex justify-self-end"
      onClick={props.onToggle}
    >
      <span
        class={`relative h-6 w-11 shrink-0 border border-neutral-700 transition-colors ${
          props.enabled() ? "bg-white/20" : "bg-transparent"
        }`}
      >
        <span
          class={`absolute left-1 top-1 h-3.5 w-3.5 bg-white transition-transform ${
            props.enabled() ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}
