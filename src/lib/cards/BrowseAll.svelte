<script>
    import Icon from 'mdi-svelte';
    import { mdiChevronLeft, mdiChevronRight, mdiMagnify, mdiFilterRemoveOutline, mdiEmoticonDead } from '@mdi/js';
	import { getEvents } from '../../services/events.js';
    import EventCard from '$lib/cards/EventCard.svelte';
    import { onMount } from 'svelte';
    import { globalSearch, updateStore } from '../../store.js';


	export let cardClickCB;
    export let backCarousel; // get back to Carousel
    let bMinPrice = false;
    let minPrice = 0;
    let bMaxPrice = false;
    let maxPrice = 0;
    let bSearchText = false;
    let searchText = ''
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
            minPrice: bMinPrice ? minPrice : null,
            maxPrice: bMaxPrice ? maxPrice : null,
            page: pagination,
			sort: 'date,asc'
		};

		if (startDate) params.startDateTime = startDate + 'T00:00:00z';
		if (endDate) params.endDateTime = endDate + 'T23:59:59z';

		getEvents(params).then((response) => {
            if (bSearchText) {
                events = response.data.events.filter(e => e.name.toLowerCase().includes(searchText.toLowerCase()))
            } else
			    events = response.data.events;
            console.log('{GET_EVENTS} : events:', events)
            totalPages = response.data.page.totalPages;
            console.log('{GET_EVENTS} : totalPages:', totalPages)
		});
	};

    const managePages = async (index) => {
        console.log("manage pages ", index)
        if (index <= 1)
            pagination = 1;
        else if (index >= totalPages)
            pagination = totalPages
        else
            pagination = index;
        
        if (pagination < 3)
            arrayPagination = Array(1, 2, 3)
        else if (pagination === totalPages)
            arrayPagination = Array(pagination-2, pagination-1, pagination)
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
	<div class="flex h-8">
		<button on:click={() => backCarousel()} class="flex text-center btn-browse">
			<Icon path={mdiChevronLeft} color="black" />
			<span>Back</span>
		</button>
        {#if !bMinPrice}
        <div class="inline m-auto w-36">
            <button on:click={() => bMinPrice = true} class="flex m-auto text-center btn-browse">
                <span>Min price</span>
            </button>
        </div>
        {:else}
        <div class="inline m-auto w-36">
            <input bind:value={minPrice} placeholder="Min price" class="w-24 border-black border-2 rounded" type="number" />
            <div class="inline cursor-pointer" on:click={() => bMinPrice = false}>
                <Icon path={mdiFilterRemoveOutline} color="red"/>
            </div>
        </div>
        {/if}
		{#if !bMaxPrice}
        <div class="inline m-auto w-36">
            <button on:click={() => bMaxPrice = true} class="flex m-auto text-center btn-browse">
                <span>Max price</span>
            </button>
        </div>
        {:else}
        <div class="inline m-auto w-36">
            <input bind:value={maxPrice} placeholder="Max price" class="w-24 border-black border-2 rounded" type="number" />
            <div class="inline cursor-pointer" on:click={() => bMaxPrice = false}>
                <Icon path={mdiFilterRemoveOutline} color="red"/>
            </div>
        </div>
        {/if}
        {#if !bSearchText}
        <div class="inline m-auto w-36">
            <button on:click={() => bSearchText = true} class="flex m-auto text-center btn-browse">
                <span>Search</span>
            </button>
        </div>
        {:else}
        <div class="inline m-auto w-36">
            <input bind:value={searchText} placeholder="Enter keywords" class="w-24 border-black border-2 rounded" type="text" />
            <div class="inline cursor-pointer" on:click={() => bSearchText = false}>
                <Icon path={mdiFilterRemoveOutline} color="red"/>
            </div>
        </div>
        {/if}
		<button on:click={() => search(city)} class="flex m-auto text-center btn-browse">
			<Icon path={mdiMagnify} color="black" />
		</button>
	</div>
	<div class="flex flex-wrap pl-0">
        {#if events.length > 0}
		{#each events as e, index}
		<div class="browse-grid-element">
			<EventCard event={e} on:click={cardClickCB(e)} />
		</div>
		{/each}
        {:else}
        <h2 class="m-auto text-gray-400 p-12">
            <Icon path={mdiEmoticonDead} color="gray" />
        Sorry, there are no more elements to display
        </h2>
        {/if}

	</div>
    <div class="flex">
        <div class="m-auto"> <!-- pagination -->
            <button on:click={() => managePages(pagination-1)} class="w-6 h-6 border border-black rounded-sm mx-2">
                <Icon path={mdiChevronLeft} color="black" />
			</button>
            {#if pagination > 3}
            <button on:click={() => managePages(1)} class="w-6 h-6 border border-black rounded-sm mx-2">
                1
            </button>
            {/if}
			{#each arrayPagination as b}
			<button on:click={() => managePages(b)} id={pagination === b ? 'active' : null} class="w-6 h-6 border border-black rounded-sm mx-2">
				{b}
			</button>
			{/each}
            {#if pagination < totalPages - 2}
            <button on:click={() => managePages(totalPages)} class="w-6 h-6 border border-black rounded-sm mx-2">
                {totalPages}
            </button>
            {/if}
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

    #active {
        background-color: darkgray;
    }

</style>