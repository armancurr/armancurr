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
    title: "Akuyaku Kyosokyoku",
    artist: "Yugo Kanno",
    fileName: "akuyaku-kyosokyoku.mid",
    coverFileName: "akuyaku-kyosokyoku.jpg",
  },
  {
    title: "Sono Chi No Kioku",
    artist: "JO☆STARS",
    fileName: "sono-chi-no-kioku.mid",
    coverFileName: "sono-chi-no-kioku.jpg",
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
    title: "Guren No Yumiya",
    artist: "Linked Horizon",
    fileName: "guren-no-yumiya.mid",
    coverFileName: "guren-no-yumiya.jpg",
  },
  {
    title: "Shinzou Wo Sasageyo",
    artist: "Linked Horizon",
    fileName: "shinzou-wo-sasageyo.mid",
    coverFileName: "guren-no-yumiya.jpg",
  },
  {
    title: "Hacking To The Gate",
    artist: "Kanako Ito",
    fileName: "hacking-to-the-gate.mid",
    coverFileName: "hacking-to-the-gate.jpg",
  },
] satisfies MidiTrack[];

export function getMidiUrl(track: MidiTrack): string {
  return `/${encodeURIComponent(track.fileName)}`;
}

export function getMidiCoverUrl(track: MidiTrack): string {
  return `/${encodeURIComponent(track.coverFileName)}`;
}
