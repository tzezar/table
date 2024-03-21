<script lang="ts">
	import { getContext } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	export let props: CellProps;

	import { ArrowDownFromLine, ArrowUpFromLine } from 'lucide-svelte';
	import type { CellProps } from '$lib/components/table/index.js';
	import type { ExpandedRows } from '$lib/components/table/stores/expandedRowsStore.js';

	// @ts-ignore
	$: rowId = props.row.id as number;

	const { expandedRows }: { expandedRows: ExpandedRows } = getContext('table');

	$: enableExpandableRow = props.column.extra.enableExpandableRow;
</script>

{#if $enableExpandableRow}
	<div class="flex h-full w-full items-center justify-center align-middle">
		{#if $expandedRows.includes(rowId)}
			<Button variant="ghost" size="tableCell" on:click={() => expandedRows.collapse(rowId)}
				><ArrowUpFromLine class="size-4" /></Button
			>
		{:else}
			<Button variant="ghost" size="tableCell" on:click={() => expandedRows.expand(rowId)}
				><ArrowDownFromLine class="size-4" /></Button
			>
		{/if}
	</div>
{/if}
