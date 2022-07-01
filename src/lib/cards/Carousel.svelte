<script>
	import Icon from 'mdi-svelte';
	import { mdiChevronLeft, mdiChevronRight, mdiChevronUp, mdiChevronDown, mdiMagnify } from '@mdi/js';
	import EventCard from '$lib/cards/EventCard.svelte';
	import BrowseAll from '$lib/cards/BrowseAll.svelte';
	import PlaceCard from "./PlaceCard.svelte";

	export let events = [];
	export let places = [];
	export let title;
	export let cardClickCB;
	let BbrowseAll = false;

	let indexToShow = 0;
	let carouselExpanded = true;

	const toggleHeight = (maxHeight) => {
		let e = document.getElementById('expand-events');

		if (e.style.height != '30px') {
			e.style.height = '30px'; // height of one line: 20px
			carouselExpanded = false;
		} else {
			e.style.height = maxHeight + 'px';
			carouselExpanded = true;
		}
	};

	const moveIndex = (way) => {
		const maxLength = events.length || places.length
		if (way === 'prev' && indexToShow > 0) indexToShow--;
		else if (way === 'next' && indexToShow < maxLength) indexToShow++;
	};

	const browseAll = () => {
		BbrowseAll = !BbrowseAll;
	}

	// const movePagination = (index) => {
	// 	if (index > 1)
	// 		paginationLimitDown = (index-1) + (paginationIndex * index) - paginationIndex
	// 	else
	// 		paginationLimitDown = (index) + (paginationIndex * index) - paginationIndex
	//
	// 	paginationLimitUp = (index-1) + (paginationIndex * index)
	//
	// 	indexActive = index;
	//
	// 	console.log("page down ", paginationLimitDown, "page up ", paginationLimitUp)
	// }
</script>

{#if !BbrowseAll}

<div id="expand-events" class="m-auto expandable"> 
	<div class="flex" style="height: 50px;">
		<div on:click={() => toggleHeight(350)} class="inline-block float-right">
			{#if carouselExpanded}
				<Icon path={mdiChevronDown} color="black" />
			{:else}
				<Icon path={mdiChevronUp} color="black" />
			{/if}
		</div>
		<h3 on:click={() => toggleHeight(350)} class="inline-block">{title}</h3>
		<button on:click={() => browseAll()} class="flex text-center ml-auto btn-browse">
			<Icon path={mdiMagnify} color="black" />
			<span>Browse all</span>
		</button>
	</div>
	<div class="flex items-center justify-center">
		<button class="" on:click={() => moveIndex('prev')}>
			<Icon path={mdiChevronLeft} color="black" />
		</button>
		<div class="flex overflow-x-auto gap-6 snap-x snap-mandatory">
			{#if events.length > 0}
				<EventCard event={events[indexToShow]} on:click={cardClickCB(events[indexToShow])} />
				<EventCard event={events[indexToShow + 1]} on:click={cardClickCB(events[indexToShow + 1])} />
				<EventCard event={events[indexToShow + 2]} on:click={cardClickCB(events[indexToShow + 2])} />
			{:else if places.length > 0}
				<PlaceCard place={places[indexToShow]} on:click={cardClickCB(places[indexToShow])} />
				<PlaceCard place={places[indexToShow + 1]} on:click={cardClickCB(places[indexToShow + 1])} />
				<PlaceCard place={places[indexToShow + 2]} on:click={cardClickCB(places[indexToShow + 2])} />
			{/if}
		</div>
		<button class="float-right" on:click={() => moveIndex('next')}>
			<Icon path={mdiChevronRight} color="black" />
		</button>
	</div>
</div>

{:else}

	<BrowseAll cardClickCB={cardClickCB} backCarousel={browseAll} />

{/if}	


<style>
	.expandable {
		padding-top: 10px;
		/* overflow set to hidden to hide the expanded text */
		overflow: hidden;
		/* all style changes will ease-in-out for 1s */
		-moz-transition: all 0.66s ease-in-out;
		-ms-transition: all 0.66s ease-in-out;
		-o-transition: all 0.66s ease-in-out;
		-webkit-transition: all 0.66s ease-in-out;
		transition: all 0.66s;
	}

	#btn-browse > * {
		display: inline !important;
	}
</style>
