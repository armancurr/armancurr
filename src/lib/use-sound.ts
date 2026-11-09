let ctx: AudioContext | null = null;
let masterGainNode: GainNode | null = null;
let masterCompressorNode: DynamicsCompressorNode | null = null;
let resumePromise: Promise<boolean> | null = null;
const MASTER_OUTPUT_GAIN = 2;

interface LensClickOptions {
  direction: 1 | -1;
  intensity?: number;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioContextCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextCtor) return null;
  if (!ctx) ctx = new AudioContextCtor();

  return ctx;
}

function getAudioOutput(context: AudioContext): AudioNode {
  if (!masterGainNode || !masterCompressorNode) {
    masterGainNode = context.createGain();
    masterCompressorNode = context.createDynamicsCompressor();

    masterGainNode.gain.setValueAtTime(MASTER_OUTPUT_GAIN, context.currentTime);
    masterCompressorNode.threshold.setValueAtTime(-18, context.currentTime);
    masterCompressorNode.knee.setValueAtTime(18, context.currentTime);
    masterCompressorNode.ratio.setValueAtTime(6, context.currentTime);
    masterCompressorNode.attack.setValueAtTime(0.003, context.currentTime);
    masterCompressorNode.release.setValueAtTime(0.25, context.currentTime);

    masterGainNode.connect(masterCompressorNode);
    masterCompressorNode.connect(context.destination);
  }

  return masterGainNode;
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

export function playLensClick(options: LensClickOptions): boolean {
  const context = getCtx();
  if (!context || context.state !== "running") return false;

  const intensity = Math.min(Math.max(options.intensity ?? 0.45, 0), 1);
  const now = context.currentTime;
  const directionOffset = options.direction > 0 ? 1 : -1;
  const settings = { duration: 0.016, gain: 0.011, band: 3600, sweep: 180, q: 10.5, tone: 720 };
  const durationSec = settings.duration + intensity * 0.01;
  const frameCount = Math.max(1, Math.floor(context.sampleRate * durationSec));
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const channel = buffer.getChannelData(0);

  for (let i = 0; i < frameCount; i += 1) {
    const envelope = 1 - i / frameCount;
    channel[i] = (Math.random() * 2 - 1) * envelope;
  }

  const source = context.createBufferSource();
  const highpass = context.createBiquadFilter();
  const bandpass = context.createBiquadFilter();
  const clickGain = context.createGain();
  const endTime = now + durationSec;
  const baseFrequency = settings.band + intensity * 360 + directionOffset * 90;
  const gain = settings.gain + intensity * 0.012;

  source.buffer = buffer;
  highpass.type = "highpass";
  highpass.frequency.setValueAtTime(820 + intensity * 320, now);
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(baseFrequency, now);
  bandpass.frequency.exponentialRampToValueAtTime(
    Math.max(baseFrequency + directionOffset * settings.sweep, 80),
    endTime,
  );
  bandpass.Q.setValueAtTime(settings.q, now);

  clickGain.gain.setValueAtTime(0.0001, now);
  clickGain.gain.linearRampToValueAtTime(gain, now + 0.002);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, endTime);

  source.connect(highpass);
  highpass.connect(bandpass);
  bandpass.connect(clickGain);
  clickGain.connect(getAudioOutput(context));

  source.addEventListener("ended", () => {
    source.disconnect();
    highpass.disconnect();
    bandpass.disconnect();
    clickGain.disconnect();
  });

  source.start(now);
  source.stop(endTime);

  if (settings.tone > 0) {
    const tooth = context.createOscillator();
    const toothGain = context.createGain();

    tooth.type = "sine";
    tooth.frequency.setValueAtTime(settings.tone + intensity * 80 + directionOffset * 22, now);
    tooth.frequency.exponentialRampToValueAtTime(
      Math.max(settings.tone + intensity * 60 - directionOffset * 18, 80),
      endTime,
    );
    toothGain.gain.setValueAtTime(0.0001, now);
    toothGain.gain.linearRampToValueAtTime(gain * 0.36, now + 0.0015);
    toothGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(0.02, durationSec));
    tooth.connect(toothGain);
    toothGain.connect(getAudioOutput(context));
    tooth.addEventListener("ended", () => {
      tooth.disconnect();
      toothGain.disconnect();
    });
    tooth.start(now);
    tooth.stop(now + Math.min(0.022, durationSec));
  }

  return true;
}
