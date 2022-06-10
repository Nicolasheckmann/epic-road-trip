<script>
    import {selectEventImage} from "../../utils.js";
    export let event;

    let selectedImage = {}
    $: selectedImage =  selectEventImage(event)
</script>

{#if event && selectedImage}
    <div class="max-w-xs rounded-lg overflow-hidden shadow-lg bg-slate-800 cursor-pointer h-full">
        <img class="rounded" src="{selectedImage.url}" alt="{event.name}" />
        <div class="p-5">
            <h5 class="mb-7 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
            <div class="flex justify-between items-center">
                <p class="text-sm font-normal text-gray-700 dark:text-gray-400">{event.segment}</p>
                <p class="text-sm font-normal text-gray-700 dark:text-gray-400">{event.dates.localDate}</p>
            </div>
        </div>
    </div>
{/if}