import axios from '~/utils/axios';
import requests from '~/utils/requests';

export const searchService = (query, page = '1') => {
  return axios.get(requests.fetchSearchMulti, {
    params: {
      query,
      page,
    },
  });
};
