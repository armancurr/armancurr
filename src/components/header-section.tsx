import { BorderPlus } from "./border-plus";

export function HeaderSection() {
  return (
    <header class="relative z-10 w-full">
      <div class="relative mx-auto h-24 w-full max-w-6xl border-x border-white/10 sm:h-32">
        <BorderPlus edge="bottom" side="left" />
        <BorderPlus edge="bottom" side="right" />
      </div>
    </header>
  );
}
