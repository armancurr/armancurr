import { For, Show, type Accessor } from "solid-js";
import { Pause, Play } from "phosphor-solid";

import { getMidiCoverUrl, getMidiUrl, midiTracks } from "../config/midi-tracks";
import type { MidiPlaybackSnapshot } from "../lib/use-sound";

const progressSegments = Array.from({ length: 36 });

type FooterProps = {
  activeTrackUrl: Accessor<string | null>;
  isCompactPlayerEnabled: Accessor<boolean>;
  isPlaying: Accessor<boolean>;
  midiPlayback: Accessor<MidiPlaybackSnapshot | null>;
  onToggleTrack: (url: string) => void;
};

export function Footer(props: FooterProps) {
  const currentTrack = () => {
    return (
      midiTracks.find((track) => getMidiUrl(track) === props.activeTrackUrl()) ??
      midiTracks[0]
    );
  };
  const currentTrackUrl = () => getMidiUrl(currentTrack());
  const isCurrentTrackPlaying = () =>
    props.activeTrackUrl() === currentTrackUrl() && props.isPlaying();
  const progressRatio = () => {
    const playback = props.midiPlayback();

    if (!playback || playback.url !== currentTrackUrl() || playback.durationSeconds <= 0) {
      return 0;
    }

    return Math.min(playback.progressSeconds / playback.durationSeconds, 1);
  };
  const litSegments = () => Math.round(progressRatio() * progressSegments.length);
  const progressCellClass = (index: number) => {
    const borderClass = index > 0 ? "border-l border-neutral-900" : "";
    const fillClass = index < litSegments() ? "bg-neutral-900/50" : "bg-transparent";

    return `${fillClass} ${borderClass}`;
  };

  return (
    <footer class="w-full">
      <div class="relative mx-auto flex h-24 w-full max-w-6xl items-center border-x border-neutral-900 px-6 sm:h-32 sm:px-8 md:px-10">
        <span aria-hidden="true" class="pointer-events-none absolute left-1/2 top-[-1px] h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <span aria-hidden="true" class="pointer-events-none absolute left-0 top-0 z-10">
          <span class="absolute left-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute left-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute right-0 top-0 z-10">
          <span class="absolute right-[-1px] top-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute right-[-1px] top-[-8px] h-4 w-px bg-neutral-400" />
        </span>

        <Show when={props.isCompactPlayerEnabled()}>
          <div class="grid w-full grid-cols-[48px_1fr_auto] items-center gap-4 sm:grid-cols-[56px_1fr_auto] sm:gap-5">
            <img
              src={getMidiCoverUrl(currentTrack())}
              alt={`${currentTrack().title} cover`}
              class="h-12 w-12 object-cover grayscale sm:h-14 sm:w-14"
              loading="lazy"
            />

            <div class="min-w-0">
              <div class="flex min-w-0 items-baseline gap-2">
                <p class="truncate text-sm font-medium text-white sm:text-base">
                  {currentTrack().title}
                </p>
                <p class="hidden truncate text-sm text-white/45 sm:block">
                  {currentTrack().artist}
                </p>
              </div>
              <p class="mt-1 truncate text-xs text-white/45 sm:hidden">
                {currentTrack().artist}
              </p>
              <div
                aria-label={`Playback progress ${Math.round(progressRatio() * 100)} percent`}
                class="mt-3 h-2 w-full border border-neutral-900"
                role="status"
              >
                <div aria-hidden="true" class="grid h-full grid-cols-36">
                  <For each={progressSegments}>
                    {(_, index) => <div class={progressCellClass(index())} />}
                  </For>
                </div>
              </div>
            </div>

            <button
              type="button"
              class="inline-flex h-10 w-10 items-center justify-center text-white/70 hover:text-white"
              aria-label={`${isCurrentTrackPlaying() ? "Pause" : "Play"} ${currentTrack().title}`}
              onClick={() => props.onToggleTrack(currentTrackUrl())}
            >
              {isCurrentTrackPlaying() ? (
                <Pause size={22} weight="fill" />
              ) : (
                <Play size={22} weight="fill" />
              )}
            </button>
          </div>
        </Show>
      </div>
    </footer>
  );
}
