<script lang="ts">
	import type { CellProps } from '$lib/components/table';
	import { Button } from '$lib/components/ui/button';
	import { getContext } from 'svelte';
	export let props: CellProps;
	const { inlineEditing } = getContext('table');



	// @ts-ignore
	$: rowId = props.row.id as number;


	// get rows passed in column difinition
	let rows = props.column.extra.rows;

	// obtain function
	let onSave = props.column.extra.onSave;
</script>

<div>
	{#if $inlineEditing.includes(rowId)}
		<Button
			size="tableCell"
			class="w-14"
			on:click={() => {
				// call the method to handle changed row
				onSave({ data: $rows.filter((s) => s.id == rowId)[0] });

				// remove row from store
				let filteredRowsStore = $rows.filter((s) => s.id != rowId);
				$rows = filteredRowsStore;

				// table inner state update
				inlineEditing.update((s) => s.filter((i) => i != rowId));
			}}>SAVE</Button
		>
	{:else}
		<Button
			size="tableCell"
			class="w-14"
			on:click={() => {
				// we add row to the store
				$rows = [{...props.row},  ...$rows];
				inlineEditing.update((s) => [...s, rowId]);
			}}>EDIT</Button
		>
	{/if}
</div>
