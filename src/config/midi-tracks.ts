export type MidiTrack = {
  title: string;
  artist: string;
  fileName: string;
  coverFileName: string;
};

export const midiTracks = [
  {
    title: "Sono Chi No Sadame",
    artist: "Hiroaki Tominaga",
    fileName: "sono-chi-no-sadame.mid",
    coverFileName: "sono-chi-no-sadame.jpg",
  },
  {
    title: "Bloody Stream",
    artist: "Coda",
    fileName: "bloody-stream.mid",
    coverFileName: "bloody-stream.jpg",
  },
  {
    title: "Stand Proud",
    artist: "Jin Hashimoto",
    fileName: "stand-proud.mid",
    coverFileName: "stand-proud.jpg",
  },
  {
    title: "Sono Chi No Kioku",
    artist: "JO☆STARS",
    fileName: "sono-chi-no-kioku.mid",
    coverFileName: "sono-chi-no-kioku.jpg",
  },
  {
    title: "Crazy Noisy Bizarre Town",
    artist: "The DU",
    fileName: "crazy-noizy-bizarre-town.mid",
    coverFileName: "crazy-noizy-bizarre-town.jpg",
  },
  {
    title: "Uragirimono No Requiem",
    artist: "Daisuke Hasegawa",
    fileName: "uragirimonono-requiem.mid",
    coverFileName: "uragirimonono-requiem.jpg",
  },
  {
    title: "Il Vento D'oro",
    artist: "Yugo Kanno",
    fileName: "il-vento-doro.mid",
    coverFileName: "il-vento-doro.jpg",
  },
  {
    title: "Stone Ocean",
    artist: "Ichigo from Kishida Kyoudan & The Akeboshi Rockets",
    fileName: "stone-ocean.mid",
    coverFileName: "stone-ocean.jpg",
  },
  {
    title: "Holy Steel",
    artist: "Taisuke Fujigaya",
    fileName: "holy-steel.mid",
    coverFileName: "holy-steel.jpg",
  },
] satisfies MidiTrack[];

export function getMidiUrl(track: MidiTrack): string {
  return `/${encodeURIComponent(track.fileName)}`;
}

export function getMidiCoverUrl(track: MidiTrack): string {
  return `/${encodeURIComponent(track.coverFileName)}`;
}
