<script>
	import Icon from 'mdi-svelte';
	import { mdiMapMarker, mdiMapLegend } from '@mdi/js';

	export let place;
	let categories = [];
	let image = ''

	let address = '';

	$: if (place) {
		image = place.photos[0].prefix + 'original' + place.photos[0].suffix;
		categories = place.categories
		address = `${place.location.address}, ${place.location.locality}, ${place.location.region}, ${place.location.country}`
	}

</script>

<div class="bg-white absolute z-10 left-5 right-5 rounded-lg temp-height bottom-5 shadow-lg">
	<div class="flex">
		<div class="w-4/6 p-3">
			<div class="flex mb-2 inline-flex items-center">
				<Icon path={mdiMapMarker} color="#FF7F50" size="1.4" />
				<h2 class="text-lg font-bold ml-1">{place.name}</h2>
			</div>
			<div class="flex mb-4">
				{#if categories[0]}
					<p
						class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-sky-100 bg-sky-700 rounded-full"
					>
						{categories[0].name}
					</p>
				{/if}

				{#if categories[1]}
					<p
						class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-emerald-100 bg-emerald-700 rounded-full"
					>
						{categories[1].name}
					</p>
				{/if}

				{#if categories[2]}
					<p
						class="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-rose-100 bg-rose-700 rounded-full"
					>
						{categories[2].name}
					</p>
				{/if}
			</div>
			{#if address}
				<div class="flex mb-2">
					<Icon path={mdiMapLegend} color="grey" />
					<p class="ml-1">{address}</p>
				</div>
			{/if}
		</div>
		<div class="w-2/6 p-5 flex flex-col items-center">
			<img width="300" class="rounded" src={image} alt={place.name} />
		</div>
	</div>
</div>
