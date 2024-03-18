import { writable } from 'svelte/store';

export function createVisibleRowsStore(arr: Array<any> = []) {
    const { set, subscribe, update } = writable(arr);

    return {
        subscribe,
        set,
        update,
    };
}

export const visibleRows = createVisibleRowsStore();
export type VisibleRows = typeof visibleRows