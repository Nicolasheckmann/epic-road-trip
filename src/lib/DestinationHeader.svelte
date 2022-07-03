<script>
	import { getPhotos } from '../services/photos.js';
	import { globalSearch, updateStore } from '../store.js';

	let destinationPhotoUrls;

	let city;
	$: city = $globalSearch.city?.name;
	$: if (city) {
		const params = {
			city
		};
		getPhotos(params).then((response) => (destinationPhotoUrls = response.data));
	}
</script>

{#if destinationPhotoUrls}
	<div class="wrapper relative mb-8">
		<div class="wallpaper">
			<img src={destinationPhotoUrls.regular} alt="a city" />
		</div>
		<div
			class="datePicker flex flex-col justify-between p-8 absolute bottom-0 left-12 right-12 rounded bg-white shadow-lg"
		>
			<h3 class="text-2xl font-bold">Trip to {city.capitalize()}</h3>
			<div class="flex">
				<input
					class="font-bold"
					type="date"
					value={$globalSearch.startDate}
					on:change|preventDefault={(e) => {
						updateStore({ startDate: e.target.value });
					}}
				/>
				<p class="font-bold mx-5">to</p>
				<input
					class="font-bold"
					type="date"
					value={$globalSearch.endDate}
					on:change|preventDefault={(e) => updateStore({ endDate: e.target.value })}
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	.datePicker {
		min-height: 160px;
	}

	img {
		height: 300px;
		object-fit: cover;
		width: 100%;
	}

	.wallpaper {
		min-height: 300px;
	}

	.wrapper {
		height: 400px;
	}
</style>
