import { writable } from 'svelte/store';

export function createColumnSizesStore(arr: Array<{ accessor: string; w: number; minW: number; maxW: number }> = []) {
    const { set, subscribe, update } = writable(arr);

    return {
        subscribe,
        set,
        update,
    };
}

export const columnSizes = createColumnSizesStore();
export type ColumnSizes = typeof columnSizes