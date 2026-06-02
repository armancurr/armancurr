import type { Accessor } from "solid-js";

import { getMidiUrl, midiTracks } from "../config/midi-tracks";
import { PageFrame } from "../components/page-frame";

interface TweaksPageProps {
  selectedMidiTrackUrl: Accessor<string | null>;
  isMusicPlayerEnabled: Accessor<boolean>;
  isBatteryStatusEnabled: Accessor<boolean>;
  isCpuStatusEnabled: Accessor<boolean>;
  isFullscreenPanelsEnabled: Accessor<boolean>;
  isScrollSoundEnabled: Accessor<boolean>;
  onMusicPlayerToggle: () => void;
  onBatteryStatusToggle: () => void;
  onCpuStatusToggle: () => void;
  onFullscreenPanelsToggle: () => void;
  onScrollSoundToggle: () => void;
  onMidiTrackSelect: (url: string) => void;
}

export function TweaksPage(props: TweaksPageProps) {
  return (
    <PageFrame>
      <div class="flex flex-1 flex-col">
        <div class="grid flex-1 gap-px bg-white/[0.06] lg:grid-cols-2">
          <div class="flex flex-col bg-black">
            {[
              { title: "Show the music player", enabled: props.isMusicPlayerEnabled, onToggle: props.onMusicPlayerToggle },
              { title: "Show battery level (Google Chrome only)", enabled: props.isBatteryStatusEnabled, onToggle: props.onBatteryStatusToggle },
              { title: "Show CPU status (not in Google Chrome)", enabled: props.isCpuStatusEnabled, onToggle: props.onCpuStatusToggle },
              { title: "Enable sections to go fullscreen", enabled: props.isFullscreenPanelsEnabled, onToggle: props.onFullscreenPanelsToggle },
              { title: "Enable sound on scroll", enabled: props.isScrollSoundEnabled, onToggle: props.onScrollSoundToggle },
            ].map((tile) => (
              <SettingTile {...tile} />
            ))}
          </div>
          <div class="flex flex-col bg-black">
            {midiTracks.map((track) => {
              const url = getMidiUrl(track);
              const selected = () => props.selectedMidiTrackUrl() === url;

              return (
                <button
                  type="button"
                  aria-pressed={selected()}
                  onClick={() => props.onMidiTrackSelect(url)}
                  class={`flex h-14 items-center border-b border-white/[0.06] bg-black px-6 text-left transition-colors sm:px-8 ${
                    selected() ? "bg-white/[0.04] text-white" : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span class="text-sm font-light leading-snug tracking-wide sm:text-base">
                    {track.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

interface SettingTileProps {
  title: string;
  enabled: Accessor<boolean>;
  onToggle: () => void;
}

function SettingTile(props: SettingTileProps) {
  return (
    <button
      type="button"
      onClick={props.onToggle}
      class={`flex h-14 items-center justify-between gap-6 border-b border-white/[0.06] px-6 text-left transition-colors sm:px-8 ${
        props.enabled() ? "bg-white/[0.04]" : "bg-black"
      } hover:bg-white/[0.06]`}
    >
      <p class={`text-sm font-light leading-snug tracking-wide transition-colors sm:text-base ${props.enabled() ? "text-white" : "text-white/50"}`}>
        {props.title}
      </p>
      {/* <SettingToggle enabled={props.enabled} /> */}
    </button>
  );
}

interface SettingToggleProps {
  enabled: Accessor<boolean>;
}

function SettingToggle(props: SettingToggleProps) {
  return (
    <span
      aria-pressed={props.enabled()}
      aria-label={props.enabled() ? "Disable setting" : "Enable setting"}
      class="flex justify-self-end"
      role="switch"
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
    </span>
  );
}
