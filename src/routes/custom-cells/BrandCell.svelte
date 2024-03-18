<script lang="ts">
	import type { CellProps } from '$lib/components/table/index.js';
	import { cn } from '$lib/utils.js';
	export let props: CellProps;
</script>

<span class={cn(props.row.id % 2 == 0 && 'font-medium', props.row.id % 2 == 1 && 'italic')}>{props.value}</span>
