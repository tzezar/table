<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type $$Props = HTMLAttributes<HTMLTableSectionElement>;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<div class={cn("flex flex-row bg-primary font-medium text-primary-foreground", className)} {...$$restProps}>
	<slot />
</div>
