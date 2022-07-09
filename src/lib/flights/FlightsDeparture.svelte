<script>
    
    import { globalSearch, updateStore } from '../../store.js';
    
    $: flights = $globalSearch?.flights;
    $: originLocationCode = $globalSearch?.originLocationCode;
    $: destinationLocationCode = $globalSearch?.destinationLocationCode;
    $:city = $globalSearch?.city.name
 
</script>
    
{#if flights}
    {#each flights as flight}
    <div class="mt-2 flex sm:flex-row mx-6 mb-3 sm:justify-between flex-wrap">
        <div class="flex flex-col p-2">
          <p class="font-bold">{flight.itineraries[0].segments[0].departure.at.slice(11, -3)}</p>
          <p class="text-gray-500"><span class="font-bold">{originLocationCode}</span> DepCity</p>
        </div>
        <div class="flex flex-col flex-wrap p-2">
          <p class="font-bold">{flight.itineraries[0].segments[0].arrival.at.slice(11, -3)}</p>
          <p class="text-gray-500"><span class="font-bold">{destinationLocationCode}</span> {city}</p>
        </div>
        <div class="flex flex-col flex-wrap p-2">
            <p>Total Price</p>
            <p class="font-bold">{flight.totalPrice} {flight.currency}</p>           
        </div>
        <div class="text-sm mx-2 p-2 flex flex-col">
            <button 
            class="w-32 h-11 rounded flex border-solid border bg-emerald-400 text-white mx-2 justify-center place-items-center rounded-full">
            Add to your trip
        </button>
        </div>
      </div>
    {/each}
{/if}

    