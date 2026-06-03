import { For, type Accessor } from "solid-js";

import { getMidiUrl, midiTracks } from "../config/midi-tracks";
import type { MidiPlaybackSnapshot } from "../lib/use-sound";

const progressSegments = Array.from({ length: 36 });

type MusicPlayerProps = {
  activeTrackUrl: Accessor<string | null>;
  isPlaying: Accessor<boolean>;
  midiPlayback: Accessor<MidiPlaybackSnapshot | null>;
};

export function MusicPlayer(props: MusicPlayerProps) {
  const currentTrack = () => {
    return (
      midiTracks.find((track) => getMidiUrl(track) === props.activeTrackUrl()) ?? midiTracks[0]
    );
  };
  const currentTrackUrl = () => getMidiUrl(currentTrack());
  const progressRatio = () => {
    const playback = props.midiPlayback();

    if (!playback || playback.url !== currentTrackUrl() || playback.durationSeconds <= 0) {
      return 0;
    }

    return Math.min(playback.progressSeconds / playback.durationSeconds, 1);
  };
  const litSegments = () => Math.round(progressRatio() * progressSegments.length);
  const progressCellClass = (index: number) => {
    const isWithinProgress = index < litSegments();
    const borderClass = index > 0 ? "border-l border-neutral-900" : "";
    const fillClass = isWithinProgress ? "bg-neutral-900/50" : "bg-transparent";

    return `${fillClass} ${borderClass}`;
  };

  return (
    <div class="h-full w-full">
      <output
        aria-label={`Playback progress ${Math.round(progressRatio() * 100)} percent`}
        class="relative h-full"
      >
        <div aria-hidden="true" class="grid h-full grid-cols-36">
          <For each={progressSegments}>
            {(_, index) => <div class={progressCellClass(index())} />}
          </For>
        </div>
      </output>
    </div>
  );
}
