import { writable } from 'svelte/store';
import { mergeDeep } from './utils';

export const globalSearch = writable({});

export const updateStore = (newState) =>
	globalSearch.update((previousState) => mergeDeep(previousState, newState));

export const user = writable({});

export const updateUser = (newState) => {
	user.update((previousState) => {
		previousState = {...newState}
		return previousState
	});
}

if(typeof localStorage !== 'undefined'){
	if(localStorage.getItem('user')){
		console.log('user found')
		user.set(JSON.parse(localStorage.getItem('user')))
	}
}