import {formatFlights} from "./_format.js";

import Amadeus from "amadeus"


export const get = async ({url}) => {
  
  const amadeus = new Amadeus({
    clientId: import.meta.env.VITE_AMADEUS_API_KEY,
    clientSecret: import.meta.env.VITE_AMADEUS_API_SECRET
  });

  const originLocationCode = url.searchParams.get("originLocationCode");
  const destinationLocationCode = url.searchParams.get("destinationLocationCode");
  const departureDate  = url.searchParams.get("departureDate");
  const returnDate = url.searchParams.get("returnDate");
  const adults = url.searchParams.get("adults");
  const children = url.searchParams.get("children");
  const infants = url.searchParams.get("infants");
  const nonStop = url.searchParams.get("nonStop");
  const maxPrice = url.searchParams.get("maxPrice");

  if (!originLocationCode || !destinationLocationCode || !departureDate || !adults) {
    return {
      status: 400,
      body: {
        error: "Missing required parameters"
      }
    }
  }

  const params = {
    originLocationCode: originLocationCode,
    destinationLocationCode: destinationLocationCode,
    departureDate: departureDate,
    adults: adults,
    returnDate: returnDate,
    children: children,
    infants: infants,
    nonStop: nonStop,
    maxPrice: maxPrice
  }

  if(!params.adults) delete params.adults;
  if(!params.returnDate) delete params.returnDate;
  if(!params.children) delete params.children;
  if(!params.infants) delete params.infants;
  if(!params.nonStop) delete params.nonStop;
  if(!params.maxPrice) delete params.maxPrice;

  
  
  return await amadeus.shopping.flightOffersSearch.get(params).then(function(response){
    return {
        status: 200,
        body: formatFlights(response.data)
      }
  }).catch(function(error){
    console.log(error);
    return {
        status: 400,
        body: error.response.result.errors
      }
  });
}



