import axios from 'axios';

export const getEvents = params => {
	return axios.get(`/api/events`, { params });
};

// all our api calls to events related endpoints will go there
// we can create on file like this by endpoints type (events, accommodations, bars, etc)