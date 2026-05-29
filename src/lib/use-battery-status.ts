import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

type BatteryManager = EventTarget & {
  charging: boolean;
  level: number;
};

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>;
  userAgentData?: {
    brands?: Array<{ brand: string }>;
  };
};

type BatteryStatus = {
  charging: boolean;
  level: number;
};

function isGoogleChrome(nav: NavigatorWithBattery) {
  return nav.userAgentData?.brands?.some(
    ({ brand }) => brand === "Google Chrome",
  ) ?? false;
}

export function createBatteryStatus(segmentCount: number) {
  const [status, setStatus] = createSignal<BatteryStatus>();
  const [chargingSegments, setChargingSegments] = createSignal(0);
  const [chargingDirection, setChargingDirection] = createSignal<1 | -1>(1);

  onMount(() => {
    const nav = navigator as NavigatorWithBattery;

    if (!isGoogleChrome(nav) || typeof nav.getBattery !== "function") return;

    let manager: BatteryManager | undefined;

    const updateBattery = () => {
      if (!manager) return;

      setStatus({
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
        setStatus(undefined);
      });

    onCleanup(() => {
      manager?.removeEventListener("levelchange", updateBattery);
      manager?.removeEventListener("chargingchange", updateBattery);
    });
  });

  const level = () => status()?.level ?? 0;
  const litSegments = () => Math.round((level() / 100) * segmentCount);
  const isCharging = () => status()?.charging ?? false;

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

  return {
    status,
    level,
    litSegments,
    isCharging,
    chargingSegments,
  };
}
