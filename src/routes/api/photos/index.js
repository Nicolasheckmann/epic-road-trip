import {requestUnsplash} from "../_request.js";

export const get = async ({url}) => {
  const city = url.searchParams.get("city");

  if (!city) {
    return {
      status: 400,
      body: {
        error: "city param is required"
      }
    }
  }

  let requestUrl = `/search/photos?query=${city}`

  return await requestUnsplash("get", requestUrl)
    .then((response) => {
      console.log("=>(index.js:20) response", response);
      return {
        status: 200,
        body: response.data.results[0].urls.raw
      }
    })
    .catch(err => {
      return {
        status: err.status,
        body: err.data
      }
    });
}