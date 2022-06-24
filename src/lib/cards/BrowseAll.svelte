<script>
    import Icon from 'mdi-svelte';
    import { mdiChevronLeft, mdiChevronRight, mdiMagnify } from '@mdi/js';
	import { getEvents } from '../../services/events.js';
    import EventCard from '$lib/cards/EventCard.svelte';
    import { onMount } from 'svelte';
    import { globalSearch, updateStore } from '../../store.js';


	export let cardClickCB;
    export let backCarousel; // get back to Carousel
    let size = 12; // nombre d'events demandé à chaque page
    let pagination = 1;
    let arrayPagination = Array(1, 2, 3);
	let city = $globalSearch.city.name;
    let events = [];
    let totalPages = 0;


    const search = (city, startDate, endDate) => {
		const params = {
			city,
            size,
            page: pagination,
			sort: 'date,asc'
		};

		if (startDate) params.startDateTime = startDate + 'T00:00:00z';
		if (endDate) params.endDateTime = endDate + 'T23:59:59z';

		getEvents(params).then((response) => {
			events = response.data.events;
            totalPages = response.data.page.totalPages;
		});
	};

    const managePages = async (index) => {
        console.log("manage pages ", index)
        if (index <= 1)
            pagination = 1;
        else
            pagination = index;
        
        if (pagination < 3)
            arrayPagination = Array(1, 2, 3)
        else
            arrayPagination = Array(pagination-1, pagination, pagination+1)

        await search(city);
        console.log("array ;", arrayPagination)
    }

	onMount(async () => {
		await search(city);
	});

</script>


<div>
	<div class="flex">
		<button on:click={() => backCarousel()} class="flex text-center btn-browse">
			<Icon path={mdiChevronLeft} color="black" />
			<span>Back</span>
		</button>
		<button class="flex ml-auto text-center btn-browse">
			<span>Min price</span>
		</button>
		<button class="flex ml-auto text-center btn-browse">
			<span>Max price</span>
		</button>
		<button class="flex ml-auto text-center btn-browse">
			<Icon path={mdiMagnify} color="black" />
			<span>Search</span>
		</button>
	</div>
	<div class="flex flex-wrap pl-0">
		{#each events as e, index}
		<div class="browse-grid-element">
			<EventCard event={e} on:click={cardClickCB(e)} />
		</div>
		{/each}

	</div>
    <div class="flex">
        <div class="m-auto"> <!-- pagination -->
            <button on:click={() => managePages(pagination-1)} class="w-6 h-6 border border-black rounded-sm mx-2">
                <Icon path={mdiChevronLeft} color="black" />
			</button>
			{#each arrayPagination as b}
			<button on:click={() => managePages(b)} class="w-6 h-6 border border-black rounded-sm mx-2">
				{b}
			</button>
			{/each}
            <button on:click={() => managePages(pagination+1)} class="w-6 h-6 border border-black rounded-sm mx-2">
                <Icon path={mdiChevronRight} color="black" />
			</button>
		</div>
    </div>
</div>

<style>

	.browse-grid-element {
		flex: 0 0 33.333333%;
		padding: 10px;
	}

</style>