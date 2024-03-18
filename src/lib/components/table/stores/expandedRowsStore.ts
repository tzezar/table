import { writable } from 'svelte/store';

export function createExpandedRowsStore(arr: Array<number> = []) {
    const { set, subscribe, update } = writable<number[]>(arr);

    return {
        subscribe,
        set,
        update,
        expand: (rowId: number) =>
            update((state) => {
                if (!state.includes(rowId)) {
                    return [...state, rowId];
                }
                return state;
            }),
        collapse: (rowId: number) =>
            update((state) => {
                let newState = state.filter((e) => e != rowId);
                return newState;
            })
    };
}

export const expandedRows = createExpandedRowsStore();

export type ExpandedRows = typeof expandedRows