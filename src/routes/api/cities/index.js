import axios from 'axios';

export const get = async ({ url }) => {
	const cityQuery = url.searchParams.get('cityQuery');
	const limit = url.searchParams.get("limit")


	if (!cityQuery) {
		return {
			status: 400,
			body: {
				error: 'cityQuery param is required'
			}
		};
	}
	const params = {
		q: cityQuery,
		tag: "place:city,place:city,place:town,place:village",
		key: import.meta.env.VITE_LOCATION_IQ_KEY,
		limit,
		dedupe: 1,
	};

	return axios
		.get('https://us1.locationiq.com/v1/autocomplete.php', { params })
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
