import axios from 'axios';

export const getFlights = params => {
    console.log("ok");
    return axios.get(`/api/flights`, { params });
};