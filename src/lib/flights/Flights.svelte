<script>
    import { getFlights } from '../../services/flights.js';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { globalSearch, updateStore } from '../../store.js';
	import { getCitiesSuggestion } from '../../services/cities';
    
    export let originLocationCode;
    export let destinationLocationCode;
    export let departureDate ;
    export let adults;
    
    let flights;

    onMount(async () => {
        const lat = $globalSearch.city.lat;
		const lon = $globalSearch.city.lon;

        console.log("latitude", lat, "longitude", lon);
        const departureLocation = await axios.get(`http://iatageo.com/getCode/43.610769/3.876716`);
        originLocationCode = departureLocation.data.IATA;
        const params = {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            adults
        }
        getFlights(params)
        .then((response) => 
        flights = response.data.flights)
    })
    </script>
    
    {#if flights}
    
    {#each flights as flight}
        <div>
            <p class="text-sm font-normal text-gray-700 dark:text-gray-400">{flight.totalPrice} {flight.currency} </p>
        </div>
    {/each}
    
    {/if}

    