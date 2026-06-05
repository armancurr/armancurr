import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

import { getMidiUrl, midiTracks } from "./config/midi-tracks";
import { getProjectBySlug, type ProjectConfig } from "./config/projects";
import { haptics } from "./lib/use-haptics";
import {
  isAudioReady,
  getMidiPlaybackSnapshot,
  playLensScrollClick,
  soundPresetLabels,
  toggleMidiFile,
  type MidiPlaybackSnapshot,
  type SoundPreset,
  unlockAudio,
} from "./lib/use-sound";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";
import { ProjectRepoPage } from "./pages/project-repo";
import { TweaksPage } from "./pages/tweaks";

const soundPresetStorageKey = "site:sound-preset";
const musicPlayerStorageKey = "site:music-player-enabled";
const selectedMidiTrackStorageKey = "site:selected-midi-track";
const batteryStatusStorageKey = "site:battery-status-enabled";
const cpuStatusStorageKey = "site:cpu-status-enabled";
const fullscreenPanelsStorageKey = "site:fullscreen-panels-enabled";
const projectRepoPagesStorageKey = "site:project-repo-pages-enabled";
const scrollSoundEnabledStorageKey = "site:scroll-sound-enabled";
const googleSansCodeStorageKey = "site:google-sans-code-enabled";
const darkModeStorageKey = "site:dark-mode-enabled";
const scrollLensClickDistance = 96;
const scrollLensClickMinInterval = 58;

type AppRoute =
  | { name: "home" }
  | { name: "tweaks" }
  | { name: "project"; project: ProjectConfig }
  | { name: "not-found" };

function getRoute(pathname: string): AppRoute {
  if (pathname === "/") return { name: "home" };
  if (pathname === "/tweaks") return { name: "tweaks" };

  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/);

  if (projectMatch) {
    const project = getProjectBySlug(projectMatch[1]);

    if (project) return { name: "project", project };
  }

  return { name: "not-found" };
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

function getStoredMidiTrackUrl(): string {
  const fallbackUrl = getMidiUrl(midiTracks[0]);

  if (typeof window === "undefined") return fallbackUrl;

  const storedUrl = window.localStorage.getItem(selectedMidiTrackStorageKey);

  return storedUrl && midiTracks.some((track) => getMidiUrl(track) === storedUrl)
    ? storedUrl
    : fallbackUrl;
}

