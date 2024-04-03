<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createQuery } from '@tanstack/svelte-query';
	import DescriptionCell from './DescriptionCell.svelte';
	import BrandCell from './BrandCell.svelte';
	import RatingCell from './RatingCell.svelte';
	import TextInputEditableCell from '$lib/components/table/cells/TextInputEditableCell.svelte';
	import IdCellHeader from './IdCellHeader.svelte';

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	// to render custom cells simply create new component and pass it as `cell: component`
	// you can also pass custom header cell

	// any extra prop, function, etc. you can pass via `extra`
	// I often use it to pass mutations from tanstack-query

	let columns: Columns = [
		{ accessor: 'id', header: 'Id', headerCell: IdCellHeader },
		{
			accessor: 'title',
			header: 'Title',
			cell: {
				component: TextInputEditableCell
			},
			extra: {
				onChange: (v) => console.log(v)
			},
			config: {
				size: {
					w: 200
				}
			}
		},
		{
			accessor: 'description',
			header: 'Description',
			cell: {
				component: DescriptionCell
			}
		},
		{ accessor: 'brand', header: 'Brand', cell: { component: BrandCell } },
		{ accessor: 'rating', header: 'Rating', cell: { component: RatingCell } }
	];
</script>

<Table {columns} data={$query?.data?.products} />
