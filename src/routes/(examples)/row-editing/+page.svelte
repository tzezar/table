<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import InlineRowEditingToggleCell from '$lib/components/table/cells/InlineRowEditingToggleCell.svelte';
	import TextInputEditableCell from '$lib/components/table/cells/TextInputEditableCell.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createInlineEditingStore } from '$lib/components/table/stores/inlineEditingStore.js';
	import { createQuery } from '@tanstack/svelte-query';

	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	// to make inline editing create custom column as below
	// next add custom `cellEdit` components for cell you want to be editable

	let columns: Columns = [
		{ accessor: 'id', header: 'Id' },
		{
			accessor: 'title',
			header: 'Title',
			cellEdit: TextInputEditableCell,
			config: {
				size: {
					w: 200
				}
			}
		},
		{
			accessor: 'description',
			header: 'Description',
			cellEdit: TextInputEditableCell,
			config: {
				size: {
					w: 200
				}
			}
		},
		{ accessor: 'brand', header: 'Brand' },
		{ accessor: 'rating', header: 'Rating' },
		{
			accessor: 'actions',
			header: '',
			cell: InlineRowEditingToggleCell,
			cellEdit: InlineRowEditingToggleCell,
			extra: {
				onChange: ({ value, id }: { value: string; id: number }) =>
					console.log({ value, id, accessor: 'something' })
			},
			config: {
				size: {
					w: 300
				},
				align: 'left'
			}
		}
	];

	// you can bind list of rows being edited - its optional
	let inlineEditing = createInlineEditingStore([]);
</script>

<Table {columns} data={$query?.data?.products} bind:inlineEditing />

<p>Inline editing rows:</p>
<pre>
	 {JSON.stringify($inlineEditing, '', 2)}
</pre>
