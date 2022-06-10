<script>
	import { getPhotos } from '../services/photos.js';
	import { onMount } from 'svelte';

	export let city;
	let destinationPhotoUrls;
    export let startDate;
    export let endDate;

	onMount(() => {
		const params = {
			city
		};
		getPhotos(params).then((response) => (destinationPhotoUrls = response.data));
	});
</script>

{#if destinationPhotoUrls}
	<div class="wrapper relative mb-8">
		<div class="wallpaper">
			<img src={destinationPhotoUrls.regular} alt="a city" />
		</div>
		<div
			class="datePicker flex flex-col justify-between p-8 absolute bottom-0 left-12 right-12 rounded bg-white"
		>
			<h3 class="text-2xl font-bold">Trip to {city.capitalize()}</h3>
			<div class="flex">
				<input class="font-bold" type="date" bind:value={startDate}/>
				<p class="font-bold mx-5" >to</p>
				<input class="font-bold" type="date" bind:value={endDate} />
			</div>
		</div>
	</div>
{/if}

<style>
	.datePicker {
		min-height: 160px;
	}

	img {
		height: 250px;
		object-fit: cover;
		width: 100%;
	}

	.wallpaper {
		min-height: 250px;
	}

	.wrapper {
		height: 350px;
	}
</style>
