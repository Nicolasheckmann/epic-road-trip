import axios from "axios";

export const getHotelsNearby = (params) => {
    return axios.get(`/api/hotels`, { params });
}