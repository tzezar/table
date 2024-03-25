<script lang="ts">
	import Table from '$lib/components/table/Table.svelte';
	import type { Columns } from '$lib/components/table/index.js';
	import { writable } from 'svelte/store';

	import { data } from './data.js';
	import Button from '$lib/components/ui/button/button.svelte';

	let columns: Columns = [
		{
			accessor: 'id',
			header: 'Id',
			config: {
				size: {
					w: 60
				}
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
		{ accessor: 'rating', header: 'Rating' }
	];

	let enableVirtualization = false;
	let enableSorting = true;
	let enableResizing = true;
	let enablePagination = true;
	let enableColumnReordering = true;
	let enableColumnVisiblitySelect = true;
</script>



<Table
	mode="client"
	{columns}
	{data}
	{enableColumnReordering}
	{enableColumnVisiblitySelect}
	{enablePagination}
	{enableResizing}
	{enableSorting}
	{enableVirtualization}
/>

<div class="flex flex-row flex-wrap gap-2 py-2">
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableVirtualization = !enableVirtualization;
		}}>{enableVirtualization ? 'Disable virtualization' : 'Enable virtualization'}</Button
	>

	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableColumnVisiblitySelect = !enableColumnVisiblitySelect;
		}}>{enableColumnVisiblitySelect ? 'Disable column hiding' : 'Enable column hiding'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableColumnReordering = !enableColumnReordering;
		}}>{enableColumnReordering ? 'Disable column reordering' : 'Enable column reordering'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enablePagination = !enablePagination;
		}}>{enablePagination ? 'Disable pagination' : 'Enable pagination'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableResizing = !enableResizing;
		}}>{enableResizing ? 'Disable resizing' : 'Enable resizing'}</Button
	>
	<Button
		class="grow"
		variant="outline"
		on:click={() => {
			enableSorting = !enableSorting;
		}}>{enableSorting ? 'Disable sorting' : 'Enable sorting'}</Button
	>
</div>
<div>
	<h4 class="pb-4 text-2xl text-red-400 leading-none">EXPERIMENTAL PREVIEW</h4>
	<h5 class="pb-4 text-xl text-red-400 leading-none">Not tested enough, I would not use it in production</h5>
	<p>Pagination does not work with virtualization</p>
</div>