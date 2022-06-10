<script>
	import { onMount } from 'svelte';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	import EventModal from './modals/EventModal.svelte';

	export let coords;
	export let event = null;
	let map = null;
	let marker = null;

	onMount(async () => {
		const mapboxgl = (await import('mapbox-gl')).default;
		mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

		map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [3.876716, 43.610769], // starting position [lng, lat]
			zoom: 9, // starting zoom
			customAttribution: 'Epic Road Trip'
		});
		map.addControl(new mapboxgl.NavigationControl(), 'top-right');

		marker = new mapboxgl.Marker({
			color: '#FF7F50'
		});
	});

	$: map?.easeTo({
		center: [coords.longitude, coords.latitude],
		zoom: 12,
		essential: true
	});

	$: marker?.setLngLat([coords.longitude, coords.latitude]).addTo(map);
</script>

<div id="map" ></div>
{#if event}
	<EventModal {event} />
{/if}

<style>
	#map {
		position: fixed;
		width: 50vw;
		height: 100vh;
	}
</style>
