<script>
	import { goto } from '$app/navigation';
	let city = '';
</script>

<div class="m-7">
	<h1 class="text-2xl mb-3 font-bold underline">EPIC ROAD TRIP</h1>
	<input
		type="text"
		bind:value={city}
		class="shadow appearance-none border rounded text-gray-700 py-1 px-2 focus:outline-none focus:shadow-outline"
	/>
	<button
		on:click={() => goto(`${city}`)}
		class="bg-indigo-500 hover:bg-indigo-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
	>
		Start planning
	</button>
</div>
