import axios from 'axios';

export const getCitiesSuggestion = (params) => {
	return axios
		.get(`/api/cities`, { params })
		.then((res) => {
			const suggestions = [];
			res.data.forEach((city) => {
				suggestions.push({
					lat: city.lat,
					lon: city.lon,
					name: city.address.city || city.address.name,
					state: city.address.state,
					country: city.address.country
				});
			});
			return suggestions;
		})
		.catch((e) => console.log(e));
};

export const getCityReverse = (params) => {
	return axios
		.get('/api/cities/reverse', { params })
		.then((res) => {
			return {
				lat: res.data.lat,
				lon: res.data.lon,
				name: res.data.address.city || res.data.address.name,
				state: res.data.address.state,
				country: res.data.address.country
			};
		})
		.catch((e) => console.log(e));
};

export const getIatacode = async (city) => {
	if(city.iata) return 
	const destinationLocation = await axios.get(`http://iatageo.com/getCode/${city.lat}/${city.lon}`);
    console.log(destinationLocation)
    return destinationLocation.data.IATA
}