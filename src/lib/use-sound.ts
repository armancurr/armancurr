let ctx: AudioContext | null = null;
let resumePromise: Promise<boolean> | null = null;

export const soundPresetLabels = [
  "Soft Tap",
  "Glass Tick",
  "Wood Knock",
  "Digital Pop",
  "Chime Dot",
  "Arcade Blip",
  "Warm Pulse",
  "Bright Ping",
  "Hollow Click",
  "Orbit Drift",
  "Velvet Pluck",
  "Crystal Bloom",
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

interface NoiseOptions {
  duration?: number;
  gain?: number;
  bandFrequency?: number;
  bandQ?: number;
  highpassFrequency?: number;
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
  gainNode.gain.exponentialRampToValueAtTime(
    Math.max(gain * 0.6, 0.0001),
    releaseStart,
  );
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

function playToneStack(...tones: ToneOptions[]): boolean {
  let played = false;

  for (const tone of tones) {
    played = playTone(tone) || played;
  }

  return played;
}

function playNoiseTick(options: NoiseOptions = {}): boolean {
  const {
    duration = 42,
    gain = 0.08,
    bandFrequency = 1400,
    bandQ = 2.4,
    highpassFrequency = 600,
  } = options;

  const context = getCtx();
  if (!context || context.state !== "running") return false;

  const now = context.currentTime;
  const durationSec = duration / 1000;
  const frameCount = Math.max(1, Math.floor(context.sampleRate * durationSec));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    channel[i] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const highpass = context.createBiquadFilter();
  const bandpass = context.createBiquadFilter();
  const gainNode = context.createGain();

  source.buffer = buffer;

  highpass.type = "highpass";
  highpass.frequency.setValueAtTime(highpassFrequency, now);

  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(bandFrequency, now);
  bandpass.Q.setValueAtTime(bandQ, now);

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.linearRampToValueAtTime(gain, now + 0.002);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

  source.connect(highpass);
  highpass.connect(bandpass);
  bandpass.connect(gainNode);
  gainNode.connect(context.destination);

  source.addEventListener("ended", () => {
    source.disconnect();
    highpass.disconnect();
    bandpass.disconnect();
    gainNode.disconnect();
  });

  source.start(now);
  source.stop(now + durationSec);

  return true;
}

export function playPresetSound(preset: SoundPreset): boolean {
  switch (preset) {
    case "Soft Tap":
      return playToneStack(
        {
          frequency: 420,
          duration: 48,
          gain: 0.18,
          type: "triangle",
          release: 0.04,
        },
        {
          frequency: 640,
          duration: 30,
          gain: 0.09,
          type: "sine",
          detune: 6,
          release: 0.025,
        },
      );
    case "Glass Tick":
      return playToneStack(
        {
          frequency: 920,
          duration: 42,
          gain: 0.12,
          type: "sine",
          release: 0.03,
        },
        {
          frequency: 1380,
          duration: 28,
          gain: 0.08,
          type: "triangle",
          release: 0.02,
        },
      );
    case "Wood Knock":
      return playToneStack(
        {
          frequency: 240,
          duration: 60,
          gain: 0.22,
          type: "triangle",
          release: 0.05,
        },
        {
          frequency: 360,
          duration: 36,
          gain: 0.1,
          type: "sine",
          release: 0.025,
        },
      );
    case "Digital Pop":
      return playToneStack(
        {
          frequency: 760,
          duration: 38,
          gain: 0.15,
          type: "square",
          release: 0.028,
        },
        {
          frequency: 980,
          duration: 22,
          gain: 0.08,
          type: "sine",
          release: 0.018,
        },
      );
    case "Chime Dot":
      return playToneStack(
        {
          frequency: 680,
          duration: 72,
          gain: 0.13,
          type: "sine",
          release: 0.06,
        },
        {
          frequency: 1020,
          duration: 60,
          gain: 0.07,
          type: "triangle",
          release: 0.05,
        },
        {
          frequency: 1360,
          duration: 40,
          gain: 0.045,
          type: "sine",
          release: 0.03,
        },
      );
    case "Arcade Blip":
      return playToneStack(
        {
          frequency: 560,
          duration: 44,
          gain: 0.16,
          type: "square",
          release: 0.03,
        },
        {
          frequency: 840,
          duration: 24,
          gain: 0.08,
          type: "triangle",
          release: 0.02,
        },
      );
    case "Warm Pulse":
      return playToneStack(
        {
          frequency: 330,
          duration: 64,
          gain: 0.16,
          type: "sine",
          release: 0.05,
        },
        {
          frequency: 334,
          duration: 64,
          gain: 0.08,
          type: "sawtooth",
          detune: -8,
          release: 0.045,
        },
      );
    case "Bright Ping":
      return playToneStack(
        {
          frequency: 1240,
          duration: 34,
          gain: 0.13,
          type: "sine",
          release: 0.022,
        },
        {
          frequency: 1860,
          duration: 22,
          gain: 0.06,
          type: "triangle",
          release: 0.015,
        },
      );
    case "Hollow Click":
      return (
        playNoiseTick({
          duration: 36,
          gain: 0.065,
          bandFrequency: 1600,
          bandQ: 3.2,
          highpassFrequency: 780,
        }) ||
        playToneStack(
          {
            frequency: 290,
            duration: 34,
            gain: 0.08,
            type: "triangle",
            release: 0.025,
          },
          {
            frequency: 430,
            duration: 24,
            gain: 0.05,
            type: "sine",
            release: 0.018,
          },
        )
      );
    case "Orbit Drift":
      return playToneStack(
        {
          frequency: 510,
          duration: 78,
          gain: 0.1,
          type: "sawtooth",
          detune: -10,
          release: 0.06,
        },
        {
          frequency: 510,
          duration: 78,
          gain: 0.1,
          type: "sawtooth",
          detune: 10,
          release: 0.06,
        },
        {
          frequency: 765,
          duration: 40,
          gain: 0.05,
          type: "sine",
          release: 0.026,
        },
      );
    case "Velvet Pluck":
      return playToneStack(
        {
          frequency: 372,
          duration: 58,
          gain: 0.16,
          type: "triangle",
          release: 0.044,
        },
        {
          frequency: 558,
          duration: 30,
          gain: 0.06,
          type: "sine",
          release: 0.02,
        },
      );
    case "Crystal Bloom":
      return playToneStack(
        {
          frequency: 540,
          duration: 88,
          gain: 0.11,
          type: "sine",
          release: 0.07,
        },
        {
          frequency: 810,
          duration: 80,
          gain: 0.075,
          type: "triangle",
          release: 0.06,
        },
        {
          frequency: 1215,
          duration: 66,
          gain: 0.045,
          type: "sine",
          release: 0.05,
        },
      );
  }
}
