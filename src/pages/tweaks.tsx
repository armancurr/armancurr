import type { Accessor } from "solid-js";

import { PageFrame } from "../components/page-frame";
import type { SoundPreset } from "../lib/use-sound";

interface TweaksPageProps {
  selectedPreset: Accessor<SoundPreset>;
  isCompactPlayerEnabled: Accessor<boolean>;
  isCompactPlayerInHeader: Accessor<boolean>;
  isBatteryStatusEnabled: Accessor<boolean>;
  isCpuStatusEnabled: Accessor<boolean>;
  isFullscreenPanelsEnabled: Accessor<boolean>;
  onPresetSelect: (preset: SoundPreset) => void;
  onCompactPlayerToggle: () => void;
  onCompactPlayerPositionToggle: () => void;
  onBatteryStatusToggle: () => void;
  onCpuStatusToggle: () => void;
  onFullscreenPanelsToggle: () => void;
}

export function TweaksPage(props: TweaksPageProps) {
  return (
    <PageFrame>
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
            { title: "Show the compact music player", enabled: props.isCompactPlayerEnabled, onToggle: props.onCompactPlayerToggle },
            { title: "Place compact music player up top", enabled: props.isCompactPlayerInHeader, onToggle: props.onCompactPlayerPositionToggle },
            { title: "Show battery level (Google Chrome only)", enabled: props.isBatteryStatusEnabled, onToggle: props.onBatteryStatusToggle },
            { title: "Show CPU status (not in Google Chrome)", enabled: props.isCpuStatusEnabled, onToggle: props.onCpuStatusToggle },
            { title: "Enable sections to go fullscreen", enabled: props.isFullscreenPanelsEnabled, onToggle: props.onFullscreenPanelsToggle },
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
      class={`flex flex-col justify-between p-6 text-left transition-colors sm:p-8 ${
        props.enabled() ? "bg-white/[0.04]" : "bg-black"
      } hover:bg-white/[0.06]`}
    >
      <div class="flex justify-end">
        <SettingToggle enabled={props.enabled} onToggle={() => {}} />
      </div>
      <p class={`text-base font-light leading-snug tracking-wide transition-colors sm:text-lg ${props.enabled() ? "text-white" : "text-white/50"}`}>
        {props.title}
      </p>
    </button>
  );
}

interface SettingToggleProps {
  enabled: Accessor<boolean>;
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
