import {
  BellSimple,
  CircleWavy,
  Cpu,
  Disc,
  GlobeHemisphereWest,
  MoonStars,
  MusicNoteSimple,
  SpeakerHigh,
  SpeakerSimpleHigh,
  Sun,
  Wind,
  Drop,
} from "phosphor-solid";

import type { SoundPreset } from "../lib/use-sound";

export const presetOptions = [
  { preset: "Soft Tap", icon: BellSimple, label: "Soft" },
  { preset: "Glass Tick", icon: CircleWavy, label: "Glass" },
  { preset: "Wood Knock", icon: Disc, label: "Wood" },
  { preset: "Digital Pop", icon: Cpu, label: "Digital" },
  { preset: "Chime Dot", icon: MusicNoteSimple, label: "Chime" },
  { preset: "Arcade Blip", icon: SpeakerSimpleHigh, label: "Arcade" },
  { preset: "Warm Pulse", icon: SpeakerHigh, label: "Warm" },
  { preset: "Bright Ping", icon: Sun, label: "Bright" },
  { preset: "Hollow Click", icon: GlobeHemisphereWest, label: "Hollow" },
  { preset: "Orbit Drift", icon: MoonStars, label: "Orbit" },
  { preset: "Velvet Pluck", icon: Drop, label: "Velvet" },
  { preset: "Crystal Bloom", icon: Wind, label: "Bloom" },
] as const satisfies ReadonlyArray<{
  preset: SoundPreset;
  icon: typeof BellSimple;
  label: string;
}>;
