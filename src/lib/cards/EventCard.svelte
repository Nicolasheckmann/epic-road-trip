<script>
    export let event;

    // keep image with ratio 16_9
    const image_16_9 = event.image.filter(image => image.ratio === "16_9");
    // order images by width asc
    const image_16_9_ordered = image_16_9.sort((a, b) => a.width - b.width);
    // get first image above 300px
    const selected_image = image_16_9_ordered.find(image => image.width > 300);

    // maybe I will do this image computation in the api before returning the events
</script>

{#if event && selected_image}
    <div class="max-w-xs rounded-lg overflow-hidden shadow-lg bg-slate-800 cursor-pointer h-full">
        <img class="rounded" src="{selected_image.url}" alt="{event.name}" />
        <div class="p-5">
            <h5 class="mb-7 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{event.name}</h5>
            <div class="flex justify-between items-center">
                <p class="text-sm font-normal text-gray-700 dark:text-gray-400">{event.segment}</p>
                <p class="text-sm font-normal text-gray-700 dark:text-gray-400">{event.dates.localDate}</p>
            </div>
        </div>
    </div>
{/if}