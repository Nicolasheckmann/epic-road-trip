export const formatFlights = (amadeusFlightsResponse) => {
  let formattedResponse = {flights: []};
      amadeusFlightsResponse.forEach(flight => {
        let itineraries =  [];
        flight.itineraries.forEach(itinerary => {
          itineraries.push({
            duration: itinerary.duration,
            segments: itinerary.segments
          })
        });
        formattedResponse.flights.push({
          totalPrice: flight.price?.grandTotal,
          currency: flight.price?.currency,
          itineraries: itineraries,
        });
      });
      return formattedResponse;
    };