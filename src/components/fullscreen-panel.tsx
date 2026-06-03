import { ArrowsInSimple, ArrowsOutSimple } from "phosphor-solid";
import {
  Show,
  type Accessor,
  type JSX,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";

type FullscreenPanelProps = {
  id?: string;
  class: string;
  children: JSX.Element;
  isFullscreenEnabled?: Accessor<boolean>;
  onPointerDown?: () => void;
};

export function FullscreenPanel(props: FullscreenPanelProps) {
  let panel: HTMLDivElement | undefined;
  const [isFullscreen, setIsFullscreen] = createSignal(false);
  const isFullscreenEnabled = () => props.isFullscreenEnabled?.() ?? false;

  const toggleFullscreen = async (event: MouseEvent) => {
    event.stopPropagation();

    if (!panel) return;

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

  createEffect(() => {
    if (panel && !isFullscreenEnabled() && document.fullscreenElement === panel) {
      void document.exitFullscreen();
    }
  });

  return (
    <div
      ref={(element) => {
        panel = element;
      }}
      id={props.id}
      class={`${props.class} group fullscreen-panel`}
      onPointerDown={props.onPointerDown}
    >
      <Show when={isFullscreenEnabled()}>
        <button
          type="button"
          aria-pressed={isFullscreen()}
          aria-label={isFullscreen() ? "Exit fullscreen" : "Enter fullscreen"}
          class="absolute top-4 right-4 z-20 cursor-pointer p-1 text-white/70 opacity-0 transition-opacity group-hover:opacity-100 hover:text-white focus-visible:opacity-100"
          onClick={toggleFullscreen}
          onPointerDown={(event) => event.stopPropagation()}
        >
          {isFullscreen() ? (
            <ArrowsInSimple size={22} weight="fill" />
          ) : (
            <ArrowsOutSimple size={22} weight="fill" />
          )}
        </button>
      </Show>

      {props.children}
    </div>
  );
}
