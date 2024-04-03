import { writable } from 'svelte/store';




type Rows = { id: number }[]


export function createSelectedRowsStore(arr: Array<number> = []) {
	const { set, subscribe, update } = writable(arr);

	const toggle = (rowId: number) => {
		update(state => {
			if (state.includes(rowId)) {
				return state.filter(id => id !== rowId);
			} else {
				return [...state, rowId];
			}
		});
	};

	const select = (rowId: number) => {
		update(state => {
			if (!state.includes(rowId)) {
				return [...state, rowId];
			}
			return state;
		});
	};

	const deselect = (rowId: number) => {
		update(state => state.filter(id => id !== rowId));
	};

	const deselectAll = () => {
		set([]);
	};

	const deselectAllOnPage = (rows: any) => {
		update(state => {
			const rowIds = rows.map(row => row.id);
			return state.filter(selectedRowId => !rowIds.includes(selectedRowId));
		});
	};

	const selectAllOnPage = (rows: any) => {
		update(state => {
			const rowIds = rows.map(row => row.id);
			return [...new Set([...state, ...rowIds])];
		});
	};


	return {
		subscribe,
		set,
		update,
		toggle,
		select,
		deselect,
		deselectAll,
		deselectAllOnPage,
		selectAllOnPage
	};
}

export const selectedRows = createSelectedRowsStore();

export type SelectedRows = typeof selectedRows