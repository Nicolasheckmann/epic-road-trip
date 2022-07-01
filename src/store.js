import { writable } from 'svelte/store';
import { mergeDeep } from './utils';

export const globalSearch = writable({});

export const updateStore = (newState) =>
	globalSearch.update((previousState) => mergeDeep(previousState, newState));
