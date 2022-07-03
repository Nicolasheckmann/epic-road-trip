import Amadeus from 'amadeus';

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

	const amadeus = new Amadeus({
		clientId: import.meta.env.VITE_AMADEUS_API_KEY,
		clientSecret: import.meta.env.VITE_AMADEUS_API_SECRET
	});

	return amadeus.referenceData.locations.hotels.byGeocode
		.get({
			latitude: lat,
			longitude: lon
		})
		.then((res) => {
            return {
				code: 200,
				body: res.data
			};
		});
};