<script>
  import { getPhotos } from '../services/photos.js';
  import { onMount } from 'svelte';

  export let city;
  let destinationPhotoUrls;

  onMount(() => {
    const params = {
      city
    }
    getPhotos(params)
      .then((response) => destinationPhotoUrls = response.data)
  })
</script>
{#if destinationPhotoUrls}
  <div>
    <img src="{destinationPhotoUrls.raw}" alt="picture of a city">
  </div>
{/if}