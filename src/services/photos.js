import axios from 'axios';

export const getPhotos = params => {
  return axios.get(`/api/photos`, { params });
};
