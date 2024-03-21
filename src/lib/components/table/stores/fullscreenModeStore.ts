import { writable } from 'svelte/store';

export function createFullscreenModeStore(open: boolean = false) {
    const { set, subscribe, update } = writable<boolean>(open);

    return {
        subscribe,
        set,
        update,
        on: () =>
            update(() => {
                return true;
            }),
        off: () =>
            update(() => {
                return false;
            }),
        toggle: () => {
            update((store) => {
                return !store
            })
        }
    };
}

export const fullscreenMode = createFullscreenModeStore();
export type FullscreenMode = typeof fullscreenMode