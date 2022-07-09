<script>
	import { getPhotos } from '../services/photos.js';
	import { globalSearch, updateStore } from '../store.js';
	import Icon from 'mdi-svelte';
	import { mdiAirplaneLanding } from '@mdi/js';
	import FlightsModal from '../lib/map/modals/FlightsModal.svelte';

	let destinationPhotoUrls;
	
	let city;
	$: city = $globalSearch.city?.name;
	$: if (city) {
		const params = {
			city
		};
		getPhotos(params).then((response) => (destinationPhotoUrls = response.data));
	}

	let isOpenModal = false;

    function openFlightsModal() {
        isOpenModal = true;
    }

    function closeFlightsModal() {
        isOpenModal = false;
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
					min={new Date().toISOString().slice(0, -14)}
					value={$globalSearch.startDate}
					on:change|preventDefault={(e) => {
						updateStore({ startDate: e.target.value });
					}}
				/>
				<p class="font-bold mx-5">to</p>
				<input
					class="font-bold"
					type="date"
					min={$globalSearch.startDate}
					value={$globalSearch.endDate}
					on:change|preventDefault={(e) => updateStore({ endDate: e.target.value })}
				/>
			</div>
			<button on:click={openFlightsModal} class="flex space-x-2 justify-center items-center  px-3 py-2 mt-4 mb-0 ml-4 mr-4 bg-blue-500 hover:bg-blue-800 rounded-full drop-shadow-md">
				<Icon path={ mdiAirplaneLanding } color="white" />
				<span class="text-white">Plan your trip</span>
			</button>
		</div> 
	</div>
{/if}

<FlightsModal isOpenModal={isOpenModal} on:closeModal={closeFlightsModal} />



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
