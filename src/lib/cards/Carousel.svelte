<script>
	import Icon from 'mdi-svelte';
	import { mdiChevronLeft, mdiChevronRight, mdiChevronUp, mdiChevronDown, mdiAirplane } from '@mdi/js';
	import { globalSearch, updateStore } from '../../store';
	import EventCard from '$lib/cards/EventCard.svelte';
	import FlightsReturn from '$lib/flights/FlightsReturn.svelte';
	import FlightsDeparture from '$lib/flights/FlightsDeparture.svelte';

	export let events;
	export let title;
	export let cardClickCB;

	$: flights = $globalSearch.flights;
	$: departureDate = $globalSearch.startDate;
	$: returnDate = $globalSearch.endDate;

	let indexToShow = 0;
	let carouselExpanded = true;
	let showReturnFlights = false;

	const toggleHeight = (maxHeight) => {
		let e = document.getElementById('expand-events');

		if (e.style.height !== '0px') {
			e.style.height = '0px';
			carouselExpanded = false;
		} else {
			e.style.height = maxHeight + 'px';
			carouselExpanded = true;
		}
	};

	const moveIndex = (way) => {
		if (way === 'prev' && indexToShow > 0) indexToShow--;
		else if (way === 'next' && indexToShow < events.length) indexToShow++;
	};

	const showReturn = () => {
		showReturnFlights = !showReturnFlights
	}
</script>

<div id="expand-events" class="m-auto expandable">
	<h3 on:click={() => toggleHeight(150)} class="inline-block">{title}</h3>
	<div on:click={() => toggleHeight(300)} class="inline-block float-right">
		{#if carouselExpanded}
			<Icon path={mdiChevronDown} color="black" />
		{:else}
			<Icon path={mdiChevronUp} color="black" />
		{/if}
	</div>
	<div class="flex items-center justify-center">
		<button class="" on:click={() => moveIndex('prev')}>
			<Icon path={mdiChevronLeft} color="black" />
		</button>
		<div class="flex overflow-x-auto gap-6 snap-x snap-mandatory">
			<EventCard event={events[indexToShow]} on:click={cardClickCB(events[indexToShow])} />
			<EventCard event={events[indexToShow + 1]} on:click={cardClickCB(events[indexToShow + 1])} />
			<EventCard event={events[indexToShow + 2]} on:click={cardClickCB(events[indexToShow + 2])} />
		</div>
		<button class="float-right" on:click={() => moveIndex('next')}>
			<Icon path={mdiChevronRight} color="black" />
		</button>
	</div>
</div>

{#if flights}
<div>
	
		<div class="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2 mt-8 mb-8">
			<div class="flex flex-row w-3/4">
				{#if !showReturnFlights}
					<Icon path={ mdiAirplane} color="black" />
					<h1 class="ml-2 uppercase font-bold text-gray-500">departure</h1>
					<p class="ml-2 font-normal text-gray-500">{departureDate}</p>
					{/if}
					{#if showReturnFlights}
					<Icon path={ mdiAirplane} color="black" />
					<h1 class="ml-2 uppercase font-bold text-gray-500">Return</h1>
					<p class="ml-2 font-normal text-gray-500">{returnDate}</p>
			{/if}
			</div>
			<div>
				<label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
					<input on:click={showReturn} type="checkbox" id="default-toggle" class="sr-only peer">
					<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show return</span>
				</label>
			</div>	
		</div>	
	</div>
{/if}

{#if flights}
	{#if !showReturnFlights}
	<div>
		<FlightsDeparture/>
	</div>
	{/if}

	{#if showReturnFlights}
	<div>
		<FlightsReturn/>
	</div>
	{/if}
{/if}

<style>
	.expandable {
		padding-top: 10px;
		/* overflow set to hidden to hide the expanded text */
		overflow: hidden;
		/* all style changes will ease-in-out for 1s */
		-moz-transition: all 0.3s ease-in-out;
		-ms-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
		-webkit-transition: all 0.3s ease-in-out;
		transition: all 0.3s;
	}
</style>
