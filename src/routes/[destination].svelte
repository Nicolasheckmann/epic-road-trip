<script>
	import MapContainer from '$lib/map/MapContainer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getEvents } from '../services/events.js';
	import EventCard from '$lib/cards/EventCard.svelte';
	import DestinationHeader from "../lib/DestinationHeader.svelte";
	import Header from '../lib/Header.svelte'


	let events = [];
	let city = $page.params.destination;
	let coords = {
		latitude: 43.610769,
		longitude: 3.876716
	};

	onMount(() => {
		const params = {
			city,
			sort: 'date,asc'
		};
		getEvents(params).then((response) => {
			events = response.data.events;
			if (events && events[0]?.location) coords = events[0].location;
		});
	});

	const flyTo = (event) => {
		if (event.location) return (coords = event.location);
	};
</script>
<div class="flex">
	<!--	 left panel, 50% page width-->
	<!--	 the html in left panel is temporary, for test MapContainer component, and will need to be split out-->
	<div class="w-1/2 bg-gray-50">
		<Header/>
		<div>
			<DestinationHeader {city} />
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
	<div class="w-1/2">
		<MapContainer {coords} />
	</div>
</div>
