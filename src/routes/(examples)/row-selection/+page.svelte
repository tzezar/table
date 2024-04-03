<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import HeaderSelectCheckbox from '$lib/components/table/cells/HeaderSelectCheckbox.svelte';
	import RowSelectCheckbox from '$lib/components/table/cells/RowSelectCheckbox.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import {
		createSelectedRowsStore,
		type SelectedRows
	} from '$lib/components/table/stores/selectedRowsStore.js';
	import { createQuery } from '@tanstack/svelte-query';

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	// To enable row selection add the `selectedRows` variable and collate the values from the table.
	// Now add a column (example below) - I recommend you familiarise yourself with custom cells beforehand.

	// Basically you are given the ID of the items taken from the server, you can change behavior.
	// It works very nice with pagination. Moving beetween pages does not erase selected rows.
	// Use those IDs to perform bulk actions.

	// You can customize components look too.
	let columns: Columns = [
		{
			accessor: '',
			header: '',
			config: {
				sortable: false,
				align: 'center',
				size: {
					w: 30
				}
			},
			cell: {
				component: RowSelectCheckbox,
				componentEditable: RowSelectCheckbox
			},
			head: {
				component: HeaderSelectCheckbox
			}
		},
		{ accessor: 'id', header: 'Id' },
		{
			accessor: 'title',
			header: 'Title',
			config: {
				size: {
					w: 200
				}
			}
		},
		{
			accessor: 'description',
			header: 'Description',
			config: {
				size: {
					w: 200
				}
			}
		},
		{ accessor: 'brand', header: 'Brand' },
		{ accessor: 'rating', header: 'Rating' }
	];

	// This is how you can determine the initially selected lines
	let selectedRows: SelectedRows = createSelectedRowsStore([1, 3, 5]);

	// and this is basic use:
	// let selectedRows: SelectedRows
</script>

<Table {columns} data={$query?.data?.products} bind:selectedRows />

<p class="pt-6">Selected rows:</p>
<pre class="max-h-[300px] overflow-auto">
	 {JSON.stringify($selectedRows, '', 2)}
</pre>
