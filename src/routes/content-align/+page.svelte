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

	// it is nice practice to position for example number to the right
	// you can easily position values via 'align' property

	let columns: Columns = [
		{
			accessor: 'id',
			header: 'Id',
			config: {
				align: 'center'
			}
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
		{
			accessor: 'rating',
			header: 'Rating',
			config: {
				align: 'right'
			}
		}
	];
</script>

<Table {columns} data={$query?.data?.products} />
