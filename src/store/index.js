import { writable } from 'svelte/store';

export const curRoute = writable('Home');
export const routeParams = writable([]);