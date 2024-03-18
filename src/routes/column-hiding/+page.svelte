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

	// To prevent individual columns from being hidden, add "disableHiding: true".
	// Columns can also be hidden by default. Set `visible: false` in config.
	let columns: Columns = [
		{
			accessor: 'id',
			header: 'Id',
			config: {
				disableHiding: true
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
				disableHiding: true
			}
		},
		{ accessor: 'brand', header: 'Brand' },
		{
			accessor: 'rating',
			header: 'Rating',
			config: {
				visible: false
			}
		}
	];
</script>

<!-- To enable column hiding control select add "enableColumnVisiblitySelect". -->
<Table {columns} data={$query?.data?.products} enableColumnVisiblitySelect />
