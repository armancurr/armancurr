import { onCleanup, onMount } from "solid-js";

import { haptics } from "./lib/use-haptics";
import { playLensClick, unlockAudio } from "./lib/use-sound";
import { HomePage } from "./pages/home";
import { NotFoundPage } from "./pages/not-found";

type AppRoute = { name: "home" } | { name: "not-found" };

function getRoute(pathname: string): AppRoute {
  if (pathname === "/") return { name: "home" };

  return { name: "not-found" };
}

export default function App() {
  const route = getRoute(window.location.pathname);

  onMount(() => {
    const primeAudio = () => {
      void unlockAudio();
    };

    window.addEventListener("pointerdown", primeAudio, { capture: true });
    window.addEventListener("keydown", primeAudio, { capture: true });

    onCleanup(() => {
      window.removeEventListener("pointerdown", primeAudio, { capture: true });
      window.removeEventListener("keydown", primeAudio, { capture: true });
    });
  });

  const handlePress = () => {
    void unlockAudio().then((ready) => {
      if (ready) playLensClick({ direction: 1, intensity: 0.7 });
    });

    haptics.click();
  };

  if (route.name === "not-found") {
    return <NotFoundPage />;
  }

  return <HomePage onPress={handlePress} />;
}
