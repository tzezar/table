<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import InlineRowEditingToggleCell from '$lib/components/table/cells/InlineRowEditingToggleCell.svelte';
	import TextInputEditableCell from '$lib/components/table/cells/TextInputEditableCell.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { createInlineEditingStore } from '$lib/components/table/stores/inlineEditingStore.js';
	import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
	import InlineEditing from './_components/InlineEditing.svelte';
	import { writable } from 'svelte/store';
	import ValueCellEdit from './_components/ValueCellEdit.svelte';
	import { toast } from 'svelte-sonner';
	import SelectBrand from './_components/SelectBrand.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { NotebookPen } from 'lucide-svelte';

	type OnChangeProps = {
		accessor: string;
		value: string;
		id: number;
	};

	// I like tanstack-query and will use it here because it speeds up my work.
	// You can use a simple fetch() and it will be ok too.
	// Form action is unlikely to work in inline editing done this way.
	let qc = useQueryClient();
	const updateMutation = createMutation({
		mutationFn: async ({ data }: { data: any }) => {
			toast.success(JSON.stringify({ brand: data.brand, price: data.price }));
			let url = new URL(`https://dummyjson.com/products/${data.id}`);
			return await fetch(url, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					price: +data.price,
					brand: data.brand
				})
			});
		},
		onSuccess: (res: any) => {
			if (res.ok) {
				qc.invalidateQueries({ queryKey: ['products'] });
			} else {
				toast.error('Something went wrong');
			}
		},
		onError: () => {
			toast.error('Something went wrong');
		}
	});

	// Fetch dummy data
	$: query = createQuery({
		queryKey: ['products'],
		queryFn: async () => {
			return await fetch('https://dummyjson.com/products').then((res) => res.json());
		}
	});

	// How you handle edited rows is up to you, it is very flexible as you get whole component and can change w/e you like.
	// In this example I will show two ways I do it most often.

	// Create empty writable store to store row data
	// Row data will be added to this store in 'InlineEditing' below when user click "EDIT"
	// Row data will be removed from this store in 'InlineEditing' component when user click "SAVE"
	// You can handle post/patch request directly in 'InlineEditing' component or here in parent component

	let rows = writable([]);

	let columns: Columns = [
		{
			accessor: 'id',
			header: 'Id',
			config: {
				size: {
					w: 60
				},
				resizable: false
			}
		},
		// Here you specify custom cell and handle logic inside it
		{
			accessor: 'brand',
			header: 'Brand',
			config: {
				size: {
					w: 300
				}
			},
			cellEdit: SelectBrand,
			// remember to pass rows
			extra: {
				rows
			}
		},

		// This way you can create reusable components
		// It is up to you, personally I prefer rather to use idiomatic svelte way
		// and create one component for one cell as above (brand cell)
		{
			accessor: 'price',
			header: 'Price',
			cellEdit: ValueCellEdit,
			extra: {
				rows,
				onChange: async ({ value, id, accessor }: OnChangeProps) => {
					let newRows = $rows.map((row) => {
						if (row.id === id) {
							return { ...row, [accessor]: value };
						}
						return row;
					});
					$rows = newRows;
				}
			}
		},
		{
			accessor: 'actions',
			header: '',
			cell: InlineEditing,
			cellEdit: InlineEditing,
			// I created separate component to handle this case, but with little tweak you might be able
			// to create 100% reusable component for both cases (cell edit, save on click).

			// Pass rows and method
			extra: {
				rows,
				onSave: ({ data }: { data: { accessor: string; value: string }[] }) =>
					$updateMutation.mutate({ data })
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

<p class='pt-6'>Inline editing rows:</p>
<pre class="max-h-[300px] overflow-auto">
	 {JSON.stringify(
		$rows,
		'',
		2
	)}
</pre>

<h4 class="scroll-m-20 pt-6 text-xl font-semibold tracking-tight flex flex-row gap-2"><NotebookPen/> Note</h4>
<p class="pb-6 leading-7">
	It is more common practice to save a row when clicking the save button than to edit cells directly
	as in the previous example. The nature of the component is very flexible, in this example I will
	show how I usually do it. You can add e.g. cancel button etc. it is up to you. Check out the code
	on github for more tips.
</p>
