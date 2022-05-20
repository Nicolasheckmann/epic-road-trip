export const requestTicketMaster = (method, url) => {
    const baseUrl = "https://app.ticketmaster.com";
    url = baseUrl + url;
    url += '&apikey=' + import.meta.env.VITE_TICKETMASTER_API_KEY;
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(res => {
            if (res.error) {
                throw new Error(res.error.message);
            }
            return res;
        })
        .catch(err => {
            throw new Error(err);
        });
};