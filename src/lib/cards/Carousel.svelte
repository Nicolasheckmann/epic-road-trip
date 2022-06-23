<script>
	import Icon from 'mdi-svelte';
	import { mdiChevronLeft, mdiChevronRight, mdiChevronUp, mdiChevronDown } from '@mdi/js';
	import EventCard from '$lib/cards/EventCard.svelte';

	export let events;
	export let title;
	export let cardClickCB;

	let indexToShow = 0;
	let carouselExpanded = true;

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