export default function App() {
  const initialMusicPlayerEnabled = getStoredBoolean(musicPlayerStorageKey);
  const [selectedPreset] = createSignal<SoundPreset>(getStoredSoundPreset());
  const [isMusicPlayerEnabled, setIsMusicPlayerEnabled] = createSignal(initialMusicPlayerEnabled);
  const [isBatteryStatusEnabled, setIsBatteryStatusEnabled] = createSignal(
    !initialMusicPlayerEnabled && getStoredBoolean(batteryStatusStorageKey),
  );
  const [isCpuStatusEnabled, setIsCpuStatusEnabled] = createSignal(
    !initialMusicPlayerEnabled && getStoredBoolean(cpuStatusStorageKey),
  );
  const [isFullscreenPanelsEnabled, setIsFullscreenPanelsEnabled] = createSignal(
    getStoredBoolean(fullscreenPanelsStorageKey),
  );
  const [isProjectRepoPagesEnabled, setIsProjectRepoPagesEnabled] = createSignal(
    getStoredBoolean(projectRepoPagesStorageKey),
  );
  const [isScrollSoundEnabled, setIsScrollSoundEnabled] = createSignal(
    getStoredBoolean(scrollSoundEnabledStorageKey),
  );
  const [isGoogleSansCodeEnabled, setIsGoogleSansCodeEnabled] = createSignal(
    getStoredBoolean(googleSansCodeStorageKey),
  );
  const [isDarkModeEnabled, setIsDarkModeEnabled] = createSignal(
    getStoredBoolean(darkModeStorageKey),
  );
  const [activeMidiUrl, setActiveMidiUrl] = createSignal<string | null>(getStoredMidiTrackUrl());
  const [isMidiPlaying, setIsMidiPlaying] = createSignal(false);
  const [playbackTick, setPlaybackTick] = createSignal(Date.now());
  const route = getRoute(window.location.pathname);
  const isMusicPlayerInHeader = () => isMusicPlayerEnabled();

  createEffect(() => {
    document.documentElement.classList.toggle("font-google-sans-code", isGoogleSansCodeEnabled());
  });

  createEffect(() => {
    document.documentElement.classList.toggle("light", !isDarkModeEnabled());
  });

  onMount(() => {
    let wheelSinceClick = 0;
    let lastLensClickAt = 0;

    const primeAudio = () => {
      void unlockAudio();
    };
    const handleWheel = (event: WheelEvent) => {
      const delta = event.deltaY || event.deltaX;
      if (!delta || !isScrollSoundEnabled() || !isAudioReady()) return;

      const normalizedDelta =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? delta * 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? delta * window.innerHeight
            : delta;

      wheelSinceClick += Math.abs(normalizedDelta);

      const now = performance.now();
      if (
        wheelSinceClick < scrollLensClickDistance ||
        now - lastLensClickAt < scrollLensClickMinInterval
      ) {
        return;
      }

      const intensity = Math.min(wheelSinceClick / 420, 1);

      playLensScrollClick({
        direction: normalizedDelta > 0 ? 1 : -1,
        intensity,
      });
      wheelSinceClick = 0;
      lastLensClickAt = now;
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && !event.altKey && !event.metaKey && event.code === "Comma") {
        event.preventDefault();
        window.location.href = route.name === "tweaks" ? "/" : "/tweaks";
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (!isMusicPlayerEnabled() || isTyping || event.code !== "Space") return;

      event.preventDefault();
      handleMidiToggle(activeMidiUrl() ?? getMidiUrl(midiTracks[0]));
    };

    window.addEventListener("pointerdown", primeAudio, { capture: true });
    window.addEventListener("keydown", primeAudio, { capture: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: true });

    const progressInterval = window.setInterval(() => {
      setPlaybackTick(Date.now());
    }, 250);

    onCleanup(() => {
      window.removeEventListener("pointerdown", primeAudio, { capture: true });
      window.removeEventListener("keydown", primeAudio, { capture: true });
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
      window.clearInterval(progressInterval);
    });
  });

  const midiPlayback = (): MidiPlaybackSnapshot | null => {
    playbackTick();
    return getMidiPlaybackSnapshot();
  };

  const handlePress = () => {
    void unlockAudio().then((ready) => {
      if (ready) playLensScrollClick({ direction: 1, intensity: 0.7 });
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

  const handleMidiTrackSelect = (url: string) => {
    setActiveMidiUrl(url);
    window.localStorage.setItem(selectedMidiTrackStorageKey, url);
    haptics.click();
  };

  const handleMusicPlayerToggle = () => {
    const nextValue = !isMusicPlayerEnabled();

    setIsMusicPlayerEnabled(nextValue);
    window.localStorage.setItem(musicPlayerStorageKey, String(nextValue));
    if (nextValue) {
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
    if (nextValue) {
      setIsMusicPlayerEnabled(false);
      window.localStorage.setItem(musicPlayerStorageKey, "false");
    }
    haptics.click();
  };

  const handleCpuStatusToggle = () => {
    const nextValue = !isCpuStatusEnabled();

    setIsCpuStatusEnabled(nextValue);
    window.localStorage.setItem(cpuStatusStorageKey, String(nextValue));
    if (nextValue) {
      setIsMusicPlayerEnabled(false);
      window.localStorage.setItem(musicPlayerStorageKey, "false");
    }
    haptics.click();
  };

  const handleFullscreenPanelsToggle = () => {
    const nextValue = !isFullscreenPanelsEnabled();

    setIsFullscreenPanelsEnabled(nextValue);
    window.localStorage.setItem(fullscreenPanelsStorageKey, String(nextValue));
    haptics.click();
  };

  const handleProjectRepoPagesToggle = () => {
    const nextValue = !isProjectRepoPagesEnabled();

    setIsProjectRepoPagesEnabled(nextValue);
    window.localStorage.setItem(projectRepoPagesStorageKey, String(nextValue));
    haptics.click();
  };

  const handleScrollSoundToggle = () => {
    const nextValue = !isScrollSoundEnabled();

    setIsScrollSoundEnabled(nextValue);
    window.localStorage.setItem(scrollSoundEnabledStorageKey, String(nextValue));
    if (nextValue) {
      void unlockAudio().then((ready) => {
        if (ready) playLensScrollClick({ direction: 1, intensity: 0.7 });
      });
    }
    haptics.click();
  };

  const handleGoogleSansCodeToggle = () => {
    const nextValue = !isGoogleSansCodeEnabled();

    setIsGoogleSansCodeEnabled(nextValue);
    window.localStorage.setItem(googleSansCodeStorageKey, String(nextValue));
    haptics.click();
  };

  const handleDarkModeToggle = () => {
    const nextValue = !isDarkModeEnabled();

    setIsDarkModeEnabled(nextValue);
    window.localStorage.setItem(darkModeStorageKey, String(nextValue));
    haptics.click();
  };

  if (route.name === "tweaks") {
    return (
      <TweaksPage
        isBatteryStatusEnabled={isBatteryStatusEnabled}
        isMusicPlayerEnabled={isMusicPlayerEnabled}
        isCpuStatusEnabled={isCpuStatusEnabled}
        isFullscreenPanelsEnabled={isFullscreenPanelsEnabled}
        isProjectRepoPagesEnabled={isProjectRepoPagesEnabled}
        isGoogleSansCodeEnabled={isGoogleSansCodeEnabled}
        isDarkModeEnabled={isDarkModeEnabled}
        isScrollSoundEnabled={isScrollSoundEnabled}
        onBatteryStatusToggle={handleBatteryStatusToggle}
        onMusicPlayerToggle={handleMusicPlayerToggle}
        onCpuStatusToggle={handleCpuStatusToggle}
        onFullscreenPanelsToggle={handleFullscreenPanelsToggle}
        onProjectRepoPagesToggle={handleProjectRepoPagesToggle}
        onGoogleSansCodeToggle={handleGoogleSansCodeToggle}
        onDarkModeToggle={handleDarkModeToggle}
        onScrollSoundToggle={handleScrollSoundToggle}
        onMidiTrackSelect={handleMidiTrackSelect}
        selectedMidiTrackUrl={activeMidiUrl}
      />
    );
  }

  if (route.name === "project") {
    return <ProjectRepoPage project={route.project} />;
  }

  if (route.name === "not-found") {
    return <NotFoundPage />;
  }

  return (
    <HomePage
      activeTrackUrl={activeMidiUrl}
      isBatteryStatusEnabled={isBatteryStatusEnabled}
      isMusicPlayerInHeader={isMusicPlayerInHeader}
      isCpuStatusEnabled={isCpuStatusEnabled}
      isFullscreenPanelsEnabled={isFullscreenPanelsEnabled}
      isProjectRepoPagesEnabled={isProjectRepoPagesEnabled}
      isMidiPlaying={isMidiPlaying}
      midiPlayback={midiPlayback}
      onPress={handlePress}
    />
  );
}
