import axios from '~/utils/axios';
const API_KEY = import.meta.env.VITE_API_KEY;

export const topRatedService = () => {
  return axios.get(`/movie/top_rated?api_key=${API_KEY}`);
};

export const getGenresMovieList = () => {
  return axios.get(`/genre/movie/list?api_key=${API_KEY}`);
};

export const getMovieByGenres = (genres, page = 1) => {
  return axios.get(
    `/discover/movie?api_key=${API_KEY}&with_genres=${genres}&page=${page}`
  );
};

export const moviesPopularService = (page = '1', sort = '') => {
  return axios.get(`/movie/popular?api_key=${API_KEY}`, {
    params: {
      page,
    },
  });
};

export const moviesNowPlayingService = (page = '1') => {
  return axios.get(`/movie/now_playing?api_key=${API_KEY}`, {
    params: {
      page,
    },
  });
};

export const moviesUpcomingService = (page = '1') => {
  return axios.get(`/movie/upcoming?api_key=${API_KEY}`, {
    params: {
      page,
    },
  });
};

export const moviesTopRatedService = (page = '1') => {
  return axios.get(`/movie/upcoming?api_key=${API_KEY}`, {
    params: {
      page,
    },
  });
};
