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

	// It is possible to control the limits within which the column can be expanded using "minW" and "maxW".
	// The "w" value is the initial value.
	// You can disable resizing of individual columns with "resizable: false".
	let columns: Columns = [
		{
			accessor: 'id',
			header: 'Id',
			config: {
				size: {
					w: 50,
					maxW: 100,
					minW: 30
				}
			}
		},
		{
			accessor: 'title',
			header: 'Title',
			config: {
				size: {
					w: 250,
					maxW: 250
				}
			}
		},
		{
			accessor: 'description',
			header: 'Description',
			config: {
				resizable: false
			}
		},
		{ accessor: 'brand', header: 'Brand' },
		{ accessor: 'rating', header: 'Rating' }
	];
</script>

<!-- To enable sorting add "enableResizing". -->
<!-- Values can be set globally. -->
<Table
	{columns}
	data={$query?.data?.products}
	enableResizing
	maxW={200}
	minW={70}
	defaultColumnWidth={100}
/>


