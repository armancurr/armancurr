import { For, Show, createEffect, createSignal, onCleanup, onMount } from "solid-js";

type BatteryManager = EventTarget & {
  charging: boolean;
  level: number;
};

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>;
};

const batterySegments = Array.from({ length: 36 });

function HeaderCorners() {
  return (
    <>
      <span aria-hidden="true" class="pointer-events-none absolute bottom-0 left-0 z-10">
        <span class="absolute bottom-[-1px] left-[-1px] h-px w-2 bg-white/40" />
        <span class="absolute bottom-[-8px] left-[-1px] h-4 w-px bg-white/40" />
      </span>
      <span aria-hidden="true" class="pointer-events-none absolute bottom-0 right-0 z-10">
        <span class="absolute bottom-[-1px] right-[-1px] h-px w-2 bg-white/40" />
        <span class="absolute bottom-[-8px] right-[-1px] h-4 w-px bg-white/40" />
      </span>
    </>
  );
}

export function HeaderSection() {
  const [battery, setBattery] = createSignal<{
    charging: boolean;
    level: number;
  }>();
  const [chargingSegments, setChargingSegments] = createSignal(0);
  const [chargingDirection, setChargingDirection] = createSignal<1 | -1>(1);

  onMount(() => {
    const nav = navigator as NavigatorWithBattery;

    if (typeof nav.getBattery !== "function") return;

    let manager: BatteryManager | undefined;

    const updateBattery = () => {
      if (!manager) return;

      setBattery({
        charging: manager.charging,
        level: Math.round(manager.level * 100),
      });
    };

    void nav
      .getBattery()
      .then((nextManager) => {
        manager = nextManager;
        updateBattery();

        manager.addEventListener("levelchange", updateBattery);
        manager.addEventListener("chargingchange", updateBattery);
      })
      .catch(() => {
        manager = undefined;
        setBattery(undefined);
      });

    onCleanup(() => {
      manager?.removeEventListener("levelchange", updateBattery);
      manager?.removeEventListener("chargingchange", updateBattery);
    });
  });

  const level = () => battery()?.level ?? 0;
  const litSegments = () => Math.round((level() / 100) * batterySegments.length);
  const isCharging = () => battery()?.charging ?? false;

  createEffect(() => {
    if (!isCharging()) {
      setChargingSegments(0);
      setChargingDirection(1);
      return;
    }

    const interval = window.setInterval(() => {
      setChargingSegments((segment) => {
        const maxSegment = litSegments();
        const nextSegment = segment + chargingDirection();

        if (nextSegment >= maxSegment) {
          setChargingDirection(-1);
          return maxSegment;
        }

        if (nextSegment <= 0) {
          setChargingDirection(1);
          return 0;
        }

        return nextSegment;
      });
    }, 500);

    onCleanup(() => window.clearInterval(interval));
  });

  const batteryCellClass = (index: number) => {
    const isWithinLevel = index < litSegments();
    const isChargingActive = isCharging() && index < chargingSegments();

    if (!isWithinLevel) return "bg-transparent";

    const borderClass = index > 0 ? "border-l border-white/10" : "";

    const fillClass = isChargingActive ? "bg-neutral-900/50" : "bg-black";

    return `${fillClass} ${borderClass}`;
  };

  return (
    <header class="relative z-10 w-full">
      <div class="relative mx-auto h-24 w-full max-w-6xl overflow-visible border-x border-white/10 sm:h-32">
        <HeaderCorners />

        <Show when={battery()}>
          <div
            aria-label={`Device battery ${level()} percent${isCharging() ? ", charging" : ""}`}
            class="relative h-full"
            role="status"
          >
            <div
              aria-hidden="true"
              class="grid h-full grid-cols-36"
            >
              <For each={batterySegments}>
                {(_, index) => (
                  <div
                    class={batteryCellClass(index())}
                  />
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </header>
  );
}
