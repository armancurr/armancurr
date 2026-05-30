import { createSignal, onCleanup, onMount } from "solid-js";

import { About } from "./components/about";
import { ComingSoon } from "./components/coming-soon";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Projects } from "./components/projects";
import { presetOptions } from "./components/sound-preset-options";
import { Work } from "./components/work";
import { getMidiUrl, midiTracks } from "./config/midi-tracks";
import { haptics } from "./lib/use-haptics";
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
const compactPlayerStorageKey = "site:compact-player-enabled";
const compactPlayerPositionStorageKey = "site:compact-player-position";
const batteryStatusStorageKey = "site:battery-status-enabled";
const cpuStatusStorageKey = "site:cpu-status-enabled";

type CompactPlayerPosition = "top" | "bottom";

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

function getStoredCompactPlayerPosition(): CompactPlayerPosition {
  if (typeof window === "undefined") return "bottom";

  return window.localStorage.getItem(compactPlayerPositionStorageKey) === "top"
    ? "top"
    : "bottom";
}

function getRandomMidiUrl(): string {
  const track = midiTracks[Math.floor(Math.random() * midiTracks.length)];

  return getMidiUrl(track);
}

export default function App() {
  const initialCompactPlayerEnabled = getStoredBoolean(compactPlayerStorageKey);
  const initialCompactPlayerPosition = getStoredCompactPlayerPosition();
  const isInitialCompactPlayerInHeader =
    initialCompactPlayerEnabled && initialCompactPlayerPosition === "top";
  const [selectedPreset, setSelectedPreset] =
    createSignal<SoundPreset>(getStoredSoundPreset());
  const [isCompactPlayerEnabled, setIsCompactPlayerEnabled] = createSignal(
    initialCompactPlayerEnabled,
  );
  const [compactPlayerPosition, setCompactPlayerPosition] =
    createSignal<CompactPlayerPosition>(initialCompactPlayerPosition);
  const [isBatteryStatusEnabled, setIsBatteryStatusEnabled] = createSignal(
    !isInitialCompactPlayerInHeader && getStoredBoolean(batteryStatusStorageKey),
  );
  const [isCpuStatusEnabled, setIsCpuStatusEnabled] = createSignal(
    !isInitialCompactPlayerInHeader && getStoredBoolean(cpuStatusStorageKey),
  );
  const [activeMidiUrl, setActiveMidiUrl] = createSignal<string | null>(getRandomMidiUrl());
  const [isMidiPlaying, setIsMidiPlaying] = createSignal(false);
  const [playbackTick, setPlaybackTick] = createSignal(Date.now());
  const route = window.location.pathname === "/tweaks" ? "tweaks" : "home";
  const isCompactPlayerInHeader = () =>
    isCompactPlayerEnabled() && compactPlayerPosition() === "top";
  const isCompactPlayerInFooter = () =>
    isCompactPlayerEnabled() && compactPlayerPosition() === "bottom";

  onMount(() => {
    const primeAudio = () => {
      void unlockAudio();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && !event.altKey && !event.metaKey && event.code === "Comma") {
        event.preventDefault();
        window.location.href = route === "tweaks" ? "/" : "/tweaks";
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (!isCompactPlayerEnabled() || isTyping || event.code !== "Space") return;

      event.preventDefault();
      handleMidiToggle(activeMidiUrl() ?? getMidiUrl(midiTracks[0]));
    };

    window.addEventListener("pointerdown", primeAudio, { capture: true });
    window.addEventListener("keydown", primeAudio, { capture: true });
    window.addEventListener("keydown", handleKeyDown);

    const progressInterval = window.setInterval(() => {
      setPlaybackTick(Date.now());
    }, 250);

    onCleanup(() => {
      window.removeEventListener("pointerdown", primeAudio, { capture: true });
      window.removeEventListener("keydown", primeAudio, { capture: true });
      window.removeEventListener("keydown", handleKeyDown);
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

  const handleCompactPlayerToggle = () => {
    const nextValue = !isCompactPlayerEnabled();

    setIsCompactPlayerEnabled(nextValue);
    window.localStorage.setItem(compactPlayerStorageKey, String(nextValue));
    if (nextValue) {
      if (compactPlayerPosition() === "top") {
        setIsBatteryStatusEnabled(false);
        setIsCpuStatusEnabled(false);
        window.localStorage.setItem(batteryStatusStorageKey, "false");
        window.localStorage.setItem(cpuStatusStorageKey, "false");
      }
    }
    haptics.click();
  };

  const handleCompactPlayerPositionToggle = () => {
    const nextPosition: CompactPlayerPosition =
      compactPlayerPosition() === "top" ? "bottom" : "top";

    setCompactPlayerPosition(nextPosition);
    window.localStorage.setItem(compactPlayerPositionStorageKey, nextPosition);

    if (nextPosition === "top" && isCompactPlayerEnabled()) {
      setIsBatteryStatusEnabled(false);
      setIsCpuStatusEnabled(false);
      window.localStorage.setItem(batteryStatusStorageKey, "false");
      window.localStorage.setItem(cpuStatusStorageKey, "false");
    }

    haptics.click();
  };

  const handleBatteryStatusToggle = () => {
    const nextValue = !isBatteryStatusEnabled();

    setIsBatteryStatusEnabled(nextValue);
    window.localStorage.setItem(batteryStatusStorageKey, String(nextValue));
    if (nextValue && compactPlayerPosition() === "top") {
      setIsCompactPlayerEnabled(false);
      window.localStorage.setItem(compactPlayerStorageKey, "false");
    }
    haptics.click();
  };

  const handleCpuStatusToggle = () => {
    const nextValue = !isCpuStatusEnabled();

    setIsCpuStatusEnabled(nextValue);
    window.localStorage.setItem(cpuStatusStorageKey, String(nextValue));
    if (nextValue && compactPlayerPosition() === "top") {
      setIsCompactPlayerEnabled(false);
      window.localStorage.setItem(compactPlayerStorageKey, "false");
    }
    haptics.click();
  };

  if (route === "tweaks") {
    return (
      <TweaksPage
        isBatteryStatusEnabled={isBatteryStatusEnabled}
        isCompactPlayerEnabled={isCompactPlayerEnabled}
        isCompactPlayerInHeader={() => compactPlayerPosition() === "top"}
        isCpuStatusEnabled={isCpuStatusEnabled}
        onBatteryStatusToggle={handleBatteryStatusToggle}
        onCompactPlayerPositionToggle={handleCompactPlayerPositionToggle}
        onCompactPlayerToggle={handleCompactPlayerToggle}
        onCpuStatusToggle={handleCpuStatusToggle}
        onPresetSelect={handlePresetSelect}
        selectedPreset={selectedPreset}
      />
    );
  }

  return (
    <div class="flex min-h-screen flex-col overflow-x-hidden bg-black px-4 text-white sm:px-6">
      <Header
        isBatteryStatusEnabled={isBatteryStatusEnabled}
        isCompactPlayerEnabled={isCompactPlayerInHeader}
        isCpuStatusEnabled={isCpuStatusEnabled}
        activeTrackUrl={activeMidiUrl}
        isPlaying={isMidiPlaying}
        midiPlayback={midiPlayback}
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
      <ComingSoon
        onHover={handleHover}
        onPress={handlePress}
      />
      <Projects
        onHover={handleHover}
        onPress={handlePress}
      />
      <Footer
        activeTrackUrl={activeMidiUrl}
        isCompactPlayerEnabled={isCompactPlayerInFooter}
        isPlaying={isMidiPlaying}
        midiPlayback={midiPlayback}
      />
    </div>
  );
}

interface TweaksPageProps {
  selectedPreset: () => SoundPreset;
  isCompactPlayerEnabled: () => boolean;
  isCompactPlayerInHeader: () => boolean;
  isBatteryStatusEnabled: () => boolean;
  isCpuStatusEnabled: () => boolean;
  onPresetSelect: (preset: SoundPreset) => void;
  onCompactPlayerToggle: () => void;
  onCompactPlayerPositionToggle: () => void;
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
              { title: "Show the compact music player",  enabled: props.isCompactPlayerEnabled, onToggle: props.onCompactPlayerToggle },
              { title: "Place compact music player in the header",  enabled: props.isCompactPlayerInHeader, onToggle: props.onCompactPlayerPositionToggle },
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
