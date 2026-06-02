export type MidiTrack = {
  title: string;
  artist: string;
  fileName: string;
};

export const midiTracks = [
  {
    title: "Sono Chi No Sadame",
    artist: "Hiroaki Tominaga",
    fileName: "sono-chi-no-sadame.mid",
  },
  {
    title: "Bloody Stream",
    artist: "Coda",
    fileName: "bloody-stream.mid",
  },
  {
    title: "Stand Proud",
    artist: "Jin Hashimoto",
    fileName: "stand-proud.mid",
  },
  {
    title: "Akuyaku Kyosokyoku",
    artist: "Yugo Kanno",
    fileName: "akuyaku-kyosokyoku.mid",
  },
  {
    title: "Sono Chi No Kioku",
    artist: "JO☆STARS",
    fileName: "sono-chi-no-kioku.mid",
  },
  {
    title: "Uragirimono No Requiem",
    artist: "Daisuke Hasegawa",
    fileName: "uragirimonono-requiem.mid",
  },
  {
    title: "Il Vento D'oro",
    artist: "Yugo Kanno",
    fileName: "il-vento-doro.mid",
  },
] satisfies MidiTrack[];

export function getMidiUrl(track: MidiTrack): string {
  return `/${encodeURIComponent(track.fileName)}`;
}
