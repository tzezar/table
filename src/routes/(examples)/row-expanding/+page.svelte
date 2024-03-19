<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createQuery } from '@tanstack/svelte-query';
	import ExpandableRow from './ExpandableRow.svelte';
	import RowExpandToggle from '$lib/components/table/cells/RowExpandToggle.svelte';
	import {
		createExpandedRowsStore,
		type ExpandedRows
	} from '$lib/components/table/stores/expandedRowsStore.js';

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	// To add an expandable row you need to do a few things:
	// 1. define a column
	// 2. add the content to the `expandedRowContent` slot.

	let columns: Columns = [
		{
			accessor: 'expanded',
			header: '',
			cell: RowExpandToggle,
			config: {
				sortable: false,
				resizable: true,
				size: {
					w: 45
				}
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

	// you can set initialy expanded rows
	let expandedRows: ExpandedRows = createExpandedRowsStore([7]);

	// basic usage:
	// let expandedRows: ExpandedRows
</script>

<Table {columns} data={$query?.data?.products} bind:expandedRows>
	<div slot="expandedRowContent" let:props>
		<ExpandableRow {props} />
	</div>
</Table>

<p class='pt-6'>Expanded rows:</p>
<pre class="max-h-[300px] overflow-auto">
	 {JSON.stringify($expandedRows, '', 2)}
</pre>
