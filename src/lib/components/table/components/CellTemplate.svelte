<script lang="ts">
	import type { Column } from "..";
	import { getNestedValue } from "../utils/getNestedValue"; 

	export let column: Column;
	export let row: any
	export let rowIndex: number;
</script>

{#if column?.cell}
	{#if column.accessor.includes('.')}
		<svelte:component
			this={column?.cell}
			props={{
				value: getNestedValue(row, column.accessor),
				column,
				row,
				rowIndex
			}}
		/>
	{:else}
		<svelte:component
			this={column?.cell}
			props={{
				value: row[column.accessor],
				column,
				row,
				rowIndex
			}}
		/>
	{/if}
{:else if column.accessor.includes('.') && column?.cell !== undefined}
	<!--  -->
{:else if getNestedValue(row, column.accessor) !== undefined}
	{getNestedValue(row, column.accessor)}
{:else}
	{row[column.accessor]}
{/if}
