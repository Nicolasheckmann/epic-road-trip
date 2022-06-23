import axios from 'axios';

export const get = async ({ url }) => {
	const lat = url.searchParams.get('lat');
	const lon = url.searchParams.get('lon');

	if (!lat || !lon) {
		return {
			status: 400,
			body: {
				error: 'lat/lon pair param is required'
			}
		};
	}

	const params = {
		key: import.meta.env.VITE_LOCATION_IQ_KEY,
		lat,
		lon,
		format: 'json'
	};

	return axios
		.get('https://us1.locationiq.com/v1/reverse', { params })
		.then((response) => {
			return {
				status: 200,
				body: response.data
			};
		})
		.catch((err) => {
			return {
				status: err.status,
				body: err.data
			};
		});
};
