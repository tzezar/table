<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLThAttributes } from "svelte/elements";

	type $$Props = HTMLThAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div
	class={cn(
		"text-left align-middle font-medium text-muted-foreground flex flex-col  px-2 py-4" ,
		className
	)}
	{...$$restProps}
>
	<slot />
</div>
