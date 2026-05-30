import { onCleanup, onMount } from "solid-js";

export function useTweaksSecret() {
  onMount(() => {
    const secret = "tweaks";
    let buffer = "";
    let bufferTimer: ReturnType<typeof setTimeout> | null = null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.length !== 1) return;

      buffer += e.key.toLowerCase();
      if (buffer.length > secret.length) buffer = buffer.slice(-secret.length);

      if (bufferTimer !== null) clearTimeout(bufferTimer);
      bufferTimer = setTimeout(() => { buffer = ""; }, 1500);

      if (buffer === secret) window.location.href = "/tweaks";
    };

    window.addEventListener("keydown", handleKeyDown);

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
      if (bufferTimer !== null) clearTimeout(bufferTimer);
    });
  });
}
