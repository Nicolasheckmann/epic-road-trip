import axios from "axios";

export const getPlaces = (params) => {
    return axios.get(`/api/places`, { params });
}