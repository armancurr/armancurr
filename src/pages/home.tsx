import type { Accessor } from "solid-js";

import { About } from "../components/about";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { Hero } from "../components/hero";
import { Project1 } from "../components/project-1";
import { Project2 } from "../components/project-2";
import { Work } from "../components/work";
import type { MidiPlaybackSnapshot } from "../lib/use-sound";

interface HomePageProps {
  activeTrackUrl: Accessor<string | null>;
  isBatteryStatusEnabled: Accessor<boolean>;
  isMusicPlayerInHeader: Accessor<boolean>;
  isCpuStatusEnabled: Accessor<boolean>;
  isFullscreenPanelsEnabled: Accessor<boolean>;
  isMidiPlaying: Accessor<boolean>;
  midiPlayback: Accessor<MidiPlaybackSnapshot | null>;
  onHover: () => void;
  onPress: () => void;
}

export function HomePage(props: HomePageProps) {
  return (
    <div class="flex min-h-screen flex-col bg-black px-4 text-white sm:px-6">
      <Header
        isBatteryStatusEnabled={props.isBatteryStatusEnabled}
        isMusicPlayerEnabled={props.isMusicPlayerInHeader}
        isCpuStatusEnabled={props.isCpuStatusEnabled}
        activeTrackUrl={props.activeTrackUrl}
        isPlaying={props.isMidiPlaying}
        midiPlayback={props.midiPlayback}
      />
      <Hero />
      <About
        isFullscreenEnabled={props.isFullscreenPanelsEnabled}
        onHover={props.onHover}
        onPress={props.onPress}
      />
      <Work
        isFullscreenEnabled={props.isFullscreenPanelsEnabled}
        onHover={props.onHover}
        onPress={props.onPress}
      />
      <Project1
        isFullscreenEnabled={props.isFullscreenPanelsEnabled}
        onHover={props.onHover}
        onPress={props.onPress}
      />
      <Project2
        isFullscreenEnabled={props.isFullscreenPanelsEnabled}
        onHover={props.onHover}
        onPress={props.onPress}
      />
      <Footer
      />
    </div>
  );
}
