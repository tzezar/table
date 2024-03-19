<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createSelectedRowsStore } from '$lib/components/table/stores/selectedRowsStore.js';
	import { createQuery } from '@tanstack/svelte-query';
	import RatingCell from './_components/RatingCell.svelte';
	import TitleHeaderCell from './_components/TitleHeaderCell.svelte';
	import { writable } from 'svelte/store';
	import { NotebookPen } from 'lucide-svelte';

	let search = writable('');
	let selectedRows = createSelectedRowsStore([]);

	let perPage = 10;
	let page = 1;

	let columns: Columns = [
		{
			accessor: 'id',
			header: 'Id',
			config: {
				size: {
					w: 40,
					minW: 40,
					maxW: 200
				},
				resizable: false
			}
		},
		{
			accessor: 'title',
			header: 'Name',
			headerCell: TitleHeaderCell,
			config: {
				sortable: false,
				size: {
					w: 200,
					minW: 60,
					maxW: 200
				}
			},
			extra: {
				search
			}
		},
		{
			accessor: 'description',
			header: 'Description',
			config: {
				size: {
					w: 300,
					minW: 60,
					maxW: 500
				}
			}
		},
		{
			accessor: 'rating',
			header: 'Rating',
			cell: RatingCell,
			config: {
				size: {
					w: 40,
					minW: 40,
					maxW: 200
				}
			}
		}
	];
	$: query = createQuery({
		queryKey: ['products', page, perPage, $search],
		queryFn: async () => {
			return await fetch(
				`https://dummyjson.com/products/search?q=${$search}&limit=${perPage}&skip=${page * perPage - perPage}`
			).then((res) => res.json());
		},
		placeholderData: (): Response => {
			return $query?.data || { limit: 10, skip: 0, total: 1, products: [] };
		}
	});
</script>

<Table
	{columns}
	data={$query?.data?.products || []}
	count={$query.data?.total || 1}
	bind:selectedRows
	bind:perPage
	bind:page
/>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight flex flex-row gap-2"><NotebookPen/> Note</h4>
<p class="pb-6 leading-7">
	In response to a question, I add an example of how to build column filtering. The component as
	such does not have a built-in way to add column filtering with a single value like
	"enableColumnFilter: number". You need to add a custom header cell with input and handle the
	change of value. You could make a store and bind values to it and then refetch the data by
	detecting the change.
</p>
