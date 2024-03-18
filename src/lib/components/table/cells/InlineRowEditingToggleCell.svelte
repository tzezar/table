<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { getContext } from 'svelte';
	import type { CellProps } from '..';

	export let props: CellProps;

	const { inlineEditing } = getContext('table');

	// @ts-ignore
	$: rowId = props.row.id as number;
</script>

<div>
	{#if $inlineEditing.includes(rowId)}
		<Button
			class="w-14 h-6"
			on:click={() => {
				inlineEditing.update((s) => s.filter((i) => i != rowId));
			}}>SAVE</Button
		>
	{:else}
		<Button
			class="w-14 h-6"
			on:click={() => {
				inlineEditing.update((s) => [...s, rowId]);
			}}>EDIT</Button
		>
	{/if}
</div>
