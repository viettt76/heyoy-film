import axios from '~/utils/axios';
const API_KEY = import.meta.env.VITE_API_KEY;

export const searchService = (query, page = '1') => {
  return axios.get(`/search/multi?api_key=${API_KEY}`, {
    params: {
      query,
      page,
    },
  });
};
