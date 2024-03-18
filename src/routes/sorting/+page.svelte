<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns, SortingElement } from '$lib/components/table/index.js';
	import { createSortingStore } from '$lib/components/table/stores/sortingStore.js';
	import { createQuery } from '@tanstack/svelte-query';
	import type { Writable } from 'svelte/store';

	// * At this point, sorting by one column is possible (no multi-sort).

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	// Filtering is also straightforward. Add `enableSorting` to table component.
	// Create a variable variable and create a store using `createSortingStore`.
	// Bind values from table `bind:sorting`.
	// Handle the server-side sorting the way you need it.
	// You can disable sorting of individual columns `sortable:false`.

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
		{
			accessor: 'brand',
			header: 'Brand',
			config: {
				sortable: false
			}
		},
		{
			accessor: 'rating',
			header: 'Rating',
			config: {
				sortable: false
			}
		}
	];

	let sorting: Writable<SortingElement> = createSortingStore({
		accessor: 'id',
		direction: 'ASC'
	});
</script>

<Table {columns} data={$query?.data?.products} enableSorting bind:sorting />
<p class='text-foreground/50 text-right'>Sorting is not working in the example because dummyjson.com does not support it</p>
<code>
	{$sorting.accessor}
	{$sorting.direction}
</code>
