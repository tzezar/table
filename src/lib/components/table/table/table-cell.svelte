<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLTdAttributes } from "svelte/elements";

	type $$Props = HTMLTdAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn("px-2 py-3 align-middle", className)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</div>
