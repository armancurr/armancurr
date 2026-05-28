type BorderPlusProps = {
  edge: "top" | "bottom";
  side: "left" | "right";
};

export function BorderPlus(props: BorderPlusProps) {
  const edgeClass = props.edge === "top" ? "top-0" : "bottom-0";
  const sideClass = props.side === "left" ? "left-0" : "right-0";

  return (
    <span
      aria-hidden="true"
      class={`pointer-events-none absolute ${edgeClass} ${sideClass} z-10 block`}
    >
      <span class="absolute left-[-8px] top-[-0.5px] h-px w-4 bg-white/40" />
      <span class="absolute left-[-0.5px] top-[-8px] h-4 w-px bg-white/40" />
    </span>
  );
}
