<script>
	import MapContainer from '$lib/map/MapContainer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getEvents } from '../services/events.js';
	import EventCard from '$lib/cards/EventCard.svelte';
	import DestinationHeader from '../lib/DestinationHeader.svelte';
	import Header from '../lib/Header.svelte';

	let events = [];
	let selectedEvent = null;
	let startDate = null;
	let endDate = null;

	// let events = [];
	let city = $page.params.destination;
	let coords = {
		latitude: 43.610769,
		longitude: 3.876716
	};

	const search = (city, startDate, endDate) => {
		const params = {
			city,
			sort: 'date,asc'
		};

		if (startDate) params.startDateTime = startDate + 'T00:00:00z';
		if (endDate) params.endDateTime = endDate + 'T23:59:59z';

		getEvents(params).then((response) => {
			events = response.data.events;
			if (events && events[0]?.location) coords = events[0].location;
		});
	};

	onMount(() => {
		search(city);
	});

	$: if (startDate || endDate) {
		search(city, startDate, endDate);
	}

	const flyTo = (event) => {
		if (event.location) coords = event.location;
		return (selectedEvent = event);
	};
</script>

<div class="flex">
	<!--	 left panel, 50% page width-->
	<!--	 the html in left panel is temporary, for test MapContainer component, and will need to be split out-->
	<div class="w-1/2 bg-gray-50">
		<Header />
		<div>
			<DestinationHeader {city} bind:startDate bind:endDate />
		</div>

		<div class="grid grid-cols-3 gap-4 p-5">
			{#if events}
				{#each events as event}
					<div on:click={flyTo(event)}>
						<EventCard {event} />
					</div>
				{/each}
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
