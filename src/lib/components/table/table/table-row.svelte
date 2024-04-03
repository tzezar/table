<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={cn(
		'flex min-w-fit flex-row border-b transition-colors *:overflow-hidden *:text-ellipsis hover:bg-muted/50 data-[state=selected]:bg-muted w-full',
		className
	)}
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</div>
