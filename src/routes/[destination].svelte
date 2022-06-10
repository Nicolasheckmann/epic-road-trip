<script>
	import MapContainer from '$lib/map/MapContainer.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getEvents } from '../services/events.js';
	import Carousel from '$lib/cards/Carousel.svelte'
    import Icon from 'mdi-svelte'
	import { mdiChevronDown } from '@mdi/js'
	import { mdiChevronUp } from '@mdi/js'
	import EventCard from '$lib/cards/EventCard.svelte';
	import DestinationHeader from "../lib/DestinationHeader.svelte";
	import Header from '../lib/Header.svelte'

	// let Carousel; // for saving Carousel component class
  	// let carousel; // for calling methods of the carousel instance


	let events = [];
	let eventExpanded = true;

	let city = $page.params.destination;
	let coords = {
		latitude: 43.610769,
		longitude: 3.876716
	};

	onMount(async () => {
    // const module = await import('svelte-carousel');
    // Carousel = module.default;
	const city = $page.params.destination;
	const params = {
		city,
		sort: 'date,asc'
	};
	await getEvents(params).then((response) => {
		events = response.data.events;
		console.log('response:', response)
		if (events && events[0]?.location) coords = events[0].location;
	});
	console.log("events", events)
	});

	function toggleHeight(maxHeight) {
    let e = document.getElementById("expand-events"); // e = the gray div

	console.log("e ", e.style.height)
    
    if(e.style.height != '0px') {
        e.style.height = '0px'; // height of one line: 20px
		eventExpanded = false;
    } else {
        e.style.height = maxHeight + 'px';
		eventExpanded = true;
    }
}


	const flyTo = (event) => {
		if (event.location) return (coords = event.location);
	};
</script>
<div class="flex">
	<!--	 left panel, 50% page width-->
	<!--	 the html in left panel is temporary, for test MapContainer component, and will need to be split out-->
	<!-- <div class="w-1/2 bg-gray-50"> -->
		<!-- <div class="grid grid-cols-3 gap-4 p-5">
			{#if events}
				{#each events as event}
					<div on:click={flyTo(event)}>
						<EventCard {event} />
					</div>
				{/each} -->
	<div class="w-1/2 bg-gray-50">
		<Header/>
		<div>
			<DestinationHeader {city} />
		</div>
			<!-- <svelte:component
				let:showPrevPage
				this={Carousel}
				bind:this={carousel}
				{...props}
			>
			<button
			type="button"
			slot="prev"
			on:click={showPrevPage}
			>
			&LongLeftArrow;
		</button>
			{#each events as event}
				<EventCard on:click={flyTo(event)} {event} />
			{/each}
			</svelte:component> -->
			{#if events.length > 0}
			<div>
				<h1 style="width: 90%;" on:click={() => toggleHeight(150)} class="inline-block">Events</h1>
				<div on:click={() => toggleHeight(190)} class="inline-block float-right">
				{#if eventExpanded}
				<Icon path={mdiChevronDown} color="black" />
				{:else}
				<Icon path={mdiChevronUp} color="black" />
				{/if}
				</div>
			<div style="height: 190px;" id="expand-events" class="m-auto expandable">
			<Carousel events={events}/>
			</div>
			</div>
			{/if}
	</div>

	<!-- right panel, 50% page width-->
	<!-- please comment out this component when not developing on it, to save maps api requests which is limited (or paying) -->
	<div class="w-1/2">
		<MapContainer {coords} />
	</div>
</div>

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

.icon-class {
	display: inline-block;
}

</style>