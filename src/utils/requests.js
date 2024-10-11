const API_KEY = import.meta.env.VITE_API_KEY;
// const language = 'vi-VN';
// const language = 'en-US';

const apis = {
  getGenresMovieList: `/genre/movie/list?api_key=${API_KEY}`,
  getMovieListByGenres: `/discover/movie?api_key=${API_KEY}&with_genres=`,

  fetchTrending: `/trending/movie/day?api_key=${API_KEY}`,
  // fetchSearchMovie: `/search/movie?api_key=${API_KEY}`,

  // search movies, TV shows and people
  fetchSearchMulti: `/search/multi?api_key=${API_KEY}`,

  // fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}`,

  fetchMoviePopular: `/movie/popular?api_key=${API_KEY}`,
  fetchMovieNowPlaying: `/movie/now_playing?api_key=${API_KEY}`,
  fetchMovieUpcoming: `/movie/upcoming?api_key=${API_KEY}`,
  fetchMovieTopRated: `/movie/upcoming?api_key=${API_KEY}`,

  // fetchTVAction: `discover/tv?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&with_genres=10759`,
  // fetchTVComedy: `discover/tv?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&with_genres=35`,
  // fetchTVAnimation: `discover/tv?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&with_genres=16`,
  // fetchTVMystery: `discover/tv?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&with_genres=9648`,

  // fetchMoviesGenres: `/genre/movie/list?api_key=${API_KEY}&language=${language}`,
  // fetchTVShowGenres: `/genre/tv/list?api_key=${API_KEY}&language=${language}`,
  // fetchTVLatest: `/tv/latest?api_key=${API_KEY}&language=${language}`,
};

export default apis;
