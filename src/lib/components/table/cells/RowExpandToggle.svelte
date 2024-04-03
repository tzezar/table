<script lang="ts">
	import { type ExpandedRows } from './../stores/expandedRowsStore';
	import { getContext } from 'svelte';
	import type { CellProps } from '..';
	import { Button } from '$lib/components/ui/button';
	export let props: CellProps;

	import { ArrowDownFromLine, ArrowUpFromLine } from 'lucide-svelte';

	// @ts-ignore
	$: rowId = props.row.id as number;

	const { expandedRows }: { expandedRows: ExpandedRows } = getContext('table');
</script>

<div class="pt-1 flex justify-center">
	{#if $expandedRows.includes(rowId)}
		<Button variant="ghost" size="tableCell" on:click={() => expandedRows.collapse(rowId)}>
			<ArrowUpFromLine class="size-4" />
		</Button>
	{:else}
		<Button variant="ghost" size="tableCell" on:click={() => expandedRows.expand(rowId)}
			><ArrowDownFromLine class="size-4" /></Button
		>
	{/if}
</div>
