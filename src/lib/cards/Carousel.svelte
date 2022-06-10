<script>
    import Icon from 'mdi-svelte'
    import { mdiChevronLeft } from '@mdi/js'
    import { mdiChevronRight } from '@mdi/js'
	import EventCard from '$lib/cards/EventCard.svelte';

    export let events

    let indexToShow = 0;

    console.log("eventss: ", events)

    function moveIndex(way) {
        console.log("move index, ", way)
        if (way==='prev' && indexToShow > 0)
            indexToShow--;
        else if (way==='next' && indexToShow < events.length)
            indexToShow++;
        console.log("inde:", indexToShow)
    }

</script>

<div>

    <button
        class="float-left"
        on:click={() =>moveIndex("prev")}
    >
    <Icon path={mdiChevronLeft} color="black" />

    </button>
    <button
    class="float-right"
    on:click={() => moveIndex("next")}
    >
    <Icon path={mdiChevronRight} color="black" />
    </button>
<ul class="flex overflow-x-auto gap-6 snap-x snap-mandatory">
        <EventCard event={events[indexToShow]}/>
        <EventCard event={events[indexToShow +1]}/>
        <EventCard event={events[indexToShow +2]}/>
    <!-- <li class="shrink-0 snap-center align-top inline-block text-center">
        <img src={events[indexToShow].image[0].url} alt={"ok"}/>
        <span class="block clear-left">
            {events[indexToShow].name}
        </span>
    </li>
    <li class="shrink-0 snap-center align-top inline-block text-center">
        <img src={events[indexToShow+1].image[0].url} alt={"ok"}/>
        <span class="block clear-left">
            {events[indexToShow+1].name}
        </span >
    </li>
    <li class="shrink-0 snap-center align-top inline-block text-center">
        <img src={events[indexToShow+2].image[0].url} alt={"ok"}/>
        <span class="block clear-left">
            {events[indexToShow+2].name}
        </span >
    </li> -->
</ul>


</div>

<style>
    li {
        width: 180px;
    }
    img {
        float: left;
        width:  180px;
        height: 130px;
        object-fit: cover;
    }

    ul {
        overflow: hidden;
    }

    button {
        height: 130px;
    }

</style>