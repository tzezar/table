<script lang="ts">
	import type { HeaderCellProps } from '$lib/components/table/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	export let props: HeaderCellProps;

    let search = props.column.extra.search
</script>

<div class="flex flex-col">
	{props.column.header}

	<Input bind:value={$search} class="w-full focus-visible:ring-0 h-6" placeholder='Simplified column search'/>
</div>
