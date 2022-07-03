export const formatEvents = (ticketMasterResponse, filters = null) => {
	let formattedResponse = { events: [], page: ticketMasterResponse.page };
	// let previousEventName =  null
	ticketMasterResponse._embedded?.events.forEach((event) => {
		formattedResponse.events.push({
			_type: "event",
			name: event.name,
			url: event.url,
			description: event.description,
			image: event.images,
			segment: event.classifications?.[0]?.segment?.name,
			genre: event.classifications?.[0]?.genre?.name,
			subGenre: event.classifications?.[0]?.subGenre?.name,
			dates: ['localDate', 'localTime', 'dateTime'].reduce((o, k) => {
				o[k] = event.dates.start?.[k] || null;
				return o;
			}, {}),
			priceRanges: event.priceRanges?.[0] || null,
			location: {
				lon: event._embedded?.venues?.[0]?.location.longitude,
				lat: event._embedded?.venues?.[0]?.location.latitude
			}
		});
	});
	return filterEvents(formattedResponse, filters);
};

const filterEvents = (formattedResponse, filters) => {
	if (filters?.maxPrice) {
		formattedResponse.events = formattedResponse.events.filter((event) => {
			if (!event.priceRanges) return event;
			return event.priceRanges.max <= filters.maxPrice;
		});
	}

	if (filters?.minPrice) {
		formattedResponse.events = formattedResponse.events.filter((event) => {
			if (!event.priceRanges) return event;
			return event.priceRanges.min >= filters.minPrice;
		});
	}

	return formattedResponse;
};
