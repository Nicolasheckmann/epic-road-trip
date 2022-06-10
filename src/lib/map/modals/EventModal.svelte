<script>
	import { selectEventImage } from '../../../utils.js';
	import Icon from 'mdi-svelte';
	import { mdiMapMarker, mdiCalendarRange, mdiClockOutline, mdiCash } from '@mdi/js';

	export let event;
	let selectedImage = null;
	let localDate = '';
	let localTime = '';
	let description = '';
	let segment = '';
	let genre = '';
	let subGenre = '';
	let price = '';
	let fullDesc = false;
	let truncateClass = 'truncate';

	$: if (event) {
		selectedImage = selectEventImage(event);
		event.dates?.localDate ? (localDate = event.dates?.localDate) : (localDate = '');
		event.dates?.localTime ? (localTime = event.dates?.localTime.slice(0, -3)) : (localTime = '');
		event.description ? (description = event.description) : (description = '');
		truncateClass = 'truncate';
		fullDesc = false;
		event.segment && event.segment !== undefined ? (segment = event.segment) : (segment = '');
		event.genre &&
		event.genre !== undefined &&
		event.genre !== 'Undefined' &&
		event.genre !== event.segment
			? (genre = event.genre)
			: (genre = '');
		event.subGenre &&
		event.subGenre !== undefined &&
		event.subGenre !== 'Undefined' &&
		event.subGenre !== event.genre
			? (subGenre = event.subGenre)
			: (subGenre = '');

		if (event.priceRanges) {
			let currency = '';
			price = '';

			if (event.priceRanges.currency === 'USD') currency = '$';
			else if (event.priceRanges.currency === 'EUR') currency = '€';
			else if (event.priceRanges.currency === 'GBP') currency = '£';
			else currency = event.priceRanges.currency;

			if (event.priceRanges.min === event.priceRanges.max && event.priceRanges.min) {
				price = event.priceRanges.min + ' ' + currency;
			} else {
				if (event.priceRanges.min) price += event.priceRanges.min + '-';
				if (event.priceRanges.max) price += event.priceRanges.max + ' ';
				if (price ) price += currency;
			}
		} else {
			price = '';
		}
	}

	const toggleDescription = () => {
		fullDesc = !fullDesc;
		if (fullDesc) truncateClass = '';
		else truncateClass = 'truncate';
	};
</script>

<div class="bg-white absolute z-10 left-5 right-5 rounded-lg temp-height bottom-5">
	<div class="flex">
		<div class="w-4/6 p-3">
			<div class="flex mb-2 inline-flex items-center">
				<Icon path={mdiMapMarker} color="#FF7F50" size="1.4" />
				<h2 class="text-lg font-bold ml-1">{event.name}</h2>
			</div>
			<div class="flex mb-4">
				{#if segment}
					<p
						class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-sky-100 bg-sky-600 rounded-full"
					>
						{segment}
					</p>
				{/if}

				{#if genre}
					<p
						class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-emerald-100 bg-emerald-600 rounded-full"
					>
						{genre}
					</p>
				{/if}

				{#if subGenre}
					<p
						class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-rose-100 bg-rose-600 rounded-full"
					>
						{subGenre}
					</p>
				{/if}
			</div>
			<div class="flex mb-2">
				<Icon path={mdiCalendarRange} color="grey" />
				<p class="ml-1">{localDate}</p>
			</div>
			{#if localTime}
				<div class="flex mb-2">
					<Icon path={mdiClockOutline} color="grey" />
					<p class="ml-1">{localTime}</p>
				</div>
			{/if}
			{#if price}
				<div class="flex mb-2">
					<Icon path={mdiCash} color="grey" />
					<p class="ml-1">{price}</p>
				</div>
			{/if}
			{#if description}
				<div>
					<p class={truncateClass}>{description}</p>
					<button class="underline" on:click|preventDefault={() => toggleDescription()}>
						{fullDesc ? 'hide' : 'see more...'}
					</button>
				</div>
			{/if}
		</div>
		<div class="w-2/6 p-5 flex flex-col items-center">
			<img width="300" class="rounded" src={selectedImage.url} alt={event.name} />
			{#if event.url}
				<a href={event.url}>
					<button class="rounded-full bg-sky-600 px-3 py-1 text-white mt-5">Book event</button>
				</a>
			{/if}
		</div>
	</div>
</div>
