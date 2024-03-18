import { writable } from 'svelte/store';

export function createInlineEditingStore(arr: Array<number> = []) {
    const { set, subscribe, update } = writable(arr);

    return {
        subscribe,
        set,
        update,
    };
}

export const inlineEditing = createInlineEditingStore();
export type InlineEditing = typeof inlineEditing