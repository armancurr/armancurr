import { For, Show, type Accessor } from "solid-js";

import { createBatteryStatus } from "../lib/use-battery-status";
import { getCpuStatus } from "../lib/use-cpu-status";

const batterySegments = Array.from({ length: 36 });

function HeaderCorners() {
  return (
    <>
      <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
        <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-neutral-400" />
        <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-neutral-400" />
      </span>
      <span aria-hidden="true" class="pointer-events-none absolute bottom-0 right-0 z-10">
        <span class="absolute bottom-[-1px] right-[-1px] h-px w-2 bg-neutral-400" />
        <span class="absolute bottom-[-8px] right-[-1px] h-4 w-px bg-neutral-400" />
      </span>
    </>
  );
}

type HeaderProps = {
  isBatteryStatusEnabled: Accessor<boolean>;
  isCpuStatusEnabled: Accessor<boolean>;
};

export function Header(props: HeaderProps) {
  const battery = createBatteryStatus(batterySegments.length);
  const cpu = getCpuStatus(batterySegments.length);
  const batteryStatus = () =>
    props.isBatteryStatusEnabled() ? battery.status() : undefined;

  const cpuCellClass = (index: number) => {
    const borderClass = index > 0 ? "border-l border-neutral-900" : "";
    return `${index < cpu.litSegments ? "bg-neutral-900/50" : "bg-transparent"} ${borderClass}`;
  };

  const batteryCellClass = (index: number) => {
    const isWithinLevel = index < battery.litSegments();
    const isChargingActive = battery.isCharging() && index < battery.chargingSegments();
    const borderClass = index > 0 ? "border-l border-neutral-900" : "";

    if (!isWithinLevel) return `bg-transparent ${borderClass}`;

    const fillClass = isChargingActive || !battery.isCharging() ? "bg-neutral-900/50" : "bg-black";

    return `${fillClass} ${borderClass}`;
  };

  return (
    <header class="relative z-10 w-full">
      <div class="relative mx-auto h-24 w-full max-w-6xl overflow-visible border-x border-neutral-900 sm:h-32">
        <span aria-hidden="true" class="pointer-events-none absolute bottom-[-1px] left-1/2 h-px w-screen -translate-x-1/2 bg-neutral-900" />
        <HeaderCorners />

        <Show
          when={batteryStatus()}
          fallback={
            <Show when={props.isCpuStatusEnabled()}>
              <div
                aria-label={`${cpu.cores}-core processor`}
                class="relative h-full"
                role="status"
              >
                <div aria-hidden="true" class="grid h-full grid-cols-36">
                  <For each={batterySegments}>
                    {(_, index) => <div class={cpuCellClass(index())} />}
                  </For>
                </div>
              </div>
            </Show>
          }
        >
          <div
            aria-label={`Device battery ${battery.level()} percent${battery.isCharging() ? ", charging" : ""}`}
            class="relative h-full"
            role="status"
          >
            <div aria-hidden="true" class="grid h-full grid-cols-36">
              <For each={batterySegments}>
                {(_, index) => <div class={batteryCellClass(index())} />}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </header>
  );
}
