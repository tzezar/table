<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createQuery } from '@tanstack/svelte-query';
	import EditModal from './EditModal.svelte';

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
		{ accessor: 'rating', header: 'Rating' },
		{
			accessor: 'editInModal',
			header: '',
			cell: {
				component: EditModal,
				componentEditable: EditModal
			},
			extra: {
				// onChange: ({ value, id }: Props) =>
				// 	$updateMutation.mutate({ value, id, accessor: 'purchaseTaxRate' })
			},
			config: {
				sortable: false,
				size: {},
				align: 'left'
			}
		}
	];
</script>

<!-- We must specify columns and data -->
<Table {columns} data={$query?.data?.products} />
