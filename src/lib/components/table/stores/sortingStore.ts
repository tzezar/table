import { writable } from 'svelte/store';
import type { SortingElement } from '..';

export function createSortingStore(sorting: SortingElement) {
    const { set, subscribe, update } = writable(sorting);

    return {
        subscribe,
        set,
        update,
    };
}

export const sorting = createSortingStore({ accessor: "", direction: "" });
export type Sorting = typeof sorting