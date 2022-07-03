import { writable } from 'svelte/store';

export const globalSearch = writable({});

export const updateStore = (newState) =>
	globalSearch.update((previousState) => Object.assign(previousState, newState));

export const user = writable({});

export const updateUser = (newState) =>
	user.update((previousState) => {
		previousState = {...newState}
		return previousState
	});
