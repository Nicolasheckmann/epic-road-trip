<script>
	import { selectEventImage } from '../../utils.js';
	export let event;

	let selectedImage = {};
	$: selectedImage = selectEventImage(event);
</script>

{#if event && selectedImage}
	<div on:click class="relative m-3 transition duration-500 cursor-pointer hover:scale-105">
		<p
			class="absolute -right-2 -top-2 px-2 py-1 text-xs leading-none text-sky-100 bg-sky-700 rounded-lg"
		>
			{event.name}
		</p>
		<img class="rounded-lg shadow" src={selectedImage.url} alt={event.name} />
		<p
			class="absolute -bottom-2 -left-2 px-2 py-1 text-xs leading-none text-emerald-100 bg-emerald-700 rounded-lg lowercase"
		>
			{event.segment}
		</p>
	</div>
{/if}
