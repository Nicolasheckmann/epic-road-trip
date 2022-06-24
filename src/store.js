import { writable } from 'svelte/store';

export const globalSearch = writable({});

export const updateStore = (newState) =>
	globalSearch.update((previousState) => Object.assign(previousState, newState));
