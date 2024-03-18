import { writable } from 'svelte/store';




type Rows = { id: number }[]


export function createSelectedRowsStore(arr: Array<number> = []) {
	const { set, subscribe, update } = writable(arr);

	return {
		subscribe,
		set,
		update,
		select: (rowId: number) =>
			update((state) => {
				if (!state.includes(rowId)) {
					return [...state, rowId];
				}
				return state;
			}),
		deselect: (rowId: number) =>
			update((state) => {
				let newState = state.filter((e) => e != rowId);
				return newState;
			}),
		deselectAll: () =>
			update((state) => {
				return [];
			}),

		deselectAllOnPage: (rows: Rows) =>
			update((state) => {
				const rowIds = rows.map((r) => r.id); // Extracting IDs from $rows array of objects
				const newState = state.filter((sr) => !rowIds.includes(sr)); // Filtering $selectedRows based on rowIds
				return newState;
			}),
		selectAllOnPage: (rows: Rows) =>
			update((state) => {
				let tempArr: any[] = [];

				rows.map((r) => {
					if (!state.includes(r.id)) {
						tempArr.push(r.id);
					}
				});
				let newState = [...state, ...tempArr];
				return newState;
			})
	};
}

export const selectedRows = createSelectedRowsStore();

export type SelectedRows = typeof selectedRows