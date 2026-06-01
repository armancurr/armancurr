import { createSignal, onCleanup, onMount } from "solid-js";

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
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { TweaksPage } from "./pages/tweaks";

const soundPresetStorageKey = "site:sound-preset";
const compactPlayerStorageKey = "site:compact-player-enabled";
const compactPlayerPositionStorageKey = "site:compact-player-position";
const batteryStatusStorageKey = "site:battery-status-enabled";
const cpuStatusStorageKey = "site:cpu-status-enabled";
const fullscreenPanelsStorageKey = "site:fullscreen-panels-enabled";

type CompactPlayerPosition = "top" | "bottom";
type AppRoute = "home" | "tweaks" | "not-found";

function getRoute(pathname: string): AppRoute {
  if (pathname === "/") return "home";
  if (pathname === "/tweaks") return "tweaks";

  return "not-found";
}

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
  const [isFullscreenPanelsEnabled, setIsFullscreenPanelsEnabled] = createSignal(
    getStoredBoolean(fullscreenPanelsStorageKey),
  );
  const [activeMidiUrl, setActiveMidiUrl] = createSignal<string | null>(getRandomMidiUrl());
  const [isMidiPlaying, setIsMidiPlaying] = createSignal(false);
  const [playbackTick, setPlaybackTick] = createSignal(Date.now());
  const route = getRoute(window.location.pathname);
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

  const handleFullscreenPanelsToggle = () => {
    const nextValue = !isFullscreenPanelsEnabled();

    setIsFullscreenPanelsEnabled(nextValue);
    window.localStorage.setItem(fullscreenPanelsStorageKey, String(nextValue));
    haptics.click();
  };

  if (route === "tweaks") {
    return (
      <TweaksPage
        isBatteryStatusEnabled={isBatteryStatusEnabled}
        isCompactPlayerEnabled={isCompactPlayerEnabled}
        isCompactPlayerInHeader={() => compactPlayerPosition() === "top"}
        isCpuStatusEnabled={isCpuStatusEnabled}
        isFullscreenPanelsEnabled={isFullscreenPanelsEnabled}
        onBatteryStatusToggle={handleBatteryStatusToggle}
        onCompactPlayerPositionToggle={handleCompactPlayerPositionToggle}
        onCompactPlayerToggle={handleCompactPlayerToggle}
        onCpuStatusToggle={handleCpuStatusToggle}
        onFullscreenPanelsToggle={handleFullscreenPanelsToggle}
        onPresetSelect={handlePresetSelect}
        selectedPreset={selectedPreset}
      />
    );
  }

  if (route === "not-found") {
    return <NotFoundPage />;
  }

  return (
    <HomePage
      activeTrackUrl={activeMidiUrl}
      isBatteryStatusEnabled={isBatteryStatusEnabled}
      isCompactPlayerInFooter={isCompactPlayerInFooter}
      isCompactPlayerInHeader={isCompactPlayerInHeader}
      isCpuStatusEnabled={isCpuStatusEnabled}
      isFullscreenPanelsEnabled={isFullscreenPanelsEnabled}
      isMidiPlaying={isMidiPlaying}
      midiPlayback={midiPlayback}
      onHover={handleHover}
      onPress={handlePress}
    />
  );
}
