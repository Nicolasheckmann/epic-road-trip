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
		ll: lat + ',' + lon,
		categories: "13000"
	};
	const headers = {
		Authorization: 'fsq3Hdqz4uLHV1N2h6k/0CBb1TerVsp5pnlR6RopzzZukxc='
	};

	return axios
		.get('https://api.foursquare.com/v3/places/search', { params, headers })
		.then(async (res) => {
			return {
				code: 200,
				body: await _addPlacesPhotos(res.data.results)
			};
		})
		.catch((err) => {
			console.log('=>(index.js:34) err', err);
		});
};

const _addPlacesPhotos = async (places) => {
	const updatedPlaces = [];
	const params = {
		limit: 1
	};
	const headers = {
		Authorization: import.meta.env.VITE_FOURSQUARE
	};
	for (const place of places) {
		place.photos = await axios
			.get('https://api.foursquare.com/v3/places/' + place.fsq_id + '/photos', { headers, params })
			.then((res) => res.data);
		updatedPlaces.push(place);
	}
	return updatedPlaces;
};
