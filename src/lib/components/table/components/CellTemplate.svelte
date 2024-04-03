<script lang="ts">
	import type { Column } from '..';
	import { getNestedValue } from '../utils/getNestedValue';

	export let column: Column;
	export let row: any;
	export let rowIndex: number;

	let value;
	$: {
		if (column.accessor.includes('.')) {
			value = getNestedValue(row, column.accessor);
		} else {
			value = row[column.accessor];
		}
		row;
	}
</script>

{#if !column.cell?.component}
{#if column?.cell?.simplified}
	{@html column.cell.simplified({ column, row, rowIndex, value })}
	
	{:else if getNestedValue(row, column.accessor) !== undefined}
		{getNestedValue(row, column.accessor)}
	{:else}
		{row[column.accessor]}
	{/if}

{:else if column.cell?.component}
	<svelte:component
		this={column?.cell?.component}
		props={{
			value,
			column,
			row,
			rowIndex
		}}
	/>
{/if}
