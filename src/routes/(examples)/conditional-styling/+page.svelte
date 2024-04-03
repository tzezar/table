<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { getNestedValue } from '$lib/components/table/utils/getNestedValue.js';
	import { createQuery } from '@tanstack/svelte-query';

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	let columns: Columns = [
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

	// Tables can be styled in several ways.
	// You can either do it in custom cells, or the second way is to style using `classNames`.

	let test = 'adfsasdsadsa';
	test.startsWith('S');
</script>

<Table
	{columns}
	data={$query?.data?.products}
	classNames={{
		row: ({row}) => (row.title.startsWith('S') ? 'bg-red-400 hover:bg-red-400/80' : ''),
		cell: ({row, column}) => {
			return column.accessor == 'brand' ? 'bg-blue-400 hover:bg-blue-400/80' : '';
		}
	}}
/>
