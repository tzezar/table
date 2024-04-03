<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLTableAttributes } from 'svelte/elements';

	type $$Props = HTMLTableAttributes;

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class="w-full overflow-auto">
	<div class={cn('flex w-full caption-bottom flex-col text-sm min-w-full', className)} {...$$restProps}>
		<slot />
	</div>
</div>
