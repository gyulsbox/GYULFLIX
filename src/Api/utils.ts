export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function makeVideoPath(key: string) {
  return `https://youtube.com/embed/${key}?showinfo=0&controls=0&enablejsapi=1&t=6&origin=http://localhost:3000`;
}

export const noPoster = "https://timescineplex.com/times/img/no-poster.png";
