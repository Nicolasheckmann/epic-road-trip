<script>
	import MapContainer from '$lib/map/MapContainer.svelte';
	import Icon from 'mdi-svelte';
	import {mdiAirplane } from '@mdi/js';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getEvents } from '../services/events.js';
	import Carousel from '$lib/cards/Carousel.svelte';
	import DestinationHeader from '../lib/DestinationHeader.svelte';
	import Header from '../lib/Header.svelte';
	import { globalSearch, updateStore } from '../store.js';
	import { getCityReverse } from '../services/cities.js';
	import { getPlaces } from '../services/places.js';
	import FlightsReturn from '$lib/flights/FlightsReturn.svelte';
	import FlightsDeparture from '$lib/flights/FlightsDeparture.svelte';

	let coords = {
		lat: $page.url.searchParams.get('lat'),
		lon: $page.url.searchParams.get('lon')
	};

	$: flights = $globalSearch.flights;
	$: departureDate = $globalSearch.startDate;
	$: returnDate = $globalSearch.endDate;
	let showReturnFlights = false;

	onMount(async () => {
		if (!$globalSearch.city) {
			const city = await getCityReverse(coords);
			await updateStore({ city: city });
		}
	});

	let events = [];
	let places = [];
	let selectedEvent = null;
	let selectedPlace = null;

	const showReturn = () => {
		showReturnFlights = !showReturnFlights
	}
	
	const search = () => {
		const paramsEvents = {
			city: $globalSearch.city?.name,
			sort: 'date,asc'
		};
		const startDate = $globalSearch.startDate;
		const endDate = $globalSearch.endDate;

		if (startDate) paramsEvents.startDateTime = startDate + 'T00:00:00z';
		if (endDate) paramsEvents.endDateTime = endDate + 'T23:59:59z';

		getEvents(paramsEvents).then((response) => {
			events = response.data.events;
		});

		const paramsPlaces = {
			lat: $globalSearch.city.lat,
			lon: $globalSearch.city.lon
		};

		getPlaces(paramsPlaces).then((response) => {
			places = response.data;
		});
	};

	$: if ($globalSearch.city) search();

	const flyTo = (target) => {
		if (target._type === "event") {
			coords = target.location;
			selectedPlace = null;
			return (selectedEvent = target);
		}
		if (target._type === "place") {
			coords = {
				lat: target.geocodes.main.latitude,
				lon: target.geocodes.main.longitude
			}
			selectedEvent = null;
			return (selectedPlace = target);
		}
	};
</script>
<div class="flex">
	<!-- left panel, 50% page width -->
	<div class="w-1/2 bg-gray-50 relative">
		<Header />
		<div>
			<DestinationHeader />
		</div>
		<div class="p-5">
			{#if events.length > 0}
				<Carousel {events} title="Events" cardClickCB={flyTo} />
			{/if}
		</div>
		<div class="p-5">
			{#if places.length > 0}
				<Carousel {places} title="Places" cardClickCB={flyTo} />
			{/if}
		</div>
		<div>
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

		</div>
	</div>

	<!-- right panel, 50% page width-->
	<!-- please comment out this component when not developing on it, to save maps api requests which is limited (or paying) -->
	<div class="w-1/2 fixed right-0">
		<div class="relative w-full h-screen">
			<MapContainer {coords} event={selectedEvent} place={selectedPlace} />
		</div>
	</div>
</div>
