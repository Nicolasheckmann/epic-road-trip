import axios from 'axios';

export const requestTicketMaster = (method, url) => {
	const baseUrl = 'https://app.ticketmaster.com';
	url = baseUrl + url;
	url += '&apikey=' + import.meta.env.VITE_TICKETMASTER_API_KEY;
	return axios({
		url,
		method,
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then((res) => {
			console.warn(
				'Remaining requests for ticketMaster:',
				`${res.headers['rate-limit-available']}/${res.headers['rate-limit']}`
			);
			return res.data;
		})
		.catch((err) => {
			throw {
				data: err.response.data,
				status: err.response.status
			};
		});
};

export const requestUnsplash = (method, url) => {
	const baseUrl = 'https://api.unsplash.com';
	url = baseUrl + url;
	url += '&client_id=' + import.meta.env.VITE_UNSPLASH_API_KEY;
	return axios({
		url,
		method,
		headers: {
			'Content-Type': 'application/json'
		}
	}).catch((err) => {
		throw {
			data: err.response.data,
			status: err.response.status
		};
	});
}