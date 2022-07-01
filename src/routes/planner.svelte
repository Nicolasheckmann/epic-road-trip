<script>
	import MapContainer from '$lib/map/MapContainer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getEvents } from '../services/events.js';
	import Carousel from '$lib/cards/Carousel.svelte';
	import DestinationHeader from '../lib/DestinationHeader.svelte';
	import Header from '../lib/Header.svelte';
	import { globalSearch, updateStore } from '../store.js';
	import { getCityReverse } from '../services/cities.js';
	import { getPlaces } from '../services/places.js';

	let coords = {
		lat: $page.url.searchParams.get('lat'),
		lon: $page.url.searchParams.get('lon')
	};

	onMount(async () => {
		if (!$globalSearch.city) {
			const city = await getCityReverse(coords);
			await updateStore({ city: city });
		}
	});

	let events = [];
	let places = [];
	let selectedEvent = null;

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
			places = response.data
		});
	};

	$: if ($globalSearch.city) search();

	const flyTo = (event) => {
		if (event.location) coords = event.location;
		return (selectedEvent = event);
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
			<!--{#if events.length > 0}-->
			<!--	<Carousel {events} title="Events" cardClickCB={flyTo} />-->
			<!--{/if}-->
		</div>
		<div class="p-5">
			{#if places.length > 0}
				<Carousel {places} title="Places" cardClickCB={flyTo} />
			{/if}
		</div>
	</div>

	<!-- right panel, 50% page width-->
	<!-- please comment out this component when not developing on it, to save maps api requests which is limited (or paying) -->
	<div class="w-1/2 fixed right-0">
		<div class="relative w-full h-screen">
			<MapContainer {coords} event={selectedEvent} />
		</div>
	</div>
</div>
