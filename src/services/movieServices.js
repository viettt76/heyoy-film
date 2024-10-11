import axios from '~/utils/axios';
import requests from '~/utils/requests';

export const topRatedService = () => {
  return axios.get(requests.fetchTopRated);
};

export const getGenresMovieList = () => {
  return axios.get(requests.getGenresMovieList);
};

export const getMovieByGenres = (genres, page = 1) => {
  return axios.get(`${requests.getMovieListByGenres}${genres}&page=${page}`);
};

export const moviesPopularService = (page = '1', sort = '') => {
  return axios.get(requests.fetchMoviePopular, {
    params: {
      page,
    },
  });
};

export const moviesNowPlayingService = (page = '1') => {
  return axios.get(requests.fetchMovieNowPlaying, {
    params: {
      page,
    },
  });
};

export const moviesUpcomingService = (page = '1') => {
  return axios.get(requests.fetchMovieUpcoming, {
    params: {
      page,
    },
  });
};

export const moviesTopRatedService = (page = '1') => {
  return axios.get(requests.fetchMovieTopRated, {
    params: {
      page,
    },
  });
};
