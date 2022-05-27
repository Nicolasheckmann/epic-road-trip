import {requestTicketMaster} from "../_request.js";
import {formatEvents} from "../_format.js";

export const get = async ({url}) => {
  const city = url.searchParams.get("city");
  const startDateTime = url.searchParams.get("startDateTime");
  const endDateTime = url.searchParams.get("endDateTime");
  const sort = url.searchParams.get("sort");
  const size = url.searchParams.get("size");
  const page = url.searchParams.get("page");
  const maxPrice = url.searchParams.get("maxPrice");
  const minPrice = url.searchParams.get("minPrice");
  let filters = null

  if (!city) {
    return {
      status: 400,
      body: {
        error: "city param is required"
      }
    }
  }

  let requestUrl = `/discovery/v2/events?city=${city}`
  if (startDateTime) requestUrl += `&startDateTime=${startDateTime}`;
  if (endDateTime) requestUrl += `&endDateTime=${endDateTime}`;
  if (sort) requestUrl += `&sort=${sort}`;
  if (size) requestUrl += `&size=${size}`;
  if (page) requestUrl += `&page=${page}`;
  if (maxPrice || minPrice) filters = {maxPrice, minPrice};

  return await requestTicketMaster("get", requestUrl)
    .then(response => {
      return {
        status: 200,
        body: formatEvents(response, filters)
      }
    })
    .catch(err => {
      return {
        status: err.status,
        body: err.data
      }
    });
}
