<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createQuery } from '@tanstack/svelte-query';

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	// In this version, I have deactivated the possibility to prevent columns
	// from being moved due to a bug, this will be added in the future.

	let columns: Columns = [
		{
			accessor: 'id',
			header: 'Id'
		},
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
</script>

<!-- To enable column ordering control add "enableColumnReordering". -->
<Table {columns} data={$query?.data?.products} enableColumnReordering />
