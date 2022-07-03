<script>
	import { onMount } from 'svelte';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
	import EventModal from './modals/EventModal.svelte';
	import PlaceModal from "./modals/PlaceModal.svelte";
	import { globalSearch } from '../../store.js';
	import { getHotelsNearby } from '../../services/hotels.js';

	export let coords;
	export let event = null;
	export let place = null;
	let map = null;
	let marker = null;
	let mapboxgl = null;
	let showHotels = false;
	let hotelsMakers = [];

	onMount(async () => {
		mapboxgl = (await import('mapbox-gl')).default;
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
		center: [coords.lon, coords.lat],
		zoom: 12,
		essential: true
	});

	$: marker?.setLngLat([coords.lon, coords.lat]).addTo(map);

	const showAccommodations = async () => {
		if ($globalSearch.city && hotelsMakers.length === 0) {
			console.log('=>(MapContainer.svelte:45) hotelsMakers.length', hotelsMakers.length);
			const params = {
				lat: $globalSearch.city.lat,
				lon: $globalSearch.city.lon
			};
			const hotels = await getHotelsNearby(params);

			for (const hotel of hotels.data) {
				const marker = new mapboxgl.Marker({
					color: '#45b6fe'
				});
				const name = hotel.name.toLowerCase().capitalize();
				const markerDiv = marker.getElement();
				marker
					.setLngLat([hotel.geoCode.longitude, hotel.geoCode.latitude])
					.setPopup(
						new mapboxgl.Popup().setHTML(
							'<p class="font-bold text-lg m-3">' +
								name +
								'</p>' +
								"<p class='lowercase'>" +
								hotel.distance.value +
								' ' +
								hotel.distance.unit +
								' from city center</p>'
						)
					)
					.addTo(map);
				markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
				markerDiv.addEventListener('mouseleave', () => marker.togglePopup());
				hotelsMakers.push(markerDiv);
			}
		}

		for (const hotelDiv of hotelsMakers) {
			if (showHotels) hotelDiv.style.display = 'none';
			else hotelDiv.style.display = 'block';
		}

		showHotels = !showHotels;
	};
</script>

<button
	class="absolute z-10 left-5 top-5 inline-flex items-center px-5 py-2 bg-white overflow-hidden text-emerald-600 rounded-lg"
	on:click={() => showAccommodations()}
>
	{showHotels ? 'Hide' : 'Show'} accommodations
</button>

<div id="map" />
{#if event}
	<EventModal {event} />
{/if}
{#if place}
	<PlaceModal {place} />
{/if}

<style>
	#map {
		position: fixed;
		width: 50vw;
		height: 100vh;
	}
</style>
