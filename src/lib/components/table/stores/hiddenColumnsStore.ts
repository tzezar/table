import { writable } from 'svelte/store';

export function createHiddenColumnsStore(arr: Array<string> = []) {
    const { set, subscribe, update } = writable(arr);

    return {
        subscribe,
        set,
        update,
    };
}

export const hiddenColumns = createHiddenColumnsStore();
export type HiddenColumns = typeof hiddenColumns