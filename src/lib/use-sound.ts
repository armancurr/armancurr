let ctx: AudioContext | null = null;
let resumePromise: Promise<boolean> | null = null;

export const soundPresetLabels = [
  "Soft Tap",
  "Glass Tick",
  "Wood Knock",
  "Digital Pop",
  "Chime Dot",
  "Arcade Blip",
] as const;

export type SoundPreset = (typeof soundPresetLabels)[number];

interface ToneOptions {
  frequency: number;
  duration?: number;
  gain?: number;
  type?: OscillatorType;
  attack?: number;
  release?: number;
  detune?: number;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioContextCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!AudioContextCtor) return null;
  if (!ctx) ctx = new AudioContextCtor();

  return ctx;
}

export function isAudioReady(): boolean {
  return getCtx()?.state === "running";
}

export function unlockAudio(): Promise<boolean> {
  const context = getCtx();
  if (!context) return Promise.resolve(false);
  if (context.state === "running") return Promise.resolve(true);
  if (resumePromise) return resumePromise;

  resumePromise = context
    .resume()
    .then(() => context.state === "running")
    .catch(() => false)
    .finally(() => {
      resumePromise = null;
    });

  return resumePromise;
}

function playTone(options: ToneOptions): boolean {
  const {
    frequency,
    duration = 70,
    gain = 0.12,
    type = "sine",
    attack = 0.001,
    release = 0.055,
    detune = 0,
  } = options;

  const context = getCtx();
  if (!context || context.state !== "running") return false;

  const now = context.currentTime;
  const durationSec = duration / 1000;
  const releaseStart = Math.max(now + attack, now + durationSec - release);
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, now);
  oscillator.detune.setValueAtTime(detune, now);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.linearRampToValueAtTime(gain, now + attack);
  gainNode.gain.exponentialRampToValueAtTime(gain * 0.6, releaseStart);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  oscillator.addEventListener("ended", () => {
    oscillator.disconnect();
    gainNode.disconnect();
  });

  oscillator.start(now);
  oscillator.stop(now + durationSec);

  return true;
}

function playDualTone(base: ToneOptions, accent: ToneOptions): boolean {
  const played = playTone(base);
  playTone(accent);
  return played;
}

export function playPresetSound(preset: SoundPreset): boolean {
  switch (preset) {
    case "Soft Tap":
      return playDualTone(
        { frequency: 420, duration: 48, gain: 0.18, type: "triangle", release: 0.04 },
        { frequency: 640, duration: 30, gain: 0.09, type: "sine", detune: 6, release: 0.025 },
      );
    case "Glass Tick":
      return playDualTone(
        { frequency: 920, duration: 42, gain: 0.12, type: "sine", release: 0.03 },
        { frequency: 1380, duration: 28, gain: 0.08, type: "triangle", release: 0.02 },
      );
    case "Wood Knock":
      return playDualTone(
        { frequency: 240, duration: 60, gain: 0.22, type: "triangle", release: 0.05 },
        { frequency: 360, duration: 36, gain: 0.1, type: "sine", release: 0.025 },
      );
    case "Digital Pop":
      return playDualTone(
        { frequency: 760, duration: 38, gain: 0.15, type: "square", release: 0.028 },
        { frequency: 980, duration: 22, gain: 0.08, type: "sine", release: 0.018 },
      );
    case "Chime Dot":
      return playDualTone(
        { frequency: 680, duration: 72, gain: 0.13, type: "sine", release: 0.06 },
        { frequency: 1020, duration: 60, gain: 0.07, type: "triangle", release: 0.05 },
      );
    case "Arcade Blip":
      return playDualTone(
        { frequency: 560, duration: 44, gain: 0.16, type: "square", release: 0.03 },
        { frequency: 840, duration: 24, gain: 0.08, type: "triangle", release: 0.02 },
      );
  }
}
