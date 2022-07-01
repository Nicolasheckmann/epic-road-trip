import axios from 'axios';

export const getFlights = params => {
    return axios.get(`/api/flights`, { params });
};