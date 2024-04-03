<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowDownAz, ArrowDownZa, ArrowUpDown } from 'lucide-svelte';
	import type { Column } from '../index';
	import type { Sorting } from '../stores/sortingStore';

	export let sorting: Sorting;
	export let column: Column;
</script>

{#if $sorting.accessor == column.accessor}
	{#if $sorting.direction == 'asc'}
		<Button
			variant="outline"
			size="icon"
			class="size-5"
			on:click={() => {
				sorting.set({ accessor: column.accessor, direction: 'desc' });
			}}
		>
			<ArrowDownAz />
		</Button>
	{:else if $sorting.direction == 'desc'}
		<Button
			variant="outline"
			size="icon"
			class="size-5"
			on:click={() => {
				sorting.set({ accessor: '', direction: '' });
			}}
		>
			<ArrowDownZa />
		</Button>
	{/if}
{:else}
	<Button
		variant="outline"
		size="icon"
		class="hidden size-5 group-hover:flex"
		on:click={() => {
			sorting.set({ accessor: column.accessor, direction: 'asc' });
		}}
	>
		<ArrowUpDown />
	</Button>
{/if}
