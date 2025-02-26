export enum MovieType {
  MOVIE = 'MOVIE',
  TV = 'TV',
}

export interface BaseMovieData {
  movieId: string;
  name: string;
  slug: string;
  thumbUrl: string;
  type: MovieType;
}
