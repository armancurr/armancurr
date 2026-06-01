import { ArrowsInSimple, ArrowsOutSimple } from "phosphor-solid";
import { type JSX, createSignal, onCleanup, onMount } from "solid-js";

type FullscreenPanelProps = {
  id?: string;
  class: string;
  children: JSX.Element;
  onPointerEnter?: () => void;
  onPointerDown?: () => void;
};

export function FullscreenPanel(props: FullscreenPanelProps) {
  let panel!: HTMLDivElement;
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  const toggleFullscreen = async (event: MouseEvent) => {
    event.stopPropagation();

    if (document.fullscreenElement === panel) {
      await document.exitFullscreen();
      return;
    }

    await panel.requestFullscreen({ navigationUI: "hide" });
  };

  onMount(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === panel);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    onCleanup(() => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    });
  });

  return (
    <div
      ref={panel}
      id={props.id}
      class={`${props.class} group fullscreen-panel`}
      onPointerEnter={props.onPointerEnter}
      onPointerDown={props.onPointerDown}
    >
      <button
        type="button"
        aria-pressed={isFullscreen()}
        aria-label={isFullscreen() ? "Exit fullscreen" : "Enter fullscreen"}
        class="absolute right-4 top-4 z-20 cursor-pointer p-1 text-white/70 opacity-0 transition-opacity hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
        onClick={toggleFullscreen}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {isFullscreen() ? (
          <ArrowsInSimple size={22} weight="fill" />
        ) : (
          <ArrowsOutSimple size={22} weight="fill" />
        )}
      </button>

      {props.children}
    </div>
  );
}
