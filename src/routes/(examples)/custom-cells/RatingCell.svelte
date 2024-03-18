<script lang='ts'>
	import type { CellProps } from "$lib/components/table/index.js";
	import { cn } from "$lib/utils.js";
    export let props: CellProps
</script>


<span class={cn(+props.value < 4.3 && 'text-red-500', +props.value > 4.6 && 'text-green-500')}>{props.value}</span>