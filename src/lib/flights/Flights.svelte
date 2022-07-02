<script>
    import { getFlights } from '../../services/flights.js';
    import { onMount } from 'svelte';
    import { globalSearch, updateStore } from '../../store.js';
	import { getCitiesSuggestion } from '../../services/cities';
    import Icon from 'mdi-svelte';
	import { mdiAirplane } from '@mdi/js';
    
    
    let flights;
    $: flights = $globalSearch?.flights;
    $: departureDate = $globalSearch?.startDate;
    
    </script>
    {#if !flights}
	<h1>No flights for this trip! :(</h1>
    {/if}

    {#if flights}
    <div class="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2 mt-8">
        <Icon path={ mdiAirplane} color="black" />
        <h1 class="ml-2 uppercase font-bold text-gray-500">departure</h1>
        <p class="ml-2 font-normal text-gray-500">{departureDate}</p>
    </div>
    {#each flights as flight}
    <div class="mt-2 flex sm:flex-row mx-6 sm:justify-between flex-wrap ">
        <div class="flex flex-col p-2">
          <p class="font-bold">18:25</p>
          <p class="text-gray-500"><span class="font-bold">HRE</span> Harare</p>
          <p class="text-gray-500">Zimbabwe</p>
        </div>
        <div class="flex flex-col flex-wrap p-2">
          <p class="font-bold">19:25</p>
          <p class="text-gray-500"><span class="font-bold">LUN</span> Lusaka</p>
          <p class="text-gray-500">Zambia</p>
        </div>
        <div class="text-sm mx-2 flex flex-col">
            <p class="">Standard Ticket</p>
            <p class="text-xs text-gray-500">Total Price</p>
            <p class="font-bold">{flight.totalPrice} {flight.currency}</p>           
        </div>
        <div class="text-sm mx-2 flex flex-col">
            <button class="w-32 h-11 rounded flex border-solid border bg-white mx-2 justify-center place-items-center">Book</button>
        </div>
      </div>
        <!-- <div>
            <p class="text-sm font-normal text-gray-700 dark:text-gray-400">{flight.totalPrice} {flight.currency} </p>
        </div> -->
    {/each}
{/if}

    