import { For } from "solid-js";
import { Pause, Play } from "phosphor-solid";

import { getMidiCoverUrl, getMidiUrl, midiTracks } from "../config/midi-tracks";
import type { SoundPreset } from "../lib/use-sound";

type PlayerProps = {
  selectedPreset: () => SoundPreset;
  activeTrackUrl: () => string | null;
  isPlaying: () => boolean;
  onHover: () => void;
  onToggleTrack: (url: string) => void;
};

export function Player(props: PlayerProps) {
  return (
    <section class="w-full">
      <div
        id="player"
        class="relative mx-auto grid w-full max-w-6xl content-center border-x border-b border-neutral-900 px-6 py-14 hover:bg-neutral-900/50 sm:px-8 md:h-[min(62vw,620px)] md:min-h-[360px] md:px-10 md:py-0"
        onPointerEnter={props.onHover}
      >
        <span aria-hidden="true" class="pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
          <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-neutral-400" />
        </span>
        <span aria-hidden="true" class="pointer-events-none absolute bottom-0 right-0 z-10">
          <span class="absolute bottom-[-1px] right-[-1px] h-px w-2 bg-neutral-400" />
          <span class="absolute bottom-[-8px] right-[-1px] h-4 w-px bg-neutral-400" />
        </span>

        <div class="min-w-0">
          <div class="mb-10 md:mb-12">
            <p class="text-sm uppercase tracking-[0.2em] text-white/50">
              bizarre player
            </p>
          </div>

          <div class="flex max-w-full snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <For each={midiTracks}>
              {(track) => {
                const url = () => getMidiUrl(track);
                const active = () => props.activeTrackUrl() === url();
                const playing = () => active() && props.isPlaying();

                return (
                  <article class="group w-[78vw] shrink-0 snap-start sm:w-80 lg:w-[348px]">
                    <span class="block aspect-square overflow-hidden">
                      <img
                        src={getMidiCoverUrl(track)}
                        alt={`${track.title} cover`}
                        class="h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                        loading="lazy"
                      />
                    </span>
                    <span class="flex items-end justify-between gap-4 py-4">
                      <span>
                        <span class="block text-lg font-medium text-white">
                          {track.title}
                        </span>
                        <span class="mt-1 block text-sm text-white/45">
                          {track.artist}
                        </span>
                      </span>
                      <button
                        type="button"
                        class="inline-flex h-10 w-10 shrink-0 items-center justify-center text-white/70 hover:text-white"
                        aria-label={`${playing() ? "Pause" : "Play"} ${track.title}`}
                        onClick={() => {
                          props.onToggleTrack(url());
                        }}
                      >
                        {playing() ? (
                          <Pause size={22} weight="fill" />
                        ) : (
                          <Play size={22} weight="fill" />
                        )}
                      </button>
                    </span>
                  </article>
                );
              }}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
}
