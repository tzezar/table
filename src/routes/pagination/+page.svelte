<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createQuery } from '@tanstack/svelte-query';

	// Client-side pagination is not implemented yet

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	let columns: Columns = [
		{ accessor: 'id', header: 'Id' },
		{ accessor: 'title', header: 'Title',
			config: {
				size: {
					w: 200
				}
			} },
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

	// To enable pagination, you need to do several things:

	// Define the `perPage` and `page` variables - the names are self explanatory
	// and bind them to the `<Table/>` component. The `count` should also be passed in.
	// Use these values to apply pagination to the server.

	let perPage = 10;
	let page = 1;
</script>

<Table
	{columns}
	data={$query?.data?.products}
	enablePagination
	count={$query.data?.total}
	bind:perPage
	bind:page
/>

<div class="pt-2">
	<h3 class="font-medium">Use these values to apply pagination to the server</h3>
	<p>perPage: {perPage}</p>
	<p>page: {page}</p>
	<p>offset: {page * perPage - perPage}</p>
</div>
