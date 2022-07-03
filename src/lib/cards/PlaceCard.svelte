<script>
	// import { selectEventImage } from '../../utils.js';
	export let place;
	let image;
	$: image = place.photos[0].prefix + 'original' + place.photos[0].suffix;
</script>

{#if place && image}
	<div on:click class="relative m-3 transition duration-500 cursor-pointer hover:scale-105">
		<p
			class="absolute -right-2 -top-2 px-2 py-1 text-xs leading-none text-sky-100 bg-sky-700 rounded-lg"
		>
			{place.name}
		</p>
		<img class="rounded-lg shadow h-52" src={image} alt={place.name} />
		<p
			class="absolute -bottom-2 -left-2 px-2 py-1 text-xs leading-none text-emerald-100 bg-emerald-700 rounded-lg lowercase"
		>
			{place.categories[0].name}
		</p>
	</div>
{/if}
