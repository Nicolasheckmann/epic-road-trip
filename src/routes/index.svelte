<script>
	import { goto } from '$app/navigation';

	import Icon from 'mdi-svelte';
	import { mdiMagnify } from '@mdi/js';
	import { globalSearch, updateStore } from '../store.js';
	import { getCitiesSuggestion, getIatacode} from '../services/cities.js';

	let city = '';
	let suggestions = [];
	let warning = false;

	$: $globalSearch.city && (warning = false);

	let isFocused = false;
	const onFocus = () => {
		isFocused = true;
		suggestions = [];
	};
	const onBlur = () => {
		isFocused = false;
		suggestions = [];
	};

	const searchCities = async (cityQuery) => {
		if (cityQuery.length > 2) {
			const params = {
				cityQuery,
				limit: 5
			};
			getCitiesSuggestion(params).then((res) => (suggestions = res));
		}
	};

	const navigate = () => {
		if (!$globalSearch.city?.lat || !$globalSearch.city?.lon) {
			warning = true;
		} else {
			const lat = $globalSearch.city.lat;
			const lon = $globalSearch.city.lon;
			goto(`planner?lat=${lat}&lon=${lon}`);
		}
	};
</script>

<div class="bg-slate-100">
	<div class="flex justify-center h-screen">
		<div
			class="hidden bg-cover lg:block lg:w-2/3"
			style="background-image: url(https://source.unsplash.com/A5rCN8626Ck/1920x1080)"
		>
			<div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
				<div>
					<h2 class="text-4xl font-bold text-white">Epic Road Trip</h2>

					<p class="max-w-xl mt-3 text-gray-300">
						Some are too lazy, and some are too busy, a lot of people can’t organize travels
						properly...<br /> Here is our solution !
					</p>
				</div>
			</div>
		</div>

		<div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
			<div class="flex-1">
				<div class="text-center">
					<h2 class="text-4xl font-bold text-center text-gray-700">Epic Road Trip</h2>

					<p class="mt-3 text-gray-500">Adventure awaits, go find it !</p>
				</div>

				<div class="mt-8">
					<form autocomplete="off">
						<div class="relative">
							<label for="destination" class="block mb-2 text-sm text-gray-600"
								>Where do you want to go ?</label
							>
							<div>
								<input
									type="text"
									autocomplete="off"
									on:focus={onFocus}
									on:blur={onBlur}
									bind:value={city}
									on:input|preventDefault={(e) => {
										searchCities(e.target.value);
									}}
									id="destination"
									placeholder="Enter a city"
									class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
								/>
								{#if warning}
									<p class="text-sm text-red-600 ml-0.5">Please choose a destination</p>
								{/if}
								{#if isFocused && suggestions?.length > 0}
									<div
										class="absolute right-0 left-0 bg-white z-10 px-2 pb-2 rounded-lg mt-2 border text-ellipsis"
									>
										{#each suggestions as suggestion}
											<ul>
												<li
													class="mt-2 flex items-center cursor-pointer text-ellipsis"
													on:mousedown={async () => {
														city = suggestion.name;
														const iata = await getIatacode(suggestion)
														console.log("iata1", iata);
                        								suggestion.iata = iata
														updateStore({ city: suggestion });
														console.log("destination", $globalSearch.city);
													}}
												>
													<Icon path={mdiMagnify} size="0.8" />
													<p class="text-sm font-medium ml-2 mr-1">
														{suggestion.name}
													</p>
													<p class="text-xs text-ellipsis	">
														{suggestion.state + ', ' + suggestion.country}
													</p>
												</li>
											</ul>
										{/each}
									</div>
								{/if}
							</div>
						</div>

						<div class="mt-6">
							<div class="flex justify-between mb-2">
								<label for="datepicker" class="text-sm text-gray-600"
									>When do you want to go ?</label
								>
							</div>
							<input
								type="date"
								id="datepicker"
								on:change|preventDefault={(e) => {
									console.log('=>(index.svelte:135) e.target.value', e.target.value, "zoeifhzef");
									updateStore({ startDate: e.target.value });
								}}
								class="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div class="mt-6">
							<button
								on:click|preventDefault={() => navigate()}
								class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
							>
								Start planning
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#datepicker {
		color: rgb(55 65 81);
	}
</style>
